import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
    </div>
  );
}