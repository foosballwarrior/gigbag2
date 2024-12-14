import { Music2 } from 'lucide-react';
import { AddSongButton } from './AddSongButton';
import { SpotifyButton } from './SpotifyButton';
import type { Song } from '@/types/song';

interface SongLibraryHeaderProps {
  songCount: number;
  onAddSong: (values: Omit<Song, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
}

export function SongLibraryHeader({ songCount, onAddSong }: SongLibraryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Music2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Song Library</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {songCount} {songCount === 1 ? 'song' : 'songs'} in your library
        </p>
      </div>
      <div className="flex gap-2">
        <SpotifyButton />
        <AddSongButton onAddSong={onAddSong} />
      </div>
    </div>
  );
}