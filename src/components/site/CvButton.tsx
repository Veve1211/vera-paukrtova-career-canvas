import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

let cvCheck: Promise<boolean> | null = null;

/** True only when links.cvPdf really exists and is a PDF (hosting may answer missing files with the HTML page). */
function checkCv(url: string) {
  cvCheck ??= fetch(url, { method: "HEAD" })
    .then((res) => res.ok && (res.headers.get("content-type") ?? "").includes("pdf"))
    .catch(() => false);
  return cvCheck;
}

function useCvAvailable() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (!links.cvPdf) return;
    let alive = true;
    void checkCv(links.cvPdf).then((ok) => alive && setAvailable(ok));
    return () => {
      alive = false;
    };
  }, []);
  return available;
}

/** "Download CV" — hidden until the PDF from links.cvPdf is confirmed to exist in /public. */
export function CvButton({ className }: { className?: string }) {
  const { t } = useI18n();
  const available = useCvAvailable();
  if (!links.cvPdf || !available) return null;
  return (
    <a
      href={links.cvPdf}
      download
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      {t.ui.downloadCv}
    </a>
  );
}
