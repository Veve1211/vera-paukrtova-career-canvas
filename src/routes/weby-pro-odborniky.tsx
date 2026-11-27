import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import paukrtShot from "@/assets/project-paukrt.webp";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { content, expertWebsitesPath, links, siteUrl } from "@/content/site";

const copy = content.expertWebsites;
const pageUrl = `${siteUrl}${expertWebsitesPath}`;
const caseStudy = content.projects.items.find((project) => project.id === "paukrt");

export const Route = createFileRoute("/weby-pro-odborniky")({
  head: () => ({
    meta: [
      { title: copy.title },
      { name: "description", content: copy.description },
      { property: "og:title", content: copy.title },
      { property: "og:description", content: copy.description },
      { property: "og:url", content: pageUrl },
      { property: "og:locale", content: "cs_CZ" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
  }),
  component: ExpertWebsites,
});

function ExpertWebsites() {
  return (
    <>
      <header id="top" className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <a
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {copy.back}
        </a>
      </header>
      <main>
        <section className="bg-aura">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="font-display text-xl text-primary">{content.hero.name}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-balance sm:text-7xl">
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{copy.description}</p>
            <a
              href="#poptavka"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {copy.contactLink}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="font-display text-3xl sm:text-5xl">{copy.offerHeading}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.offer.map((item) => (
              <div key={item.title} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-14 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl text-balance sm:text-5xl">{copy.caseHeading}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{copy.caseText}</p>
            {caseStudy?.url && (
              <a
                href={caseStudy.url}
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-primary underline underline-offset-4"
              >
                {copy.caseLink}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            )}
          </div>
          <img
            src={paukrtShot}
            alt={`${copy.caseHeading} – ${content.ui.desktopView}`}
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-2xl border border-border shadow-soft"
          />
        </section>
        <section
          id="poptavka"
          className="mx-3 rounded-[2rem] bg-night px-5 py-14 text-night-foreground sm:mx-5 sm:px-8 sm:py-20"
        >
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl">{copy.contactHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed">{copy.contactIntro}</p>
              {links.email && <p className="mt-4 text-sm break-all">{links.email}</p>}
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
