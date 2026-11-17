import {
  AppWindow,
  ArrowRight,
  Bug,
  HeartHandshake,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons: Record<Service["icon"], LucideIcon> = {
  web: MonitorSmartphone,
  app: AppWindow,
  qa: Bug,
  cx: HeartHandshake,
};

export function Services() {
  const { t } = useI18n();
  const s = t.services;
  return (
    <section id="spoluprace" className="border-t border-border bg-card/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={s.index} label={s.label} title={s.title} />
        <ul className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {s.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal
                as="li"
                key={item.icon}
                delay={i * 70}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
              >
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-lilac opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="relative flex flex-1 flex-col">
                  <span className="grid size-12 place-items-center rounded-full border border-primary/25 bg-lilac/60 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display mt-6 text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                  <a
                    href="#kontakt"
                    className="group/link mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {s.cta}
                    <span className="sr-only">: {item.title}</span>
                    <ArrowRight
                      className="size-4 transition-transform group-hover/link:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
