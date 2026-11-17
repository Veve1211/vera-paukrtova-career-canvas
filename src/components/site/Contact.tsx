import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { links } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { CvButton } from "./CvButton";
import { Reveal } from "./Reveal";

const fieldClass =
  "w-full rounded-2xl border border-night-foreground/20 bg-night-foreground/[0.04] px-4 py-3 text-base text-night-foreground placeholder:text-night-foreground/40 transition-colors focus:border-orchid focus:outline-none focus-visible:ring-2 focus-visible:ring-orchid/40";

function CopyEmail({ email }: { email: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the address stays visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t.contact.copied : t.contact.copy}
      title={t.contact.copy}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-night-foreground/25 text-night-foreground transition-colors hover:border-orchid hover:text-orchid"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span className="sr-only" aria-live="polite">
        {copied ? t.contact.copied : ""}
      </span>
    </button>
  );
}

function MailtoForm({ email }: { email: string }) {
  const { t } = useI18n();
  const f = t.contact.form;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = `${message}\n\n—\n${name}\n${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-night-foreground/10 bg-night-foreground/[0.03] p-5 sm:p-7">
      <h3 className="font-display text-2xl">{f.title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-night-foreground/85">{f.name}</span>
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-night-foreground/85">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="text-night-foreground/85">{f.message}</span>
        <textarea name="message" required rows={5} className={`${fieldClass} resize-y`} />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-night-foreground/70">{f.note}</p>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-night-foreground px-6 py-3 text-sm font-medium text-night transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Send className="size-4" aria-hidden />
          {f.submit}
        </button>
      </div>
    </form>
  );
}

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const email = links.email;
  return (
    <section id="kontakt" aria-labelledby="contact-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-night px-5 py-20 text-night-foreground sm:rounded-[2.5rem] sm:px-8 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-24 size-[40rem] rounded-full bg-violet/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-orchid/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-orchid">
              <span className="font-display text-base tracking-normal normal-case italic">{c.index}</span>
              <span aria-hidden className="h-px w-10 bg-orchid/50" />
              {c.label}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="contact-title" className="font-display mt-8 max-w-4xl text-4xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              {c.title[0]} <em className="font-normal text-orchid italic">{c.title[1]}</em>
            </h2>
            <p className="font-display mt-6 max-w-3xl text-xl text-night-foreground/90 sm:text-2xl">{c.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal delay={140} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-night-foreground/85">{c.text}</p>

              {email && (
                <div className="mt-10 grid gap-4">
                  <a
                    href={`mailto:${email}`}
                    className="group inline-flex min-h-11 items-center justify-center gap-2 justify-self-start rounded-full bg-night-foreground px-6 py-3.5 text-sm font-medium text-night transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Mail className="size-4" aria-hidden />
                    {c.emailCta}
                  </a>
                  <div className="flex items-center gap-3">
                    <p className="min-w-0">
                      <span className="eyebrow block text-orchid">{c.emailLabel}</span>
                      <a href={`mailto:${email}`} className="font-display mt-1 block text-lg break-all hover:text-orchid sm:text-xl">
                        {email}
                      </a>
                    </p>
                    <CopyEmail email={email} />
                  </div>
                </div>
              )}

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-orchid">
                      <Mail className="size-4" aria-hidden />
                      {c.emailLabel}: {email}
                    </a>
                  </li>
                )}
                <li>
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-orchid">
                    <Linkedin className="size-4" aria-hidden />
                    LinkedIn
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only">{t.ui.newTab}</span>
                  </a>
                </li>
                <li>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-orchid">
                    <Github className="size-4" aria-hidden />
                    GitHub
                    <ArrowUpRight className="size-3.5" aria-hidden />
                    <span className="sr-only">{t.ui.newTab}</span>
                  </a>
                </li>
              </ul>

              {/* Hidden until /public/cv-vera-paukrtova.pdf exists */}
              <CvButton className="mt-6 border-night-foreground/30 px-6 py-3.5 text-night-foreground hover:bg-night-foreground hover:text-night" />
            </Reveal>

            {email && (
              <Reveal delay={200} className="lg:col-span-6 lg:col-start-7">
                <MailtoForm email={email} />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
