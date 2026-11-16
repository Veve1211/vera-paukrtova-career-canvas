import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  const { t } = useI18n();
  const e = t.education;
  return (
    <section id="vzdelani" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={e.index} label={e.label} title={e.title} />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2">
          {e.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 70}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 sm:p-9"
            >
              <div aria-hidden className="absolute -top-16 -right-16 size-40 rounded-full bg-lilac opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow text-primary">{item.type}</p>
                  {item.year && <p className="font-display text-sm text-muted-foreground italic">{item.year}</p>}
                </div>
                <h3 className="font-display mt-5 text-2xl text-foreground sm:text-[1.7rem]">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.provider}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
