import { ArrowUpRight, ChevronDown, Github } from "lucide-react";

import {
  allPageSpeedScores,
  formatCs,
  measuredAt,
  measuredLabel,
  pageSpeedAverage,
  projectsQuality,
  securityHeadersRange,
  type ProjectQuality,
} from "@/content/quality";
import { content } from "@/content/site";

import { SectionHeading } from "./SectionHeading";

/**
 * "Technická kvalita a ověřené výsledky": lab measurements of every deployed project.
 * Deliberately static (no reveal or hover motion): it is a reference table, not a show.
 * Numbers come from src/content/quality.ts, texts from src/content/site.ts.
 */

const q = content.quality;
const l = q.labels;

/** True when accessibility, best practices and SEO are 100 on both devices. */
function otherCategoriesFull(p: ProjectQuality) {
  return [p.pageSpeed.mobile, p.pageSpeed.desktop].every(
    (s) => s.accessibility === 100 && s.bestPractices === 100 && s.seo === 100,
  );
}

function allSeoFull() {
  return projectsQuality.every(
    (p) => p.pageSpeed.mobile.seo === 100 && p.pageSpeed.desktop.seo === 100,
  );
}

function Stats() {
  const scores = allPageSpeedScores();
  const stats = [
    { value: String(projectsQuality.length), label: q.stats.projects, note: q.stats.projectsNote },
    {
      // Whole points: the lab score varies by a few points between runs anyway.
      value: formatCs(pageSpeedAverage(), 0),
      label: q.stats.average,
      note: q.stats.averageNote.replace("{count}", String(scores.length)),
    },
    ...(allSeoFull() ? [{ value: "100", label: q.stats.seo, note: q.stats.seoNote }] : []),
    { value: securityHeadersRange(), label: q.stats.headers, note: q.stats.headersNote },
  ];
  return (
    <dl
      aria-label={q.statsLabel}
      className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border min-[420px]:grid-cols-2 sm:mt-16 lg:grid-cols-4"
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end bg-card p-6 sm:p-7">
          <dt className="mt-3">
            <span className="block text-sm font-medium text-foreground">{s.label}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {s.note}
            </span>
          </dt>
          <dd className="font-display text-4xl leading-none text-primary sm:text-5xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Practices() {
  return (
    <div className="mt-16 sm:mt-20">
      <h3 className="font-display text-3xl text-foreground sm:text-4xl">{q.practicesTitle}</h3>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {q.practices.map((p) => (
          <li key={p.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h4 className="eyebrow text-primary">{p.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{p.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border py-3">
      <dt className="text-sm text-muted-foreground">{term}</dt>
      <dd className="text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}

function ProjectResult({ project }: { project: ProjectQuality }) {
  const ps = project.pageSpeed;
  const headingId = `kvalita-${project.id}`;
  return (
    <li>
      <article
        aria-labelledby={headingId}
        className="flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-5 sm:p-8"
      >
        <h4 id={headingId} className="font-display text-2xl text-foreground sm:text-3xl">
          {project.name}
        </h4>
        <p className="eyebrow mt-2 leading-relaxed text-muted-foreground">{project.kind}</p>

        <dl className="mt-6">
          <div className="pb-4">
            <dt className="text-sm text-muted-foreground">{l.pageSpeed}</dt>
            <dd className="mt-3">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  { label: l.mobile, value: ps.mobile.performance },
                  { label: l.desktop, value: ps.desktop.performance },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="flex flex-col-reverse justify-end rounded-2xl bg-lilac px-4 py-3"
                  >
                    <dt className="mt-1 text-xs text-muted-foreground">{d.label}</dt>
                    <dd className="font-display text-3xl leading-none text-primary">
                      {d.value}
                      <span className="sr-only"> {l.outOf100}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </dd>
          </div>
          <Row term={l.otherCategories}>
            {otherCategoriesFull(project)
              ? l.otherCategoriesValue
              : `${l.mobile} ${ps.mobile.accessibility} / ${ps.mobile.bestPractices} / ${ps.mobile.seo}, ${l.desktop} ${ps.desktop.accessibility} / ${ps.desktop.bestPractices} / ${ps.desktop.seo}`}
          </Row>
          <Row term={l.gtmetrix}>
            {l.gtmetrixPerformance} {project.gtmetrix.performance}&nbsp;% · {l.gtmetrixStructure}{" "}
            {project.gtmetrix.structure}&nbsp;%
          </Row>
          <Row term={l.securityHeaders}>{project.securityHeaders}</Row>
          <Row term={l.sslLabs}>
            {project.sslLabs}
            {project.sslLabsNote && (
              <span className="font-normal text-muted-foreground"> ({project.sslLabsNote})</span>
            )}
          </Row>
          <Row term={l.waveAim}>
            {project.waveAim === null ? (
              <span className="font-normal text-muted-foreground">{l.notMeasured}</span>
            ) : (
              <>
                {formatCs(project.waveAim, 1)} {l.outOf10}
              </>
            )}
          </Row>
        </dl>

        <h5 className="eyebrow mt-6 text-primary">{l.practices}</h5>
        <ul className="mt-3 grid gap-2">
          {project.practices.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {l.live}
            <span className="sr-only">
              {" "}
              {project.name} {content.ui.newTab}
            </span>
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              <Github className="size-4" aria-hidden />
              {l.github}
              <span className="sr-only">
                {" "}
                {project.name} {content.ui.newTab}
              </span>
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

function Notes() {
  return (
    <div className="mt-16 rounded-3xl border border-border bg-background p-6 sm:mt-20 sm:p-10">
      <h3 className="font-display text-2xl text-foreground sm:text-3xl">{q.notesTitle}</h3>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
        {q.notes.map((n) => (
          <li key={n.title} className="border-l border-primary/40 pl-4">
            <h4 className="text-base font-semibold text-foreground">{n.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Quality() {
  const [before, after] = q.footnote.split("{date}");
  return (
    <section id="kvalita" className="border-y border-border bg-mist/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={q.index} label={q.label} title={q.title} intro={q.intro} />
        <Stats />
        <p className="mt-6 text-sm text-muted-foreground">
          {before}
          <time dateTime={measuredAt}>{measuredLabel}</time>
          {after}
        </p>
        {/* Details are for developers; clients get the summary above without the long tables. */}
        <details className="group mt-10">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-foreground/20 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary [&::-webkit-details-marker]:hidden">
            {q.detailsToggle}
            <ChevronDown
              className="size-4 transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <Practices />
          <div className="mt-16 sm:mt-20">
            <h3 className="font-display text-3xl text-foreground sm:text-4xl">{q.resultsTitle}</h3>
            <ul className="mt-8 grid gap-6 lg:grid-cols-2">
              {projectsQuality.map((p) => (
                <ProjectResult key={p.id} project={p} />
              ))}
            </ul>
          </div>
          <Notes />
        </details>
      </div>
    </section>
  );
}
