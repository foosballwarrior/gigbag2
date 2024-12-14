import { isValidUrl } from './url';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateSupabaseConfig(url: string | undefined, key: string | undefined) {
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  if (!isValidUrl(url)) {
    throw new Error('Invalid Supabase URL format. URL must start with https://');
  }
}