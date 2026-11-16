import { ArrowUpRight, Github } from "lucide-react";

import ceskyKralShot from "@/assets/project-cesky-kral.jpg";
import cveckoShot from "@/assets/project-cvecko.jpg";
import type { Project } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const screenshots: Partial<Record<Project["id"], string>> = {
  cvecko: cveckoShot,
  "cesky-kral": ceskyKralShot,
};

function KompletoPreview() {
  // Abstract illustration of the concept: offers from several sources merging into one list.
  return (
    <div aria-hidden className="relative flex size-full items-center justify-center overflow-hidden bg-night p-6 sm:p-10">
      <div className="absolute inset-0 hairline-grid opacity-[0.07]" />
      <div className="absolute -top-20 -right-20 size-72 rounded-full bg-violet/40 blur-3xl" />
      <div className="relative grid w-full max-w-md gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-night-foreground/10 bg-night-foreground/[0.04] p-4 backdrop-blur"
            style={{ marginLeft: `${(i % 2) * 1.5}rem`, opacity: 1 - i * 0.16 }}
          >
            <span className="size-9 shrink-0 rounded-lg bg-veil" />
            <div className="flex-1 space-y-2">
              <span className="block h-2 w-3/5 rounded-full bg-night-foreground/60" />
              <span className="block h-2 w-2/5 rounded-full bg-night-foreground/20" />
            </div>
            <span className="h-5 w-12 rounded-full border border-orchid/40" />
          </div>
        ))}
      </div>
      <span className="font-display absolute bottom-5 left-6 text-3xl text-orchid/80 italic sm:text-4xl">Kompleto</span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();
  const shot = screenshots[project.id];
  const flip = index % 2 === 1;

  const preview = (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-700 group-hover:shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-orchid" />
        <span className="size-2.5 rounded-full bg-lilac" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate text-xs text-muted-foreground">
          {project.url ? project.url.replace(/^https?:\/\//, "") : project.statusLabel}
        </span>
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        {shot ? (
          <img
            src={shot}
            alt={`${project.name} — ${project.summary}`}
            loading="lazy"
            width={1440}
            height={900}
            className="size-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="size-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]">
            <KompletoPreview />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Reveal as="article" className="group grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
            {preview}
          </a>
        ) : (
          preview
        )}
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-sm text-primary/70 italic">{String(index + 1).padStart(2, "0")}</span>
          <span className="eyebrow text-muted-foreground">{project.kind}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              project.status === "live" ? "bg-lilac text-primary" : "border border-dashed border-primary/40 text-primary",
            )}
          >
            {project.status === "live" && <span className="size-1.5 rounded-full bg-violet" aria-hidden />}
            {project.statusLabel}
          </span>
        </div>

        <h3 className="font-display mt-5 text-4xl text-foreground sm:text-5xl">{project.name}</h3>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">{project.summary}</p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.details}</p>

        <dl className="mt-8 grid gap-6 border-t border-border pt-6">
          <div>
            <dt className="eyebrow text-primary">{t.ui.problem}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</dd>
          </div>
          <div>
            <dt className="eyebrow text-primary">{t.ui.tech}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/80">
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.url && project.urlLabel && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              {project.urlLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
              <span className="sr-only">{t.ui.newTab}</span>
            </a>
          )}
          {project.github ? (
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
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/70">
              <Github className="size-4" aria-hidden />
              {t.ui.githubSoon}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const { t } = useI18n();
  const p = t.projects;
  return (
    <section id="projekty" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-aura opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={p.index} label={p.label} title={p.title} intro={p.intro} />
        <div className="mt-20 grid gap-28 sm:gap-36">
          {p.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
