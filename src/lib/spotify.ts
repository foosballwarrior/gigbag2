import { getEnvVar } from '@/lib/utils/env';
import type { SpotifyTrack, SpotifyAudioFeatures } from '@/types/spotify';

const SPOTIFY_CLIENT_ID = getEnvVar('VITE_SPOTIFY_CLIENT_ID');
const SPOTIFY_REDIRECT_URI = getEnvVar('VITE_SPOTIFY_REDIRECT_URI');
const SCOPES = [
  'user-library-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
].join(' ');

export function getSpotifyAuthUrl() {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function fetchWithToken(url: string, accessToken: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Spotify token expired');
    }
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getUserPlaylists(accessToken: string) {
  return fetchWithToken('https://api.spotify.com/v1/me/playlists', accessToken);
}

export async function getPlaylistTracks(accessToken: string, playlistId: string) {
  return fetchWithToken(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, accessToken);
}

export async function createPlaylist(accessToken: string, name: string, description: string) {
  const userResponse = await fetchWithToken('https://api.spotify.com/v1/me', accessToken);
  
  return fetchWithToken(
    `https://api.spotify.com/v1/users/${userResponse.id}/playlists`,
    accessToken,
    {
      method: 'POST',
      body: JSON.stringify({ name, description, public: false }),
    }
  );
}

export async function addTracksToPlaylist(accessToken: string, playlistId: string, uris: string[]) {
  return fetchWithToken(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    accessToken,
    {
      method: 'POST',
      body: JSON.stringify({ uris }),
    }
  );
}

export async function getAudioFeatures(accessToken: string, trackIds: string[]) {
  return fetchWithToken(
    `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`,
    accessToken
  );
}

export async function importSpotifyTracks(accessToken: string) {
  try {
    // Fetch tracks
    const response = await fetchWithToken(
      'https://api.spotify.com/v1/me/tracks?limit=50',
      accessToken
    );

    const tracks: SpotifyTrack[] = response.items.map((item: any) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      uri: item.track.uri,
    }));

    // Get audio features for all tracks
    const audioFeatures: SpotifyAudioFeatures[] = await getAudioFeatures(
      accessToken,
      tracks.map(track => track.id)
    );

    // Combine track info with audio features
    return tracks.map((track, index) => ({
      title: track.title,
      artist: track.artist,
      key: getMusicalKey(audioFeatures[index].key, audioFeatures[index].mode),
      tempo: Math.round(audioFeatures[index].tempo),
      comments: `Imported from Spotify on ${new Date().toLocaleDateString()}`,
      spotifyUri: track.uri,
    }));
  } catch (error) {
    console.error('Error importing Spotify tracks:', error);
    throw error;
  }
}

// Helper function to convert Spotify's key/mode to musical notation
function getMusicalKey(key: number, mode: number): string {
  const pitchClass = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'];
  if (key === -1) return '';
  return mode === 1 ? pitchClass[key] : `${pitchClass[key]}m`;
}