import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { signIn as dbSignIn, signOut as dbSignOut, signUp as dbSignUp, resetPassword as dbResetPassword } from '@/lib/db/auth';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = useCallback(
    async (values: { email: string; password: string; username: string }) => {
      const data = await dbSignUp(values);
      return data;
    },
    []
  );

  const handleSignIn = useCallback(
    async (values: { email: string; password: string }) => {
      const data = await dbSignIn(values);
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
      return data;
    },
    [navigate, location]
  );

  const handleSignOut = useCallback(async () => {
    await dbSignOut();
    navigate('/', { replace: true });
  }, [navigate]);

  const handleResetPassword = useCallback(async (email: string) => {
    await dbResetPassword(email);
  }, []);

  return {
    user,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
  };
}