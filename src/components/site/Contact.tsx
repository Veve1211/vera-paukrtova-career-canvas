import { ArrowUpRight, Linkedin, Mail } from "lucide-react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { CvButton } from "./CvButton";
import { Reveal } from "./Reveal";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  return (
    <section id="kontakt" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-night px-5 py-24 text-night-foreground sm:rounded-[2.5rem] sm:px-8 sm:py-32">
        <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-24 size-[40rem] rounded-full bg-violet/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-orchid/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-orchid">
              <span className="font-display text-base tracking-normal normal-case italic">{c.index}</span>
              <span aria-hidden className="h-px w-10 bg-orchid/50" />
              {c.label}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display mt-8 max-w-4xl text-5xl leading-[1] sm:text-7xl lg:text-8xl" lang="en">
              Let's create something <em className="font-normal text-orchid italic">meaningful.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal delay={140} className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-night-foreground/80 sm:text-xl">{c.text}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-night-foreground px-6 py-3.5 text-sm font-medium text-night transition-transform hover:-translate-y-0.5"
                >
                  <Linkedin className="size-4" aria-hidden />
                  {c.linkedinCta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  <span className="sr-only">{t.ui.newTab}</span>
                </a>
                {links.email && (
                  <a
                    href={`mailto:${links.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-night-foreground/25 px-6 py-3.5 text-sm font-medium hover:border-orchid hover:text-orchid"
                  >
                    <Mail className="size-4" aria-hidden />
                    {links.email}
                  </a>
                )}
                <CvButton className="border-night-foreground/20 px-6 py-3.5 text-night-foreground/60" />
              </div>
              {!links.email && <p className="mt-5 text-sm text-night-foreground/55">{c.noEmail}</p>}
            </Reveal>

            <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow text-orchid">{c.areasTitle}</p>
              <ul className="mt-5 divide-y divide-night-foreground/10 border-y border-night-foreground/10">
                {c.areas.map((area, i) => (
                  <li key={area} className="flex items-baseline gap-4 py-4">
                    <span className="font-display text-sm text-orchid/70 italic">0{i + 1}</span>
                    <span className="font-display text-xl sm:text-2xl">{area}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
