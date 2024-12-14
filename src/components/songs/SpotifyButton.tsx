import { useState } from 'react';
import { Music, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSpotify } from '@/hooks/use-spotify';
import { useSongs } from '@/hooks/use-songs';
import { useToast } from '@/hooks/use-toast';
import { isSpotifyConfigured } from '@/lib/config/env';

export function SpotifyButton() {
  const [importing, setImporting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { isAuthenticated, connect, disconnect, importTracks } = useSpotify();
  const { addSong } = useSongs();
  const { toast } = useToast();

  if (!isSpotifyConfigured) {
    return null;
  }

  const handleImport = async () => {
    if (!isAuthenticated) {
      connect();
      return;
    }

    setImporting(true);
    try {
      const tracks = await importTracks();
      let importedCount = 0;

      for (const track of tracks) {
        await addSong(track);
        importedCount++;
      }

      toast({
        title: 'Success',
        description: `Imported ${importedCount} songs from Spotify`,
      });
      setShowDialog(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import songs from Spotify',
        variant: 'destructive',
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => isAuthenticated ? setShowDialog(true) : connect()}
        className="bg-[#1DB954] hover:bg-[#1DB954]/90"
      >
        <Music className="mr-2 h-4 w-4" />
        {isAuthenticated ? 'Import from Spotify' : 'Connect Spotify'}
      </Button>

      {isAuthenticated && (
        <Button
          variant="outline"
          className="text-destructive hover:bg-destructive/10"
          onClick={disconnect}
        >
          Disconnect Spotify
        </Button>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import from Spotify</DialogTitle>
            <DialogDescription>
              This will import your saved tracks from Spotify, including song details and audio features like key and tempo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={importing}
              className="bg-[#1DB954] hover:bg-[#1DB954]/90"
            >
              {importing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Songs'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}