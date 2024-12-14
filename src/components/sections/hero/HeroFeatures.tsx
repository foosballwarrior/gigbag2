import { Check } from 'lucide-react';

export function HeroFeatures() {
  return (
    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
      <div className="flex items-center">
        <Check className="h-5 w-5 mr-2 text-purple-500" />
        Free Forever Plan
      </div>
      <div className="flex items-center">
        <Check className="h-5 w-5 mr-2 text-purple-500" />
        No Credit Card Required
      </div>
    </div>
  );
}