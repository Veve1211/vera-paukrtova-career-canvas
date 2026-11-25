import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";

import { content, links } from "@/content/site";

/**
 * /cv — opened by the "Stáhnout CV" button in a new tab. Vercel Web Analytics counts this page
 * view (no cookies), so visits of /cv in the dashboard = CV downloads. The page then starts the
 * PDF download itself and stays open with a manual link, so the analytics request isn't cut off.
 */
export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: content.cvPage.title },
      // A helper page, not content: keep it out of search results.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CvPage,
});

const button =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors";
const primary = `${button} bg-primary text-primary-foreground hover:bg-primary/90`;
const secondary = `${button} border border-foreground/20 text-foreground hover:border-primary hover:text-primary`;

function CvPage() {
  const t = content.cvPage;
  const pdf = links.cvPdf;
  const started = useRef(false);

  useEffect(() => {
    if (!pdf || started.current) return;
    started.current = true;
    const a = document.createElement("a");
    a.href = pdf;
    a.download = "";
    document.body.append(a);
    a.click();
    a.remove();
  }, [pdf]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="max-w-md text-center">
        <p className="font-display text-xl text-foreground">{content.hero.name}</p>
        <h1 className="font-display mt-6 text-4xl text-balance text-foreground">
          {pdf ? t.heading : t.unavailableHeading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {pdf ? t.text : t.unavailableText}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {pdf ? (
            <a href={pdf} download className={primary}>
              <Download className="size-4" aria-hidden />
              {t.manualLink}
            </a>
          ) : (
            <a href={links.linkedin} className={primary}>
              <Linkedin className="size-4" aria-hidden />
              LinkedIn
            </a>
          )}
          <a href="/" className={secondary}>
            <ArrowLeft className="size-4" aria-hidden />
            {t.back}
          </a>
        </div>
      </div>
    </main>
  );
}
