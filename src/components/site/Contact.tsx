import { ArrowUpRight, Linkedin, Mail } from "lucide-react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { CvButton } from "./CvButton";
import { Reveal } from "./Reveal";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  return (
    <section id="kontakt" aria-labelledby="contact-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-night px-5 py-20 text-night-foreground sm:rounded-[2.5rem] sm:px-8 sm:py-28">
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
            <h2 id="contact-title" className="font-display mt-8 max-w-4xl text-4xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              {c.title[0]} <em className="font-normal text-orchid italic">{c.title[1]}</em>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal delay={140} className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-night-foreground/85 sm:text-xl">{c.text}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {links.email && (
                  <a
                    href={`mailto:${links.email}`}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-night-foreground px-8 py-4 text-base font-medium text-night transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Mail className="size-5" aria-hidden />
                    {c.emailCta}
                  </a>
                )}
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-night-foreground/40 px-8 py-4 text-base font-medium text-night-foreground transition-colors duration-300 hover:bg-night-foreground hover:text-night"
                >
                  <Linkedin className="size-5" aria-hidden />
                  LinkedIn
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  <span className="sr-only">{t.ui.newTab}</span>
                </a>
              </div>
              {/* Appears automatically once links.cvPdf is set */}
              <CvButton className="mt-6 border-night-foreground/30 px-6 py-3.5 text-night-foreground hover:bg-night-foreground hover:text-night" />
            </Reveal>

            <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
              <h3 className="eyebrow text-orchid">{c.areasTitle}</h3>
              <ul className="mt-5 divide-y divide-night-foreground/10 border-y border-night-foreground/10">
                {c.areas.map((area, i) => (
                  <li key={area} className="flex items-baseline gap-4 py-4">
                    <span className="font-display text-sm text-orchid italic">0{i + 1}</span>
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
