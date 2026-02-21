import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ChallengeCard({
  title,
  description,
  children,
  className,
}: ChallengeCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}
