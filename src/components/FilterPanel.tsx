import { useLang } from "@/lib/lang-context";
import type { VerbGroup } from "@/data/verbs";

export type FilterKey = "all" | VerbGroup | "te" | "saved";

interface Props {
  active: FilterKey;
  onChange: (k: FilterKey) => void;
  stats: { verbs: number; mastered: number; review: number; today: number };
}

export function FilterPanel({ active, onChange, stats }: Props) {
  const { t } = useLang();
  const chips: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.allVerbs },
    { key: "G1", label: t.group1 },
    { key: "G2", label: t.group2 },
    { key: "G3", label: t.group3 },
    
    { key: "saved", label: t.saved },
  ];
  const statItems = [
    { label: t.stats.verbs, value: stats.verbs },
    { label: t.stats.mastered, value: stats.mastered },
    { label: t.stats.review, value: stats.review },
    { label: t.stats.today, value: stats.today },
  ];

  return (
    <aside className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
      <h2 className="mb-3 text-lg font-bold">{t.filters}</h2>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.key}
            onClick={() => onChange(c.key)}
            className={`rounded-full border px-3 py-2 text-xs font-extrabold transition ${
              active === c.key
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-surface-2 text-foreground/70 hover:border-primary/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-4 rounded-2xl border border-dashed border-primary/30 bg-primary-soft px-4 py-3 text-[13px] leading-snug text-primary">
        {t.note}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {statItems.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-xl font-black">{s.value}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
