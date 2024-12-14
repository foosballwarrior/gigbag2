export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  uri: string;
}

export interface SpotifyAudioFeatures {
  id: string;
  key: number;
  mode: number;
  tempo: number;
  time_signature: number;
  danceability: number;
  energy: number;
  loudness: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: {
    total: number;
    items: SpotifyTrack[];
  };
}