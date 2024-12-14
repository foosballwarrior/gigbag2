interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}