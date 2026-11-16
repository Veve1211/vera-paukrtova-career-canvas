import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  const { t } = useI18n();
  const s = t.skills;
  return (
    <section id="dovednosti" className="relative overflow-hidden bg-night py-24 text-night-foreground sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-violet/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={s.index} label={s.label} title={s.title} intro={s.intro} tone="dark" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-night-foreground/10 bg-night-foreground/10 sm:grid-cols-2">
          {s.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="group bg-night p-8 transition-colors duration-500 hover:bg-night-foreground/[0.04] sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-3xl">{g.title}</h3>
                <span className="font-display text-sm text-orchid/70 italic">{String(i + 1).padStart(2, "0")}</span>
              </div>
              {"note" in g && g.note && (
                <p className="eyebrow mt-3 text-orchid">— {g.note}</p>
              )}
              <ul className="mt-8 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-night-foreground/15 px-3.5 py-1.5 text-sm text-night-foreground/85 transition-colors group-hover:border-orchid/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
