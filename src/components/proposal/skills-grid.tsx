interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div key={category.name} className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-medium mb-2">{category.name}</h3>
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
