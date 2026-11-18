import { ArrowUp, Linkedin } from "lucide-react";

import { content, links } from "@/content/site";

export function Footer() {
  const t = content;
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>
        © {new Date().getFullYear()} <span className="font-display text-foreground">Věra Paukrtová</span> · {t.footer.note}
      </p>
      <div className="flex items-center gap-6">
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
          <Linkedin className="size-4" aria-hidden />
          LinkedIn
          <span className="sr-only">{t.ui.newTab}</span>
        </a>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
          {t.ui.backToTop}
          <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
