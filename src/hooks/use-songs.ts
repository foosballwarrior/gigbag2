import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { getSongs, addSong, updateSong, deleteSong } from '@/lib/db/songs';
import type { Song } from '@/types/song';

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchSongs = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await getSongs(user.id);
      setSongs(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch songs'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const addNewSong = useCallback(async (songData: Omit<Song, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) throw new Error('User not authenticated');

    const newSong = await addSong({
      ...songData,
      userId: user.id,
    });

    setSongs((prev) => [newSong, ...prev]);
    return newSong;
  }, [user]);

  const editSong = useCallback(async (songData: Partial<Song> & { id: string }) => {
    const updatedSong = await updateSong(songData);
    setSongs((prev) =>
      prev.map((song) => (song.id === updatedSong.id ? updatedSong : song))
    );
    return updatedSong;
  }, []);

  const removeSong = useCallback(async (id: string) => {
    await deleteSong(id);
    setSongs((prev) => prev.filter((song) => song.id !== id));
  }, []);

  return {
    songs,
    loading,
    error,
    addSong: addNewSong,
    updateSong: editSong,
    deleteSong: removeSong,
    refreshSongs: fetchSongs,
  };
}