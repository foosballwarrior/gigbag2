import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { validateSpotifyCallback } from '@/lib/spotify/auth';
import { useToast } from '@/hooks/use-toast';

export function SpotifyCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const hash = window.location.hash;
      const token = validateSpotifyCallback(hash);
      
      if (token) {
        localStorage.setItem('spotify_access_token', token);
        toast({
          title: 'Success',
          description: 'Successfully connected to Spotify',
        });
        navigate('/songs');
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error('Spotify authentication error:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect to Spotify. Please try again.',
        variant: 'destructive',
      });
      navigate('/songs');
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Connecting to Spotify...</span>
    </div>
  );
}