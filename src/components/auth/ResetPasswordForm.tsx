import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ResetValues = z.infer<typeof resetSchema>;

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ResetValues) {
    setIsLoading(true);

    try {
      await resetPassword(values.email);
      toast({
        title: 'Success',
        description: 'Check your email for a password reset link.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending link...' : 'Send reset link'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}