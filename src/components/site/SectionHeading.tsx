import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  tone = "light",
}: {
  index: string;
  label: string;
  title: string[];
  intro?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-8">
        <p className={`eyebrow flex items-center gap-3 ${dark ? "text-orchid" : "text-primary"}`}>
          <span className="font-display text-base tracking-normal normal-case italic">{index}</span>
          <span aria-hidden className={`h-px w-10 ${dark ? "bg-orchid/50" : "bg-primary/40"}`} />
          {label}
        </p>
        <h2
          className={`font-display mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl ${dark ? "text-night-foreground" : "text-foreground"}`}
        >
          {title[0]}
          {title[1] && (
            <>
              <br />
              <em className={`font-normal italic ${dark ? "text-orchid" : "text-primary"}`}>
                {title[1]}
              </em>
            </>
          )}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={120} className="md:col-span-4">
          <p
            className={`text-base leading-relaxed ${dark ? "text-night-foreground/70" : "text-muted-foreground"}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
