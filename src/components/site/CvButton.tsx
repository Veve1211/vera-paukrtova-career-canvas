import { Download } from "lucide-react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** "Download CV" — renders only once links.cvPdf is set in src/content/site.ts. */
export function CvButton({ className }: { className?: string }) {
  const { t } = useI18n();
  if (!links.cvPdf) return null;
  return (
    <a
      href={links.cvPdf}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      {t.ui.downloadCv}
      <span className="sr-only">{t.ui.newTab}</span>
    </a>
  );
}
