import { supabase } from '@/lib/supabase';
import type { Song } from '@/types/song';

export async function getSongs(userId: string) {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Song[];
}

export async function addSong(song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('songs')
    .insert([
      {
        title: song.title,
        artist: song.artist,
        key: song.key,
        tempo: song.tempo,
        comments: song.comments,
        user_id: song.userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data as Song;
}

export async function updateSong(song: Partial<Song> & { id: string }) {
  const { data, error } = await supabase
    .from('songs')
    .update({
      title: song.title,
      artist: song.artist,
      key: song.key,
      tempo: song.tempo,
      comments: song.comments,
    })
    .eq('id', song.id)
    .select()
    .single();

  if (error) throw error;
  return data as Song;
}

export async function deleteSong(id: string) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}