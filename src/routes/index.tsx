import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { FocusBand } from "@/components/site/FocusBand";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { content, links } from "@/content/site";
import { LanguageProvider, useI18n } from "@/lib/i18n";

const meta = content.cs.meta;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "profile" },
      { property: "og:locale", content: "cs_CZ" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "profile:first_name", content: "Věra" },
      { property: "profile:last_name", content: "Paukrtová" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.title },
      { name: "twitter:description", content: meta.description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Věra Paukrtová",
          jobTitle: "Customer Operations & QA Specialist",
          sameAs: [links.linkedin],
          knowsAbout: ["QA", "UAT testing", "AI-assisted web development", "Customer operations"],
        }),
      },
    ],
  }),
  component: Index,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <a
        href="#obsah"
        className="sr-only z-[60] rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.skipLink}
      </a>
      <Header />
      <main id="obsah">
        <Hero />
        <FocusBand />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Index() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
