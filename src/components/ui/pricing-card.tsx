import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export function PricingCard({ name, price, description, features }: PricingCardProps) {
  const isPro = name === 'Pro';
  
  return (
    <Card className={`relative border-2 transition-all duration-300 ${
      isPro 
        ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-blue-500/10' 
        : 'border-purple-500/20 hover:border-purple-500/30'
    }`}>
      <CardHeader>
        <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <div className="rounded-full p-1 bg-gradient-to-r from-purple-500 to-blue-500 mr-2">
                <Check className="h-3 w-3 text-white" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${
            isPro 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'border-purple-500/20 hover:bg-purple-500/10'
          }`}
          variant={isPro ? 'default' : 'outline'}
        >
          {name === 'Free' ? 'Get Started' : 'Try Pro Free'}
        </Button>
      </CardFooter>
    </Card>
  );
}