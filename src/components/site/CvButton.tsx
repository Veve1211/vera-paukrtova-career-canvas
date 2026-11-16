import { Download } from "lucide-react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** "Download CV" — becomes a real download once links.cvPdf is set in src/content/site.ts. */
export function CvButton({ className }: { className?: string }) {
  const { t } = useI18n();
  const base =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors";

  if (!links.cvPdf) {
    return (
      <span
        aria-disabled="true"
        title={t.ui.cvSoon}
        className={cn(base, "cursor-not-allowed border-border text-muted-foreground/70", className)}
      >
        <Download className="size-4" aria-hidden />
        {t.ui.downloadCv}
        <span className="sr-only">— {t.ui.cvSoon}</span>
      </span>
    );
  }

  return (
    <a
      href={links.cvPdf}
      download
      className={cn(base, "border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground", className)}
    >
      <Download className="size-4" aria-hidden />
      {t.ui.downloadCv}
    </a>
  );
}
