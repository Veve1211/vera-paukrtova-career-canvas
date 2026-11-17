import { Fragment } from "react";

import { ArrowDown, ArrowRight } from "lucide-react";

import { useI18n } from "@/lib/i18n";

import { Reveal } from "./Reveal";

function Portrait() {
  const { t } = useI18n();
  const ring = `${t.hero.seal} · `;
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-none">
      <div className="arch relative aspect-[4/5] overflow-hidden border border-primary/15 bg-veil shadow-lift">
        <img
          src="/portrait.jpg"
          alt={t.ui.portraitAlt}
          width={1024}
          height={1280}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="object-cover object-center w-full h-full"
        />
      </div>

      {/* Tagline seal */}
      <div aria-hidden className="absolute -bottom-8 -left-6 size-28 sm:-left-10 sm:size-36">
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
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  const companies = h.proofCompanies;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-aura" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-2xl text-foreground sm:text-[1.7rem]">{h.name}</p>
            <p className="eyebrow mt-3 leading-relaxed text-primary">{h.role}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="font-display mt-8 text-[2.55rem] leading-[1.04] text-balance text-foreground sm:text-6xl lg:text-[4.35rem]"
            >
              {h.title[0]} <em className="font-normal text-primary italic">{h.title[1]}</em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{h.intro}</p>
          </Reveal>

          <Reveal delay={220} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#projekty"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-violet-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              {h.ctaProjects}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-card/70 px-6 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {h.ctaContact}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={280} className="mt-9">
            <ul aria-label={h.highlightsLabel} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-foreground">
              {h.highlights.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-primary/60" />}
                  <span className="whitespace-nowrap">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340} className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
            <p className="eyebrow text-muted-foreground">{h.proofLabel}</p>
            <p className="font-display text-base text-foreground sm:text-lg">
              {companies.map((c, i) => (
                <Fragment key={c}>
                  {i > 0 && " · "}
                  <span className="whitespace-nowrap">{c}</span>
                </Fragment>
              ))}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="px-8 sm:px-10 lg:col-span-5 lg:px-0 lg:pl-10">
          <Portrait />
        </Reveal>
      </div>
    </section>
  );
}
