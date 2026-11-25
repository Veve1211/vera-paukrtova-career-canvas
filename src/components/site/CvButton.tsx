import { Download } from "lucide-react";

import { content, cvPagePath, links } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Download CV" — renders only once links.cvPdf is set in src/content/site.ts.
 * Links to the /cv page, which starts the download: Vercel Analytics counts each visit of /cv,
 * so page views of /cv = CV downloads (custom events need a paid plan; this needs no cookies).
 */
export function CvButton({ className }: { className?: string }) {
  if (!links.cvPdf) return null;
  return (
    <a
      href={cvPagePath}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      {content.ui.downloadCv}
      <span className="sr-only">{content.ui.newTab}</span>
    </a>
  );
}
