interface BeforeAfterProps {
  before: {
    label: string;
    items: string[];
  };
  after: {
    label: string;
    items: string[];
  };
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
        <p className="text-sm font-medium text-red-700 mb-2">{before.label}</p>
        <ul className="space-y-1.5">
          {before.items.map((item) => (
            <li key={item} className="text-sm text-red-600 flex gap-2">
              <span className="shrink-0">&#x2717;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-green-200 bg-green-50/50 p-4">
        <p className="text-sm font-medium text-green-700 mb-2">
          {after.label}
        </p>
        <ul className="space-y-1.5">
          {after.items.map((item) => (
            <li key={item} className="text-sm text-green-600 flex gap-2">
              <span className="shrink-0">&#x2713;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
