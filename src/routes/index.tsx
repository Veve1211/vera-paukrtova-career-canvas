import { createFileRoute } from "@tanstack/react-router";

import { Approach } from "@/components/site/Approach";
import { Contact } from "@/components/site/Contact";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { content, links, siteUrl } from "@/content/site";
import { LanguageProvider, useI18n } from "@/lib/i18n";

const meta = content.cs.meta;
const pageUrl = `${siteUrl}/`;
const ogImage = `${siteUrl}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: pageUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Věra Paukrtová — AI-assisted Web Developer | QA & Customer Experience" },
      { property: "og:locale", content: "cs_CZ" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "profile:first_name", content: "Věra" },
      { property: "profile:last_name", content: "Paukrtová" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.title },
      { name: "twitter:description", content: meta.description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Věra Paukrtová",
          url: pageUrl,
          image: ogImage,
          jobTitle: "AI-assisted Web Developer | QA & Customer Experience",
          sameAs: [links.linkedin],
          knowsAbout: ["AI-assisted web development", "QA", "UAT testing", "Customer experience"],
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
        <Projects />
        <Approach />
        <Experience />
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
