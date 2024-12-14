import { features } from '@/config/features';
import { SectionHeader } from '@/components/ui/section-header';
import { FeatureCard } from '@/components/ui/feature-card';

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Everything You Need"
          description="GigBag provides all the tools you need to manage your music career professionally."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}