import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const { t } = useI18n();
  const e = t.experience;
  return (
    <section id="zkusenosti" className="border-t border-border bg-card/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={e.index} label={e.label} title={e.title} intro={e.intro} />

        <ol className="relative mt-16 border-t border-border">
          {e.items.map((job, i) => (
            <Reveal
              as="li"
              key={job.company}
              delay={i * 60}
              className="group relative grid gap-4 border-b border-border py-10 transition-colors md:grid-cols-12 md:gap-8"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-700 group-hover:scale-y-100"
              />
              <div className="md:col-span-4 md:pl-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm text-primary/70 italic">{String(i + 1).padStart(2, "0")}</span>
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-2.5 py-0.5 text-xs font-medium text-primary">
                      <span className="size-1.5 rounded-full bg-violet" aria-hidden />
                      {t.ui.current}
                    </span>
                  )}
                  {job.period && <span className="text-xs text-muted-foreground">{job.period}</span>}
                </div>
                <h3 className="font-display mt-3 text-3xl text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                  {job.company}
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg font-medium text-foreground">{job.role}</p>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{job.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/75">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
