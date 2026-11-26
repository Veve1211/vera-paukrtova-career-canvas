import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  GraduationCap,
  Pause,
  Play,
  X,
} from "lucide-react";

import ceskyKralMobile from "@/assets/project-cesky-kral-mobile.webp";
import ceskyKralShot from "@/assets/project-cesky-kral.webp";
import cisteRecenzeMobile from "@/assets/project-ciste-recenze-mobile.webp";
import cisteRecenzeShot from "@/assets/project-ciste-recenze.webp";
import cveckoMobile from "@/assets/project-cvecko-mobile.webp";
import cveckoShot from "@/assets/project-cvecko.webp";
import kompletoMobile from "@/assets/project-kompleto-mobile.webp";
import kompletoShot from "@/assets/project-kompleto.webp";
import paukrtMobile from "@/assets/project-paukrt-mobile.webp";
import paukrtShot from "@/assets/project-paukrt.webp";
import { content, type MissionId, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const missionIcons = { jobs: BriefcaseBusiness, education: GraduationCap } satisfies Record<
  MissionId,
  typeof BriefcaseBusiness
>;

/** Outlined tag naming the bigger project (mission); deliberately quieter than the filled status badge. */
function MissionTag({ mission }: { mission: MissionId }) {
  const Icon = missionIcons[mission];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-2.5 py-1 text-xs font-medium text-primary">
      <Icon className="size-3.5" aria-hidden />
      <span className="sr-only">{content.projects.missionLabel}: </span>
      {content.projects.missions[mission]}
    </span>
  );
}

/** Real screenshots of the apps (live sites; prototypes captured from their own code, sample data). */
const screenshots: Partial<Record<Project["id"], { desktop: string; mobile: string }>> = {
  cvecko: { desktop: cveckoShot, mobile: cveckoMobile },
  "cesky-kral": { desktop: ceskyKralShot, mobile: ceskyKralMobile },
  kompleto: { desktop: kompletoShot, mobile: kompletoMobile },
  "ciste-recenze": { desktop: cisteRecenzeShot, mobile: cisteRecenzeMobile },
  paukrt: { desktop: paukrtShot, mobile: paukrtMobile },
};

/**
 * Starts only when the visitor presses play (never by itself, so nothing moves uninvited —
 * WCAG 2.2.2); until then (or without JS) the screenshot stays. Once playing, it pauses
 * while scrolled out of view and resumes on return. preload="none" keeps the page light.
 */
/**
 * One round icon button, same corner for play and pause: quiet white over the screenshot,
 * fills plum on hover/focus. The full label stays as aria-label and tooltip.
 */
const videoControl =
  "absolute z-10 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-soft backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-20";

/**
 * Where the play button sits on each poster, as the centre in % of the preview: an empty spot
 * of that screenshot, so the button never covers its content. Fallback: bottom-left corner.
 */
const playSpots: Partial<Record<Project["id"], { x: number; y: number }>> = {
  cvecko: { x: 89, y: 73 },
  "cesky-kral": { x: 86, y: 45 },
  paukrt: { x: 80, y: 83 },
  kompleto: { x: 43, y: 37 },
  "ciste-recenze": { x: 88, y: 42 },
};
const defaultPlaySpot = { x: 10, y: 85 };

