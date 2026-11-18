import { ArrowUpRight, Github } from "lucide-react";

import ceskyKralMobile from "@/assets/project-cesky-kral-mobile.webp";
import ceskyKralShot from "@/assets/project-cesky-kral.webp";
import cveckoMobile from "@/assets/project-cvecko-mobile.webp";
import cveckoShot from "@/assets/project-cvecko.webp";
import paukrtMobile from "@/assets/project-paukrt-mobile.webp";
import paukrtShot from "@/assets/project-paukrt.webp";
import type { Project } from "@/content/site";
import { content } from "@/content/site";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Real screenshots of the live apps (captured from the running sites). */
const screenshots: Partial<Record<Project["id"], { desktop: string; mobile: string }>> = {
  cvecko: { desktop: cveckoShot, mobile: cveckoMobile },
  "cesky-kral": { desktop: ceskyKralShot, mobile: ceskyKralMobile },
  paukrt: { desktop: paukrtShot, mobile: paukrtMobile },
};

function KompletoPreview({ label }: { label: string }) {
  // Abstract illustration of the concept — explicitly labelled, never presented as a screenshot.
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-night p-6 sm:p-10">
      <div aria-hidden className="absolute inset-0 hairline-grid opacity-[0.07]" />
      <div aria-hidden className="absolute -top-20 -right-20 size-72 rounded-full bg-violet/40 blur-3xl" />
      <div aria-hidden className="relative grid w-full max-w-md gap-2 sm:gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-dashed border-night-foreground/20 bg-night-foreground/[0.04] p-2.5 sm:gap-4 sm:p-4",
              i === 3 && "hidden sm:flex",
            )}
            style={{ marginLeft: `${(i % 2) * 1.5}rem`, opacity: 1 - i * 0.16 }}
          >
            <span className="size-7 shrink-0 rounded-lg bg-veil sm:size-9" />
            <div className="flex-1 space-y-2">
              <span className="block h-2 w-3/5 rounded-full bg-night-foreground/60" />
              <span className="block h-2 w-2/5 rounded-full bg-night-foreground/20" />
            </div>
            <span className="h-5 w-12 rounded-full border border-orchid/40" />
          </div>
        ))}
      </div>
      <p className="absolute right-4 bottom-4 left-4 text-center text-xs text-night-foreground/80 sm:right-auto sm:left-6 sm:text-left">
        {label}
      </p>
    </div>
  );
}

function Preview({ project }: { project: Project }) {
  const t = content;
  const shot = screenshots[project.id];
  return (
    <div className="relative pb-8 sm:pb-10">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-700 group-hover:shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span aria-hidden className="size-2.5 rounded-full bg-orchid" />
          <span aria-hidden className="size-2.5 rounded-full bg-lilac" />
          <span aria-hidden className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 truncate text-xs text-muted-foreground">
            {project.url ? project.url.replace(/^https?:\/\//, "") : project.name}
          </span>
        </div>
        <div className="aspect-[16/10] overflow-hidden">
          {shot ? (
            <img
              src={shot.desktop}
              alt={`${project.name} — ${t.ui.desktopView}`}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              className="size-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <KompletoPreview label={t.ui.conceptIllustration} />
          )}
        </div>
      </div>
      {shot && (
        <div className="absolute right-3 bottom-0 w-[24%] min-w-[5.5rem] max-w-[9.5rem] overflow-hidden rounded-[1.1rem] border-[5px] border-night bg-night shadow-lift transition-transform duration-700 ease-out group-hover:-translate-y-1.5 sm:right-6 sm:rounded-[1.4rem]">
          <img
            src={shot.mobile}
            alt={`${project.name} — ${t.ui.mobileView}`}
            loading="lazy"
            decoding="async"
            width={540}
            height={1168}
            className="aspect-[9/17] w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = content;
  const flip = index % 2 === 1;
  const concept = project.status === "concept";

  return (
    <Reveal
      as="article"
      aria-labelledby={`project-${project.id}`}
      className={cn(
        "group grid gap-10 rounded-[1.75rem] border p-5 transition-colors duration-500 sm:p-8 lg:grid-cols-12 lg:items-start lg:gap-12 lg:p-10",
        concept ? "border-dashed border-primary/30 bg-background" : "border-border bg-card/70 hover:border-primary/25",
      )}
    >
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <Preview project={project} />
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        {/* Upcoming projects sit under their own heading, so they get no number or status badge. */}
        {!concept && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-sm text-primary italic">{String(index + 1).padStart(2, "0")}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-2.5 py-1 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-violet" aria-hidden />
              {project.statusLabel}
            </span>
          </div>
        )}

        <h3 id={`project-${project.id}`} className={cn("font-display text-4xl text-foreground sm:text-5xl", !concept && "mt-4")}>
          {project.name}
        </h3>
        <p className="eyebrow mt-3 leading-relaxed text-muted-foreground">{project.kind}</p>

        <dl className="mt-7 grid gap-5 border-t border-border pt-6">
          <div>
            <dt className="eyebrow text-primary">{t.ui.whatItDoes}</dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground">{project.summary}</dd>
          </div>
          {project.problem && (
            <div>
              <dt className="eyebrow text-primary">{t.ui.problem}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</dd>
            </div>
          )}
          {project.role && (
            <div>
              <dt className="eyebrow text-primary">{t.ui.role}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.role}</dd>
            </div>
          )}
          {project.state && (
            <div>
              <dt className="eyebrow text-primary">{t.ui.state}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.state}</dd>
            </div>
          )}
          {project.tech.length > 0 && (
            <div>
              <dt className="eyebrow text-primary">{t.ui.tech}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground">
                      {tech}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>

        {(project.url || project.github) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.url && project.urlLabel && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-primary"
              >
                {project.urlLabel}
                <ArrowUpRight className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
                <span className="sr-only">{t.ui.newTab}</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Github className="size-4" aria-hidden />
                {t.ui.github}
                <span className="sr-only">{t.ui.newTab}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Projects() {
  const t = content;
  const p = t.projects;
  const live = p.items.filter((project) => project.status !== "concept");
  const upcoming = p.items.filter((project) => project.status === "concept");
  return (
    <section id="projekty" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-aura opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={p.index} label={p.label} title={p.title} intro={p.intro} />
        <div className="mt-14 grid gap-8 sm:mt-16 sm:gap-10">
          {live.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        {upcoming.length > 0 && (
          <div className="mt-20 sm:mt-24">
            <Reveal>
              <h3 className="font-display text-3xl text-foreground sm:text-4xl">{p.upcomingTitle}</h3>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10">
              {upcoming.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
