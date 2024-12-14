import { HeroBackground } from './hero/HeroBackground';
import { HeroContent } from './hero/HeroContent';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <HeroBackground />
      <div className="container mx-auto px-4 pt-16 relative z-10">
        <HeroContent />
      </div>
    </div>
  );
}