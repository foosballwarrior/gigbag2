import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getSpotifyAuthUrl, importSpotifyTracks } from '@/lib/spotify';

interface SpotifyContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  connect: () => void;
  disconnect: () => void;
  importTracks: () => Promise<void>;
}

export const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('spotify_access_token')
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('spotify_access_token', token);
        setAccessToken(token);
        setIsAuthenticated(true);
        navigate('/songs');
      }
    }
  }, [navigate]);

  const connect = () => {
    const authUrl = getSpotifyAuthUrl();
    window.location.href = authUrl;
  };

  const disconnect = () => {
    localStorage.removeItem('spotify_access_token');
    setAccessToken(null);
    setIsAuthenticated(false);
    toast({
      title: 'Disconnected',
      description: 'Successfully disconnected from Spotify',
    });
  };

  const importTracks = async () => {
    if (!accessToken) return;

    try {
      const tracks = await importSpotifyTracks(accessToken);
      // Here you would typically save these tracks to your database
      toast({
        title: 'Success',
        description: `Imported ${tracks.length} tracks from Spotify`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import tracks from Spotify',
        variant: 'destructive',
      });
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        connect,
        disconnect,
        importTracks,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}