import { useLang } from "@/lib/lang-context";
import type { Lang } from "@/lib/i18n";

const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex gap-1 rounded-2xl border border-border bg-surface p-1.5 shadow-soft">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`h-9 rounded-xl px-3 text-sm font-extrabold transition ${
            lang === l.code
              ? "bg-primary text-primary-foreground shadow-soft"
              : "text-foreground/70 hover:bg-surface-2"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
