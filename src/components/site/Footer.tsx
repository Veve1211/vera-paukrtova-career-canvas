import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <p>
        © {new Date().getFullYear()} <span className="font-display text-foreground">Věra Paukrtová</span> · {t.footer.note}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        {links.email && (
          <a href={`mailto:${links.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
            <Mail className="size-4" aria-hidden />
            {links.email}
          </a>
        )}
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
          <Linkedin className="size-4" aria-hidden />
          LinkedIn
          <span className="sr-only">{t.ui.newTab}</span>
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary">
          <Github className="size-4" aria-hidden />
          GitHub
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
