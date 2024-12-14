import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Music2,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SongActions } from './SongActions';
import { SongForm } from './SongForm';
import type { Song } from '@/types/song';

type SortField = keyof Pick<Song, 'title' | 'artist' | 'key' | 'tempo'>;
type SortOrder = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

interface SongListProps {
  songs: Song[];
  onUpdateSong: (song: Partial<Song> & { id: string }) => Promise<void>;
  onDeleteSong: (id: string) => Promise<void>;
}

export function SongList({ songs, onUpdateSong, onDeleteSong }: SongListProps) {
  const [sort, setSort] = useState<SortConfig>({
    field: 'title',
    order: 'asc',
  });
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);

  const sortedSongs = [...songs].sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const comparison = aValue < bValue ? -1 : 1;
    return sort.order === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sort.order === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const toggleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order:
        prev.field === field
          ? prev.order === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
    }));
  };

  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No songs yet</h3>
        <p className="text-muted-foreground">Add your first song to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('title')}
                  className="flex items-center gap-2"
                >
                  Title
                  {getSortIcon('title')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('artist')}
                  className="flex items-center gap-2"
                >
                  Artist
                  {getSortIcon('artist')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('key')}
                  className="flex items-center gap-2"
                >
                  Key
                  {getSortIcon('key')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort('tempo')}
                  className="flex items-center gap-2"
                >
                  Tempo
                  {getSortIcon('tempo')}
                </Button>
              </TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSongs.map((song) => (
              <TableRow key={song.id}>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.key}</TableCell>
                <TableCell>{song.tempo} BPM</TableCell>
                <TableCell className="max-w-xs truncate">
                  {song.comments}
                </TableCell>
                <TableCell>
                  <SongActions
                    song={song}
                    onEdit={setSongToEdit}
                    onDelete={setSongToDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      {songToEdit && (
        <SongForm
          song={songToEdit}
          open={true}
          onOpenChange={() => setSongToEdit(null)}
          onSubmit={async (values) => {
            await onUpdateSong({ ...values, id: songToEdit.id });
            setSongToEdit(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={songToDelete !== null}
        onOpenChange={() => setSongToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Song</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{songToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (songToDelete) {
                  await onDeleteSong(songToDelete.id);
                  setSongToDelete(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}