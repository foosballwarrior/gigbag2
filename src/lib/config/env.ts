interface SpotifyConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

// Get the current origin, fallback to localhost if not available
const origin = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'http://localhost:5173';

export const spotifyConfig: SpotifyConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  // Ensure redirect URI matches exactly what's in Spotify Dashboard
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI || `${origin}/callback`,
  scopes: [
    'user-library-read',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
  ],
};

export const isSpotifyConfigured = !!spotifyConfig.clientId;