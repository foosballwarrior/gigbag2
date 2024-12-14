import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SongForm } from './SongForm';
import type { Song } from '@/types/song';

interface AddSongButtonProps {
  onAddSong: (values: Omit<Song, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
}

export function AddSongButton({ onAddSong }: AddSongButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Song
      </Button>
      <SongForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={async (values) => {
          await onAddSong(values);
          setOpen(false);
        }}
      />
    </>
  );
}