function LoopVideo({
  src,
  poster,
  label,
  spot = defaultPlaySpot,
}: {
  src: string;
  poster: string;
  label: string;
  spot?: { x: number; y: number } | undefined;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  /** The visitor's choice: play button pressed (true) or not yet / paused again (false). */
  const wanted = useRef(false);
  const inView = useRef(true);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const sync = () => {
    const video = ref.current;
    if (!video) return;
    if (wanted.current && inView.current) {
      // Playback can be refused (e.g. power saving); the poster and the play button stay then.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    setReady(true);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = !!entry?.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    wanted.current = video.paused;
    // The button is on screen, so the video is too.
    inView.current = true;
    sync();
  };

  return (
    <div className="relative size-full">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        width={1440}
        height={900}
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        className="size-full object-cover object-top"
      />
      {!started && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          width={1440}
          height={900}
          className="pointer-events-none absolute inset-0 size-full object-cover object-top"
        />
      )}
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? content.ui.pauseVideo : content.ui.playVideo}
          title={playing ? content.ui.pauseVideo : content.ui.playVideo}
          className={videoControl}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          {playing ? (
            <Pause className="size-6 fill-current sm:size-8" aria-hidden />
          ) : (
            <Play className="size-6 translate-x-0.5 fill-current sm:size-8" aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}

function KompletoPreview({ label }: { label: string }) {
  // Abstract illustration of the concept — explicitly labelled, never presented as a screenshot.
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-night p-6 sm:p-10">
      <div aria-hidden className="absolute inset-0 hairline-grid opacity-[0.07]" />
      <div
        aria-hidden
        className="absolute -top-20 -right-20 size-72 rounded-full bg-violet/40 blur-3xl"
      />
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
          {shot && project.video ? (
            <LoopVideo
              src={project.video.src}
              poster={shot.desktop}
              label={`${project.name} — ${project.video.alt}`}
              spot={playSpots[project.id]}
            />
          ) : shot ? (
            <img
              src={shot.desktop}
              alt={`${project.name} — ${content.ui.desktopView}`}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              className="size-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <KompletoPreview label={content.ui.conceptIllustration} />
          )}
        </div>
      </div>
      {/* The phone would cover part of the video (and its play button), so video cards show none. */}
      {shot && !project.video && (
        <div className="absolute right-3 bottom-0 w-[24%] min-w-[5.5rem] max-w-[9.5rem] overflow-hidden rounded-[1.1rem] border-[5px] border-night bg-night shadow-lift transition-transform duration-700 ease-out group-hover:-translate-y-1.5 sm:right-6 sm:rounded-[1.4rem]">
          <img
            src={shot.mobile}
            alt={`${project.name} — ${content.ui.mobileView}`}
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

/** Everything about one project: shown in the detail dialog, never on the list. */
function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <dl className="grid gap-6 border-t border-border pt-6">
        <div>
          <dt className="eyebrow text-primary">{content.ui.whatItDoes}</dt>
          <dd className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
            {project.about ?? project.summary}
          </dd>
        </div>
        {project.problem && (
          <div>
            <dt className="eyebrow text-primary">{content.ui.problem}</dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
              {project.problem}
            </dd>
          </div>
        )}
        {project.role && (
          <div>
            <dt className="eyebrow text-primary">{content.ui.role}</dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
              {project.role}
            </dd>
          </div>
        )}
        {project.state && (
          <div>
            <dt className="eyebrow text-primary">{content.ui.state}</dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
              {project.state}
            </dd>
          </div>
        )}
        {project.result && (
          <div>
            <dt className="eyebrow text-primary">{content.ui.result}</dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground sm:text-lg">
              {project.result}
            </dd>
          </div>
        )}
        {project.tech.length > 0 && (
          <div>
            <dt className="eyebrow text-primary">{content.ui.tech}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground"
                  >
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
              className="group/link inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-primary"
            >
              {project.urlLabel}
              <ArrowUpRight
                className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">{content.ui.newTab}</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <Github className="size-4" aria-hidden />
              {content.ui.github}
              <span className="sr-only">{content.ui.newTab}</span>
            </a>
          )}
        </div>
      )}
    </>
  );
}

/** Native <dialog>: Esc closes it, focus stays inside, the page behind is inert. */
function ProjectDialog({
  project,
  dialogRef,
}: {
  project: Project;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`project-detail-${project.id}`}
      onClick={(event) => {
        // A click on the dimmed backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="m-auto max-h-[100dvh] w-full max-w-none overflow-y-auto bg-background p-0 text-foreground backdrop:bg-night/70 sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-[1.75rem] sm:border sm:border-border"
    >
      <div className="min-h-full bg-aura p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-2.5 py-1 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-violet" aria-hidden />
                {project.statusLabel}
              </span>
              {project.mission && <MissionTag mission={project.mission} />}
            </div>
            <h4
              id={`project-detail-${project.id}`}
              className="mt-4 font-display text-4xl text-foreground sm:text-5xl"
            >
              {project.name}
            </h4>
            <p className="eyebrow mt-3 leading-relaxed text-muted-foreground">{project.kind}</p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground hover:border-primary hover:text-primary"
          >
            <X className="size-5" aria-hidden />
            <span className="sr-only">{content.ui.closeDetail}</span>
          </button>
        </div>
        <div className="mt-6">
          <Preview project={project} />
        </div>
        <div className="mt-6">
          <ProjectDetails project={project} />
        </div>
      </div>
    </dialog>
  );
}

function ProjectCard({
  project,
  index,
  headingLevel = "h3",
}: {
  project: Project;
  index: number;
  /** Upcoming projects sit under their own h3, so their cards use h4. */
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const flip = index % 2 === 1;
  const concept = project.status === "concept";
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <Reveal
      as="article"
      aria-labelledby={`project-${project.id}`}
      className={cn(
        "group relative grid min-w-0 grid-cols-1 gap-10 rounded-[1.75rem] border p-5 transition-colors duration-500 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-10",
        concept
          ? "border-dashed border-primary/30 bg-background"
          : "border-border bg-card/70 bg-aura hover:border-primary/25",
      )}
    >
      <div className={cn("min-w-0 lg:col-span-7", flip && "lg:order-2")}>
        <Preview project={project} />
      </div>

      <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-1")}>
        {/* Upcoming projects sit under their own heading, so they get no number or status badge. */}
        {!concept && (
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-sm text-primary italic">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-2.5 py-1 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-violet" aria-hidden />
              {project.statusLabel}
            </span>
            {project.mission && <MissionTag mission={project.mission} />}
          </div>
        )}

        <Heading
          id={`project-${project.id}`}
          className={cn("font-display text-4xl text-foreground sm:text-5xl", !concept && "mt-4")}
        >
          {project.name}
        </Heading>
        <p className="eyebrow mt-3 leading-relaxed text-muted-foreground">{project.kind}</p>
        <p className="mt-6 text-base leading-relaxed text-foreground">{project.summary}</p>

        {/* The whole card opens the detail (stretched button), the links live in the detail. */}
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground px-5 py-3 text-sm font-medium text-foreground transition-colors duration-300 after:absolute after:inset-0 after:rounded-[1.75rem] after:content-[''] group-hover:bg-foreground group-hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {content.ui.moreAbout}
          <span className="sr-only">{project.name}</span>
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>

      <ProjectDialog project={project} dialogRef={dialogRef} />
    </Reveal>
  );
}

export function Projects() {
  const p = content.projects;
  // Typed as Project[]: no concept is listed right now, but the "Připravuji" block stays ready for one.
  const items: Project[] = p.items;
  const live = items.filter((project) => project.status !== "concept");
  const upcoming = items.filter((project) => project.status === "concept");
  return (
    <section id="projekty" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-aura opacity-50"
      />
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
              <h3 className="font-display text-3xl text-foreground sm:text-4xl">
                {p.upcomingTitle}
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10">
              {upcoming.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} headingLevel="h4" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
