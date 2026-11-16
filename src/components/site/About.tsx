import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section id="o-mne" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={a.index} label={a.label} title={a.title} />

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            {a.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p
                  className={
                    i === 0
                      ? "font-display text-2xl leading-snug text-foreground sm:text-[1.75rem]"
                      : "text-base leading-relaxed text-muted-foreground sm:text-lg"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-primary">{a.strengthsTitle}</p>
            </Reveal>
            <ol className="mt-6 divide-y divide-border border-y border-border">
              {a.strengths.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 50} className="group grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                  <span className="font-display pt-0.5 text-sm text-primary/70 italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-foreground transition-colors group-hover:text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
