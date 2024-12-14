import { spotifyConfig } from '@/lib/config/env';

export function getSpotifyAuthUrl(): string {
  // Ensure we're using encodeURIComponent for the redirect URI
  const params = new URLSearchParams({
    client_id: spotifyConfig.clientId,
    response_type: 'token',
    redirect_uri: encodeURIComponent(spotifyConfig.redirectUri),
    scope: spotifyConfig.scopes.join(' '),
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function validateSpotifyCallback(hash: string) {
  if (!hash) return null;
  
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const error = params.get('error');
  
  if (error) {
    throw new Error(`Spotify authentication error: ${error}`);
  }
  
  return accessToken;
}