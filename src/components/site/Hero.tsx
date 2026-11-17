import { Fragment } from "react";

import { ArrowDown, ArrowUpRight, Linkedin } from "lucide-react";

import portrait from "@/assets/portrait.jpg.asset.json";
import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";

function Portrait() {
  const { t } = useI18n();
  const ring = `${t.hero.tagline} · `;
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-none">
      {/* Arched portrait frame */}
      <div className="arch relative aspect-[4/5] overflow-hidden border border-primary/15 bg-veil shadow-lift">
        <img
          src={portrait.url}
          alt={t.ui.portraitAlt}
          width={1024}
          height={1280}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Rotating tagline seal */}
      <div aria-hidden className="absolute -bottom-8 -left-6 size-32 sm:-left-10 sm:size-36">
        <div className="grid size-full place-items-center rounded-full bg-night text-night-foreground shadow-lift">
          <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow">
            <defs>
              <path id="seal-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text className="fill-current text-[7.6px] uppercase">
              <textPath href="#seal-circle" textLength="272" lengthAdjust="spacing">
                {ring}
              </textPath>
            </text>
          </svg>
          <span className="font-display text-2xl text-orchid italic">VP</span>
        </div>
      </div>

      <div aria-hidden className="absolute -top-5 right-4 size-14 animate-float-slow rounded-full border border-primary/25 bg-background/40 backdrop-blur" />
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const companies = t.experience.items.map((e) => e.company);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-44 lg:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-aura" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex flex-col gap-1.5 text-primary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <span>{t.hero.eyebrow}</span>
              <span aria-hidden className="hidden h-px w-6 bg-primary/40 sm:block" />
              <span className="text-muted-foreground">{t.hero.eyebrowSecond}</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display mt-8 text-[3.6rem] leading-[0.92] text-foreground sm:text-[5.5rem] lg:text-[6.75rem]">
              {t.hero.name[0]}
              <br />
              <em className="font-normal text-primary italic">{t.hero.name[1]}</em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="font-display mt-8 text-2xl text-foreground/90 italic sm:text-3xl">{t.hero.tagline}</p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t.hero.intro}</p>
          </Reveal>

          <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projekty"
              className="group inline-flex items-center gap-2 rounded-full bg-violet-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaProjects}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#zkusenosti"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/70 px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {t.hero.ctaExperience}
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              <Linkedin className="size-4" aria-hidden />
              {t.hero.ctaLinkedin}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              <span className="sr-only">{t.ui.newTab}</span>
            </a>
          </Reveal>

          <Reveal delay={380} className="mt-14 grid gap-4 border-t border-border pt-6 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
            <p className="eyebrow text-muted-foreground">{t.hero.proofLabel}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
              <p className="font-display text-lg text-foreground">
                {companies.map((c, i) => (
                  <Fragment key={c}>
                    {i > 0 && " · "}
                    <span className="whitespace-nowrap">{c}</span>
                  </Fragment>
                ))}
              </p>
              <p className="text-sm text-primary">{t.hero.proofProjects}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="px-6 sm:px-10 lg:col-span-5 lg:px-0 lg:pl-8">
          <Portrait />
        </Reveal>
      </div>
    </section>
  );
}
