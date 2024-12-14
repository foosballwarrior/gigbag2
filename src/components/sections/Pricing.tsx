import { plans } from '@/config/plans';
import { SectionHeader } from '@/components/ui/section-header';
import { PricingCard } from '@/components/ui/pricing-card';

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Simple, Transparent Pricing"
          description="Choose the plan that best fits your needs. Upgrade or downgrade anytime."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}