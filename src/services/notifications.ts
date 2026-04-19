import type { Patient } from '../types';
import { addDays, isSameDay, format } from 'date-fns';

// SMS Configuration Flag - Set to true to enable actual SMS sending
const isSmsEnabled = false;

// Twilio credentials from environment
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

interface NotificationPayload {
  to: string;
  message: string;
  patientName: string;
  appointmentDate?: Date;
  type: 'reminder_7day' | 'reminder_1day' | 'reminder_dayof' | 'welcome';
}

interface NotificationResult {
  success: boolean;
  channel: 'sms' | 'email' | 'log';
  messageId?: string;
  error?: string;
  simulated?: boolean;
}

// Channel-agnostic notification interface
interface NotificationChannel {
  name: string;
  enabled: boolean;
  send: (payload: NotificationPayload) => Promise<NotificationResult>;
}

// SMS Channel Implementation
const smsChannel: NotificationChannel = {
  name: 'sms',
  enabled: isSmsEnabled,
  send: async (payload: NotificationPayload): Promise<NotificationResult> => {
    // Log for testing regardless of enabled state
    console.log('📱 SMS Notification (Simulated):', {
      to: payload.to,
      message: payload.message,
      type: payload.type,
      timestamp: new Date().toISOString()
    });

    if (!isSmsEnabled) {
      return {
        success: true,
        channel: 'log',
        simulated: true,
        messageId: `SIMULATED_${Date.now()}`
      };
    }

    try {
      // Actual Twilio implementation (ready to use when enabled)
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          To: payload.to,
          From: TWILIO_PHONE_NUMBER,
          Body: payload.message
        })
      });

      if (!response.ok) {
        throw new Error(`Twilio API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        channel: 'sms',
        messageId: data.sid
      };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return {
        success: false,
        channel: 'sms',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

// Email Channel (EmailJS)
const emailChannel: NotificationChannel = {
  name: 'email',
  enabled: true,
  send: async (payload: NotificationPayload): Promise<NotificationResult> => {
    // For now, log email notifications
    console.log('📧 Email Notification (Logged):', {
      to: payload.to,
      subject: `MediNova Reminder for ${payload.patientName}`,
      message: payload.message,
      type: payload.type,
      timestamp: new Date().toISOString()
    });

    // EmailJS integration can be added here
    // import emailjs from 'emailjs-com';
    // await emailjs.send(...);

    return {
      success: true,
      channel: 'log',
      simulated: true,
      messageId: `EMAIL_LOG_${Date.now()}`
    };
  }
};

// Notification Manager - Channel Agnostic
class NotificationManager {
  private channels: Map<string, NotificationChannel> = new Map();

  constructor() {
    this.registerChannel(smsChannel);
    this.registerChannel(emailChannel);
  }

  registerChannel(channel: NotificationChannel) {
    this.channels.set(channel.name, channel);
  }

  async sendNotification(
    payload: NotificationPayload,
    preferredChannel: 'sms' | 'email' | 'all' = 'sms'
  ): Promise<NotificationResult[]> {
    const results: NotificationResult[] = [];

    if (preferredChannel === 'all') {
      for (const channel of this.channels.values()) {
        if (channel.enabled) {
          const result = await channel.send(payload);
          results.push(result);
        }
      }
    } else {
      const channel = this.channels.get(preferredChannel);
      if (channel && channel.enabled) {
        const result = await channel.send(payload);
        results.push(result);
      }
    }

    return results;
  }

  generateReminderMessage(type: '7day' | '1day' | 'dayof', patientName: string, appointmentDate?: Date): string {
    const dateStr = appointmentDate ? format(appointmentDate, 'MMMM do') : 'soon';
    
    switch (type) {
      case '7day':
        return `Hello ${patientName}, this is a friendly reminder from MediNova that you have an appointment scheduled on ${dateStr}. We look forward to seeing you!`;
      case '1day':
        return `Hello ${patientName}, your appointment with MediNova is tomorrow, ${dateStr}. Please remember to bring any relevant documents. See you soon!`;
      case 'dayof':
        return `Hello ${patientName}, your MediNova appointment is today. We're expecting you!`;
      default:
        return `Hello ${patientName}, you have an upcoming appointment with MediNova.`;
    }
  }

  // Check and send reminders based on appointment dates
  async checkAndSendReminders(patients: Patient[]): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const patient of patients) {
      if (!patient.nextAppointment) continue;

      const appointmentDate = new Date(patient.nextAppointment);
      appointmentDate.setHours(0, 0, 0, 0);

      const daysUntil = Math.ceil((appointmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // 7-day reminder
      if (daysUntil === 7) {
        await this.sendNotification({
          to: patient.phoneNumber,
          message: this.generateReminderMessage('7day', patient.fullName, appointmentDate),
          patientName: patient.fullName,
          appointmentDate,
          type: 'reminder_7day'
        });
      }

      // 1-day reminder
      if (daysUntil === 1) {
        await this.sendNotification({
          to: patient.phoneNumber,
          message: this.generateReminderMessage('1day', patient.fullName, appointmentDate),
          patientName: patient.fullName,
          appointmentDate,
          type: 'reminder_1day'
        });
      }

      // Day-of reminder
      if (daysUntil === 0) {
        await this.sendNotification({
          to: patient.phoneNumber,
          message: this.generateReminderMessage('dayof', patient.fullName, appointmentDate),
          patientName: patient.fullName,
          appointmentDate,
          type: 'reminder_dayof'
        });
      }
    }
  }
}

export const notificationManager = new NotificationManager();

// Helper to toggle SMS on/off
export const toggleSmsEnabled = (enabled: boolean): void => {
  (smsChannel as any).enabled = enabled;
  console.log(`📱 SMS notifications ${enabled ? 'ENABLED' : 'DISABLED'}`);
};

export const getSmsStatus = (): boolean => {
  return smsChannel.enabled;
}