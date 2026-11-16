import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { Lang } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { CvButton } from "./CvButton";

function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const options: { value: Lang; label: string }[] = [
    { value: "cs", label: "CZ" },
    { value: "en", label: "EN" },
  ];
  return (
    <div
      role="group"
      aria-label={t.ui.langSwitch}
      className={cn("inline-flex rounded-full border border-border bg-card/60 p-0.5 text-xs font-medium", className)}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          lang={o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            "rounded-full px-3 py-1.5 tracking-wider transition-colors",
            lang === o.value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = t.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [t.nav]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        open
          ? "border-b border-border/70 bg-background"
          : scrolled
            ? "border-b border-border/70 bg-background/[0.97] backdrop-blur-xl"
            : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Věra Paukrtová">
          <span className="font-display grid size-10 place-items-center rounded-full border border-primary/30 text-lg text-primary italic transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            VP
          </span>
          <span className="font-display hidden text-lg sm:inline">Věra Paukrtová</span>
        </a>

        <nav aria-label="Hlavní navigace" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500",
                      active === n.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CvButton className="hidden md:inline-flex" />
          <LangToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.ui.menuClose : t.ui.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-border/70 lg:hidden">
        <nav aria-label="Mobilní navigace" className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <ul className="grid gap-1">
            {t.nav.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display flex items-baseline gap-4 py-2.5 text-2xl"
                >
                  <span className="text-xs text-primary italic">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <CvButton className="mt-6" />
        </nav>
      </div>
    </header>
  );
}
