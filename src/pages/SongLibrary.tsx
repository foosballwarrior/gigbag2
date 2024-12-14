import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SongLibraryHeader } from '@/components/songs/SongLibraryHeader';
import { SongList } from '@/components/songs/SongList';
import { useSongs } from '@/hooks/use-songs';
import { useToast } from '@/hooks/use-toast';

export function SongLibrary() {
  const { songs, loading, error, addSong, updateSong, deleteSong } = useSongs();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 lg:pl-64">
          <div className="container mx-auto px-4 py-6 space-y-6">
            <SongLibraryHeader
              songCount={songs.length}
              onAddSong={addSong}
            />
            <SongList
              songs={songs}
              onUpdateSong={updateSong}
              onDeleteSong={deleteSong}
            />
          </div>
        </main>
      </div>
    </div>
  );
}