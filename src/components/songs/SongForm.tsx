import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { musicalKeys } from '@/types/song';
import type { Song } from '@/types/song';

const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  key: z.enum(['', ...musicalKeys] as const),
  tempo: z.string()
    .refine(val => !val || !isNaN(parseInt(val)), 'Tempo must be a number')
    .transform(val => val ? parseInt(val) : undefined)
    .optional(),
  comments: z.string().optional(),
});

type SongFormValues = z.infer<typeof songSchema>;

interface SongFormProps {
  song?: Song;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (values: SongFormValues) => Promise<void>;
}

export function SongForm({ song, open, onOpenChange, onSubmit }: SongFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SongFormValues>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: song?.title ?? '',
      artist: song?.artist ?? '',
      key: song?.key ?? '',
      tempo: song?.tempo?.toString() ?? '',
      comments: song?.comments ?? '',
    },
  });

  async function handleSubmit(values: SongFormValues) {
    setIsLoading(true);
    try {
      await onSubmit(values);
      form.reset();
      onOpenChange?.(false);
      toast({
        title: 'Success',
        description: song ? 'Song updated successfully.' : 'Song added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: song ? 'Failed to update song.' : 'Failed to add song.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{song ? 'Edit Song' : 'Add New Song'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter song title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter artist name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Musical Key</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select key" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {musicalKeys.map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tempo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo (BPM)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter tempo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes or comments"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (song ? 'Updating...' : 'Adding...') : (song ? 'Update Song' : 'Add Song')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}