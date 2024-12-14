import { LucideIcon } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="border-purple-500/20 bg-gradient-to-b from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300">
      <CardHeader>
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}