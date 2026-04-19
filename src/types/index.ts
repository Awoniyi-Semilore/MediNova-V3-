export type UserRole = 'learner' | 'supervisor' | 'care' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  title?: string;
  role: UserRole;
  hospitalId?: string;
  hospitalName?: string;
  createdAt: Date;
  lastLoginAt: Date;
  progress?: {
    completedCases: number;
    averageScore: number;
    totalCases: number;
  };
}

export interface Hospital {
  id: string;
  name: string;
  country: string;
  contactEmail: string;
  phone: string;
  paymentInfo?: string;
  notes?: string;
  tokens: {
    hospital: string;
    supervisor: string;
    care: string;
  };
  createdAt: Date;
  staffCount: number;
  patientCount: number;
}

export interface Patient {
  id: string;
  fullName: string;
  title?: string;
  babyName?: string;
  gender?: 'male' | 'female';
  dateOfBirth?: Date;
  phoneNumber: string;
  alternativePhone?: string;
  patientType: 'antenatal' | 'postnatal' | 'general';
  // Antenatal specific
  pregnancyWeeks?: number;
  pregnancyMonths?: number;
  trimester?: 'first' | 'second' | 'third';
  pregnancyEstimate?: 'just_started' | 'halfway' | 'almost_due';
  expectedDeliveryDate?: Date;
  // Postnatal specific
  deliveryDate?: Date;
  babyGender?: 'male' | 'female';
  // General
  nextAppointment?: Date;
  notes?: string;
  hospitalId: string;
  registeredBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  region: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
  createdBy: string;
  createdAt: Date;
  order: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  type: 'emergency' | 'routine' | 'complication';
  steps: SimulationStep[];
  createdBy: string;
  createdAt: Date;
}

export interface SimulationStep {
  id: string;
  order: number;
  description: string;
  expectedAction: string;
  feedback: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  type: 'case_completed' | 'simulation_completed' | 'patient_registered' | 'login';
  details: string;
  timestamp: Date;
  score?: number;
}

export interface TokenValidation {
  valid: boolean;
  type?: UserRole;
  hospitalId?: string;
  hospitalName?: string;
}

export interface NotificationChannel {
  type: 'sms' | 'email' | 'push';
  enabled: boolean;
  config?: Record<string, string>;
}

export interface ReminderSchedule {
  patientId: string;
  appointmentDate: Date;
  remindersSent: {
    sevenDays: boolean;
    oneDay: boolean;
    dayOf: boolean;
  };
}
