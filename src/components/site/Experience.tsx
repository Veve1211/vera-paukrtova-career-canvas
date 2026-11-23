import { content, type Experience as Job } from "@/content/site";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function Meta({ job }: { job: Job }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {job.current && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-2.5 py-0.5 text-xs font-medium text-primary">
          <span className="size-1.5 rounded-full bg-violet" aria-hidden />
          {content.ui.current}
        </span>
      )}
      {job.period && (
        <span className="text-sm text-muted-foreground tabular-nums">{job.period}</span>
      )}
    </div>
  );
}

function FeaturedJob({ job, delay }: { job: Job; delay: number }) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className="group relative grid gap-6 rounded-[1.5rem] border border-border bg-card p-6 shadow-soft transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-primary/30 sm:p-8 md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-4">
        <Meta job={job} />
        <h3 className="font-display mt-3 text-3xl text-foreground transition-colors group-hover:text-primary sm:text-4xl">
          {job.company}
        </h3>
        <p className="mt-2 text-base font-medium text-foreground">{job.role}</p>
      </div>
      <div className="md:col-span-8">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{job.summary}</p>
        <div className="mt-5 rounded-2xl bg-lilac/60 p-4 sm:p-5">
          <p className="eyebrow text-primary">{content.ui.transfer}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{job.transfer}</p>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function CompactJob({ job, delay }: { job: Job; delay: number }) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className="grid gap-3 border-t border-border py-6 md:grid-cols-12 md:gap-8"
    >
      <div className="md:col-span-4">
        <Meta job={job} />
        <h4 className="font-display mt-2 text-2xl text-foreground">{job.company}</h4>
        <p className="mt-1 text-sm font-medium text-foreground">{job.role}</p>
      </div>
      <div className="md:col-span-8">
        <p className="text-base leading-relaxed text-muted-foreground">{job.summary}</p>
        <p className="mt-2 border-l-2 border-primary/40 pl-3 text-sm leading-relaxed text-foreground">
          {job.transfer}
        </p>
      </div>
    </Reveal>
  );
}

export function Experience() {
  const e = content.experience;
  const featured = e.items.filter((j) => j.featured);
  const other = e.items.filter((j) => !j.featured);
  return (
    <section id="zkusenosti" className="border-b border-border bg-card/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={e.index} label={e.label} title={e.title} intro={e.intro} />

        <ol className="mt-14 grid gap-5 sm:mt-16">
          {featured.map((job, i) => (
            <FeaturedJob key={job.company} job={job} delay={i * 60} />
          ))}
        </ol>

        {other.length > 0 && (
          <div className="mt-16">
            <h3 className="eyebrow text-primary">{content.ui.moreExperience}</h3>
            <ul className="mt-4 border-b border-border">
              {other.map((job, i) => (
                <CompactJob key={job.company} job={job} delay={i * 60} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
