import { Bookmark, Play } from "lucide-react";
import { pickExample, pickHint, pickMeaning, useLang } from "@/lib/lang-context";
import type { Verb } from "@/data/verbs";

interface Props {
  verb: Verb;
  onPractice?: (v: Verb) => void;
  saved?: boolean;
  onToggleSave?: (v: Verb) => void;
}

export function VerbCard({ verb, onPractice, saved, onToggleSave }: Props) {
  const { lang, t } = useLang();
  return (
    <article className="rounded-3xl border border-border bg-surface-2 p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-jp text-4xl font-black leading-none tracking-tight">{verb.japanese}</div>
          <div className="mt-1.5 text-sm text-muted-foreground">{verb.romaji}</div>
          <div className="mt-2 text-sm text-foreground/80">{pickMeaning(verb, lang)}</div>
        </div>
        <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
          {verb.group} • {verb.rule}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          [t.dictionary, verb.dictionary_form],
          [t.masu, verb.masu_form],
          [t.te, verb.te_form],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-background p-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="font-jp mt-1 text-base font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border border-success-border bg-success-soft px-3.5 py-3">
        <div className="font-jp font-black text-success">{verb.example_sentence}</div>
        <div className="mt-1 text-[13px] text-success/80">{pickExample(verb, lang)}</div>
      </div>

      <p className="mt-3 rounded-2xl border border-dashed border-border bg-surface-2 px-3.5 py-3 text-[13px] leading-snug text-foreground/70">
        {pickHint(verb, lang)}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onPractice?.(verb)}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
        >
          <Play className="h-4 w-4" /> {t.practice}
        </button>
        <button
          onClick={() => onToggleSave?.(verb)}
          aria-pressed={saved}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-bold transition ${
            saved
              ? "border-primary bg-primary-soft text-primary"
              : "border-border bg-background text-foreground/80 hover:bg-surface-2"
          }`}
        >
          <Bookmark className="h-4 w-4" /> {t.save}
        </button>
      </div>
    </article>
  );
}
