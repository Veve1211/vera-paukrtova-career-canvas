import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { content, type Lang, type SiteContent } from "@/content/site";

const STORAGE_KEY = "vp-lang";

type I18n = { lang: Lang; t: SiteContent; setLang: (lang: Lang) => void };

const I18nContext = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The site is Czech only. A language saved by the old CZ/EN switch is dropped.
  const [lang, setLangState] = useState<Lang>("cs");

  useEffect(() => {
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
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
