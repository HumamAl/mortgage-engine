interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  relevance,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {relevance && (
        <p className="text-xs text-primary mt-2 font-medium">{relevance}</p>
      )}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
