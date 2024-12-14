import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { SpotifyProvider } from '@/contexts/SpotifyContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';
import { SongLibrary } from '@/pages/SongLibrary';
import { SpotifyCallback } from '@/pages/SpotifyCallback';

export function App() {
  return (
    <BrowserRouter>
      <SpotifyProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/callback" element={<SpotifyCallback />} />

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
          </Route>

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/songs" element={<SongLibrary />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </SpotifyProvider>
    </BrowserRouter>
  );
}