import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Dict, type Lang } from "./i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("nihongo-lang") as Lang | null) : null;
    if (saved && ["en", "fr", "es"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("nihongo-lang", l);
  };

  return <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LangProvider");
  return c;
}

export function pickMeaning(v: { meaning_en: string; meaning_fr: string; meaning_es: string }, lang: Lang) {
  return lang === "fr" ? v.meaning_fr : lang === "es" ? v.meaning_es : v.meaning_en;
}
export function pickExample(v: { example_en: string; example_fr: string; example_es: string }, lang: Lang) {
  return lang === "fr" ? v.example_fr : lang === "es" ? v.example_es : v.example_en;
}
export function pickHint(v: { hint_en: string; hint_fr: string; hint_es: string }, lang: Lang) {
  return lang === "fr" ? v.hint_fr : lang === "es" ? v.hint_es : v.hint_en;
}
