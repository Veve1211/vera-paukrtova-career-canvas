import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { content } from "@/content/site";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Approach() {
  const a = content.approach;
  const [qo, qc] = ["„", "“"];
  return (
    <section
      id="pristup"
      className="relative overflow-hidden bg-night py-20 text-night-foreground sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-violet/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={a.index} label={a.label} title={a.title} tone="dark" />

        <Reveal delay={80}>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-night-foreground/85 sm:text-xl">
            {a.intro}
          </p>
        </Reveal>

        {/* Three connected areas */}
        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-orchid/60 via-orchid/30 to-orchid/60 lg:top-7 lg:right-[16.66%] lg:bottom-auto lg:left-[16.66%] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {a.pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.index}
                delay={i * 100}
                className="group relative pl-20 lg:pl-0 lg:text-center"
              >
                <span className="font-display absolute top-0 left-0 grid size-14 place-items-center rounded-full border border-orchid/50 bg-night text-lg text-orchid italic transition-colors duration-500 group-hover:bg-orchid group-hover:text-night lg:relative lg:mx-auto">
                  {p.index}
                </span>
                <div className="lg:mt-8 lg:rounded-3xl lg:border lg:border-night-foreground/10 lg:bg-night-foreground/[0.03] lg:p-8 lg:text-left lg:transition-colors lg:duration-500 lg:group-hover:border-orchid/30">
                  <h3 className="font-display pt-3 text-2xl sm:text-[1.7rem] lg:pt-0">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-night-foreground/80">
                    {p.text}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-night-foreground/20 px-3 py-1 text-xs text-night-foreground/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 rounded-3xl border border-orchid/25 bg-night-foreground/[0.04] p-6 sm:p-8">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg text-orchid italic sm:text-xl">
            {a.flow.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <ArrowRight className="size-4 shrink-0 text-orchid/70" aria-hidden />}
                <span>{step}</span>
              </Fragment>
            ))}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-night-foreground/85">
            {a.summary}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <h3 className="eyebrow text-orchid">{a.principlesTitle}</h3>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {a.principles.map((quote, i) => (
                <Reveal
                  as="figure"
                  key={quote}
                  delay={i * 80}
                  className="border-l border-orchid/50 pl-5"
                >
                  <blockquote className="font-display text-xl leading-snug sm:text-2xl">
                    {qo}
                    {quote}
                    {qc}
                  </blockquote>
                </Reveal>
              ))}
            </div>
            <Reveal delay={160}>
              <p className="mt-5 text-sm text-night-foreground/75">{a.principlesAuthor}</p>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-4">
            <h3 className="eyebrow text-orchid">{a.toolsTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-night-foreground/85">{a.toolsNote}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {a.tools.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-night-foreground/30 px-3 py-1 text-sm text-night-foreground/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
