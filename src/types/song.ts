export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const musicalKeys = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭',
  'C♯/D♭', 'A♭', 'E♭', 'B♭', 'F',
  'Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m',
  'D♯m/E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'
] as const;