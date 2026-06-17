import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { LangProvider, useLang } from "@/lib/lang-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel, type FilterKey } from "@/components/FilterPanel";
import { VerbCard } from "@/components/VerbCard";
import { PracticePanel } from "@/components/PracticePanel";
import { verbs, type Verb } from "@/data/verbs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nihongo Practice — Learn Japanese verbs" },
      {
        name: "description",
        content:
          "Practice Japanese verbs with multilingual search, group filters, and instant te-form drills. English, French, Spanish.",
      },
      { property: "og:title", content: "Nihongo Practice" },
      { property: "og:description", content: "Searchable, multilingual Japanese verb practice." },
    ],
  }),
  component: () => (
    <LangProvider>
      <Home />
    </LangProvider>
  ),
});

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function score(v: Verb, q: string) {
  if (!q) return 1;
  const n = normalize(q);
  const fields = [
    v.japanese, v.romaji, v.dictionary_form, v.masu_form, v.te_form,
    v.meaning_en, v.meaning_fr, v.meaning_es,
  ];
  let best = 0;
  for (const f of fields) {
    const nf = normalize(f);
    if (nf === n) best = Math.max(best, 3);
    else if (nf.startsWith(n)) best = Math.max(best, 2);
    else if (nf.includes(n)) best = Math.max(best, 1);
  }
  return best;
}

function Home() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mastered, setMastered] = useState(0);
  const [today, setToday] = useState(0);

  const filtered = useMemo(() => {
    let list = verbs.slice();
    if (filter === "G1" || filter === "G2" || filter === "G3") {
      list = list.filter((v) => v.group === filter);
    } else if (filter === "saved") {
      list = list.filter((v) => saved.has(v.id));
    }
    if (query.trim()) {
      const scored = list
        .map((v) => ({ v, s: score(v, query) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s);
      list = scored.map((x) => x.v);
    }
    return list;
  }, [filter, query, saved]);

  const practicePool = filtered.length ? filtered : verbs;
  const currentVerb = practicePool[currentIdx % practicePool.length] ?? null;

  const onPractice = (v: Verb) => {
    const idx = practicePool.findIndex((p) => p.id === v.id);
    if (idx >= 0) setCurrentIdx(idx);
  };

  const onNext = (correct: boolean) => {
    if (correct) setMastered((m) => m + 1);
    setToday((d) => d + 1);
    setCurrentIdx((i) => (i + 1) % practicePool.length);
  };

  const toggleSave = (v: Verb) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(v.id)) next.delete(v.id);
      else next.add(v.id);
      return next;
    });
  };

  const stats = {
    verbs: verbs.length,
    mastered,
    review: Math.max(0, today - mastered),
    today,
  };

  return (
    <div className="mx-auto max-w-[1500px] px-4 pb-12 pt-6 md:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground shadow-soft">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">Nihongo Practice</h1>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <LanguageSwitcher />
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)_400px]">
        <FilterPanel active={filter} onChange={setFilter} stats={stats} />

        <main className="rounded-3xl border border-border bg-surface p-5 shadow-soft">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">
                {query ? `${t.resultsFor} "${query}"` : t.allVerbsTitle}
              </h2>
              
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
              {filtered.length}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2 p-10 text-center text-sm text-muted-foreground">
              {t.noResults}
            </div>
          ) : (
            <div className="scrollbar-soft grid max-h-[78vh] gap-3 overflow-auto pr-1 md:grid-cols-2">
              {filtered.map((v) => (
                <VerbCard
                  key={v.id}
                  verb={v}
                  onPractice={onPractice}
                  saved={saved.has(v.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          )}
        </main>

        <PracticePanel pool={practicePool} current={currentVerb} onNext={onNext} />
      </div>
    </div>
  );
}
