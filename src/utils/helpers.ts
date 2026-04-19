import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Not set';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return 'Not set';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatPhoneNumber(phone: string): string {
  // Format international numbers
  if (phone.startsWith('+')) {
    return phone;
  }
  return phone;
}

export function generateId(prefix: string = 'ID'): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${random}`;
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getGreeting(name: string): string {
  const greetings = [
    `Hey ${name}!`,
    `Hi there!`,
    `How's it going, ${name}?`,
    `Welcome back, ${name}!`,
    `Good to see you, ${name}!`
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsPDF(content: string, filename: string): void {
  // Simple text download as placeholder for PDF
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateEmail(email: string): boolean {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  // Basic international phone validation
  const re = /^\\+?[1-9]\\d{1,14}$/;
  return re.test(phone.replace(/\\s/g, ''));
}