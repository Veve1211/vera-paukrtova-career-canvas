import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { content, type Lang, type SiteContent } from "@/content/site";

const STORAGE_KEY = "vp-lang";

type I18n = { lang: Lang; t: SiteContent; setLang: (lang: Lang) => void };

const I18nContext = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Czech is the default (and what search engines see); a saved choice is applied after hydration.
  const [lang, setLangState] = useState<Lang>("cs");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "cs" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const { title, description } = content[lang].meta;
    document.title = title;
    // Keep the description and Open Graph tags in the chosen language (Czech is what crawlers see).
    const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: content[lang], setLang }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
