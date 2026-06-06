import { useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { pickMeaning, useLang } from "@/lib/lang-context";
import type { Verb, VerbGroup } from "@/data/verbs";

interface Props {
  pool: Verb[];
  current: Verb | null;
  onNext: (correct: boolean) => void;
}

type Scope = "all" | VerbGroup;

export function PracticePanel({ pool, current, onNext }: Props) {
  const { t, lang } = useLang();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [scope, setScope] = useState<Scope>("all");

  const sessionPool = useMemo(
    () => (scope === "all" ? pool : pool.filter((v) => v.group === scope)),
    [pool, scope],
  );

  if (!current) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
        <p className="text-sm text-muted-foreground">{t.noResults}</p>
      </div>
    );
  }

  const check = () => {
    const ok = answer.trim() === current.te_form;
    setFeedback(ok ? "correct" : "wrong");
  };
  const next = () => {
    const ok = feedback === "correct";
    setAnswer("");
    setFeedback(null);
    onNext(ok);
  };

  const scopes: { key: Scope; label: string }[] = [
    { key: "all", label: t.allVerbs },
    { key: "G1", label: "G1" },
    { key: "G2", label: "G2" },
    { key: "G3", label: "G3" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{t.practiceArea}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{t.practiceSub}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {t.sessionProgress}
          </div>
          <div className="mt-1.5 h-2 w-40 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover transition-[width]"
              style={{ width: `${Math.min(100, (sessionPool.length ? 50 : 0))}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface-2 p-5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t.prompt}</div>
        <div className="font-jp mt-2 text-4xl font-black leading-tight">{current.dictionary_form}</div>
        <div className="mt-1 text-sm text-muted-foreground">{pickMeaning(current, lang)}</div>
        <div className="mt-3 inline-block rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
          {current.group} • {current.rule}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (feedback ? next() : check())}
            placeholder={t.typeAnswer}
            className="font-jp h-12 flex-1 rounded-2xl border border-border bg-surface px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {feedback ? (
            <button
              onClick={next}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
            >
              {t.next} <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={check}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
            >
              <Check className="h-4 w-4" /> {t.check}
            </button>
          )}
        </div>

        {feedback === "correct" && (
          <div className="font-jp mt-3 rounded-2xl border border-success-border bg-success-soft px-4 py-3 text-sm font-bold text-success">
            {t.correct} {current.te_form}
          </div>
        )}
        {feedback === "wrong" && (
          <div className="font-jp mt-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
            {t.incorrect} {current.te_form}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface-2 p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t.quickSession}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {scopes.map((s) => (
            <button
              key={s.key}
              onClick={() => setScope(s.key)}
              className={`rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                scope === s.key
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground/70 hover:border-primary/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
