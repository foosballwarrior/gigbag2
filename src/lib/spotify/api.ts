import { SpotifyTrack, SpotifyAudioFeatures } from '@/types/spotify';

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

function getMusicalKey(key: number, mode: number): string {
  const pitchClass = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'];
  if (key === -1) return '';
  return mode === 1 ? pitchClass[key] : `${pitchClass[key]}m`;
}