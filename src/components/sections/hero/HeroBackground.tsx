import { cn } from '@/lib/utils';

interface HeroBackgroundProps {
  className?: string;
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <>
      {/* Background Image */}
      <div 
        className={cn(
          "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070')] bg-cover bg-center",
          className
        )}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-background" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
      
      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
    </>
  );
}