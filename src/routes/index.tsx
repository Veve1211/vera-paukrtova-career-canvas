import { createFileRoute } from "@tanstack/react-router";

import { Approach } from "@/components/site/Approach";
import { Contact } from "@/components/site/Contact";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Quality } from "@/components/site/Quality";
import { content, links, siteUrl } from "@/content/site";

const meta = content.meta;
const pageUrl = `${siteUrl}/`;
// Bump the file name whenever the image changes: LinkedIn caches previews by image URL.
const ogImage = `${siteUrl}/og-image-v2.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { name: "seznam-wmt", content: "xnQEye5IrXvqlbcfH7ZkiZAagmcaBgAd" },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: "Věra Paukrtová" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:url", content: pageUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "627" },
      {
        property: "og:image:alt",
        content: "Věra Paukrtová – weby a aplikace s pomocí AI, QA a zákaznická zkušenost",
      },
      { property: "og:locale", content: "cs_CZ" },
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
          "@graph": [
            {
              "@type": "Person",
              "@id": `${pageUrl}#person`,
              name: "Věra Paukrtová",
              // Searchers often type the name without diacritics.
              alternateName: "Vera Paukrtova",
              url: pageUrl,
              image: `${siteUrl}/portrait.jpg`,
              jobTitle: content.hero.role,
              description: meta.description,
              inLanguage: "cs",
              sameAs: [links.linkedin, "https://github.com/Veve1211"],
              knowsAbout: meta.knowsAbout,
            },
            {
              "@type": "WebSite",
              "@id": `${pageUrl}#website`,
              url: pageUrl,
              name: "Věra Paukrtová",
              inLanguage: "cs",
              publisher: { "@id": `${pageUrl}#person` },
            },
            {
              "@type": "ProfilePage",
              url: pageUrl,
              name: meta.title,
              inLanguage: "cs",
              isPartOf: { "@id": `${pageUrl}#website` },
              mainEntity: { "@id": `${pageUrl}#person` },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#obsah"
        className="sr-only z-[60] rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {content.skipLink}
      </a>
      <Header />
      <main id="obsah">
        <Hero />
        <Projects />
        <Approach />
        <Experience />
        <Education />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
