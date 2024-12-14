import { supabase } from '@/lib/supabase';
import type { AuthError } from '@supabase/supabase-js';

export async function signUp({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, username }]);

    if (profileError) throw profileError;
  }

  return data;
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export function handleAuthError(error: AuthError) {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'User already registered':
      return 'An account with this email already exists';
    default:
      return 'An error occurred. Please try again.';
  }
}