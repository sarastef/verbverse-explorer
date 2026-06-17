import { Bookmark, Play } from "lucide-react";
import { pickExample, pickHint, pickMeaning, useLang } from "@/lib/lang-context";
import type { Verb } from "@/data/verbs";
import type { Lang } from "@/lib/i18n";

interface Props {
  verb: Verb;
  onPractice?: (v: Verb) => void;
  saved?: boolean;
  onToggleSave?: (v: Verb) => void;
}

function pickType(v: Verb, lang: Lang) {
  return lang === "fr" ? v.verb_type_fr : lang === "es" ? v.verb_type_es : v.verb_type_en;
}

const groupLabel = { G1: "Group 1", G2: "Group 2", G3: "Group 3" } as const;

export function VerbCard({ verb, onPractice, saved, onToggleSave }: Props) {
  const { lang, t } = useLang();

  const forms: Array<{ key: string; label: string; value: string; desc: string }> = [
    { key: "dict", label: t.dictionary.toUpperCase(), value: verb.dictionary_form, desc: t.dictionaryDesc },
    { key: "te", label: "て-FORM", value: verb.te_form, desc: t.teDesc },
    { key: "nai", label: "ない-FORM", value: verb.nai_form, desc: t.naiDesc },
  ];

  return (
    <article className="rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--primary)_30%,transparent)] md:p-7">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-jp mt-2 text-5xl font-black leading-none tracking-tight md:text-6xl">
            {verb.masu_form}
          </h3>
          <p className="mt-3 text-base text-muted-foreground">
            <span className="font-semibold text-foreground/80">{verb.romaji}</span>
            <span className="mx-2 text-foreground/40">•</span>
            {pickMeaning(verb, lang)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-extrabold text-primary">
            {groupLabel[verb.group]}
          </span>
          <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] font-semibold text-foreground/70">
            {pickType(verb, lang)}
          </span>
        </div>
      </header>

      {/* Form cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {forms.map((f) => (
          <div
            key={f.key}
            className="rounded-2xl border border-border bg-surface-2/60 p-4"
          >
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
              {f.label}
            </div>
            <div className="font-jp mt-2 text-2xl font-bold leading-none">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Family strip */}
      <div className="mt-4 rounded-2xl border border-primary-soft bg-primary-soft/40 px-4 py-3">
        <div className="text-[13px]">
          <span className="font-jp font-bold text-primary">{verb.dictionary_form}</span>{" "}
          <span className="font-bold text-primary">{t.family}</span>
        </div>
        <div className="font-jp mt-1 text-[13px] text-foreground/75">
          {verb.masu_form} → {verb.dictionary_form} · {verb.te_form} · {verb.nai_form}
        </div>
      </div>

      {/* Example */}
      <div className="mt-4 rounded-2xl border border-success-border bg-success-soft px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-success-border bg-surface px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-success">
            {t.te}-form
          </span>
          <span className="text-[11px] font-medium text-success/80">{verb.rule}</span>
        </div>
        <div className="font-jp mt-2 text-lg font-bold text-success">{verb.example_sentence}</div>
        <div className="mt-1 text-[13px] text-success/85">{pickExample(verb, lang)}</div>
      </div>

      {/* Hint */}
      <p className="mt-3 rounded-2xl border border-dashed border-border bg-surface-2 px-4 py-3 text-[12.5px] leading-snug text-foreground/70">
        {pickHint(verb, lang)}
      </p>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onPractice?.(verb)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft transition hover:bg-primary-hover"
        >
          <Play className="h-4 w-4" /> {t.practice}
        </button>
        <button
          onClick={() => onToggleSave?.(verb)}
          aria-pressed={saved}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-bold transition ${
            saved
              ? "border-primary bg-primary-soft text-primary"
              : "border-border bg-surface text-foreground/80 hover:bg-surface-2"
          }`}
        >
          <Bookmark className="h-4 w-4" /> {t.save}
        </button>
      </div>
    </article>
  );
}
