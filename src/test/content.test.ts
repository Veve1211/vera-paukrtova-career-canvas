import { describe, expect, it } from "vitest";

import { content, links } from "@/content/site";

/** Czech texts use non-breaking spaces after one-letter words; compare them as plain spaces. */
const plain = (text: string) => text.replace(/\u00a0/g, " ");

describe("site content", () => {
  it("links to Věra's real LinkedIn profile", () => {
    expect(links.linkedin).toBe("https://www.linkedin.com/in/vera-paukrtova/");
  });

  it("links the live projects to their real addresses", () => {
    const urls = Object.fromEntries(content.projects.items.map((p) => [p.id, p.url]));
    expect(urls).toEqual({
      cvecko: "https://cvecko.cz",
      "cesky-kral": "https://cesky-kral.up.railway.app",
      kompleto: null,
      paukrt: "https://paukrt.lovable.app/",
    });
  });

  it("does not show a made-up e-mail before the real one is added", () => {
    expect(links.email === null || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(links.email)).toBe(true);
  });

  it("gives every live project one checkable result", () => {
    for (const p of content.projects.items.filter((p) => p.status === "live")) {
      expect(p.result, p.id).toMatch(/\d/);
    }
  });

  it("sums up the projects in the hero", () => {
    expect(plain(content.hero.proofProjects)).toBe("2 živé aplikace · 1 web · 1 připravuji");
  });
});

describe("work experience", () => {
  it("shows Věra's real roles and dates, newest first", () => {
    const rows = content.experience.items.map((e) => [e.company, plain(e.role), e.period]);
    expect(rows).toEqual([
      ["Allegro Group", "Specialistka podpory marketplace", "11/2025 – současnost"],
      ["Ipsos", "Koordinátorka", "3/2025 – 11/2025"],
      ["Sigma AI", "Přepisovatelka", "1/2024 – 12/2024"],
      ["Zentiva", "Digitální HR podpora a webmasterka", "1/2022 – 12/2022"],
      ["T-Mobile", "UAT testerka", "2/2021 – 12/2021"],
      ["Megatech Industries", "QA inženýrka", "1/2017 – 9/2020"],
    ]);
  });

  it("marks only Allegro Group as the current job", () => {
    expect(content.experience.items.filter((e) => e.current).map((e) => e.company)).toEqual([
      "Allegro Group",
    ]);
  });
});

describe("portfolio positioning", () => {
  it("uses the agreed professional title and headline", () => {
    expect(plain(content.hero.role)).toBe(
      "Weby a aplikace s pomocí AI | QA a zákaznická zkušenost",
    );
    expect(plain(content.hero.title.join(" "))).toBe(
      "Tvořím weby a aplikace s pomocí AI, které dávají smysl lidem.",
    );
    expect(content.hero.highlights.map(plain)).toEqual([
      "Tvorba webů",
      "Aplikace s pomocí AI",
      "Testování a QA",
      "Zákaznická zkušenost",
    ]);
  });

  it("puts projects right after the intro, before the work history", () => {
    const ids = content.nav.map((n) => n.id);
    expect(ids[0]).toBe("projekty");
    expect(ids.indexOf("projekty")).toBeLessThan(ids.indexOf("zkusenosti"));
  });

  it("marks Kompleto as a concept without a live link", () => {
    const kompleto = content.projects.items.find((p) => p.id === "kompleto");
    expect(kompleto?.status).toBe("concept");
    expect(kompleto?.url).toBeNull();
  });

  it("gives the Allegro, T-Mobile, Megatech and Zentiva roles the larger layout", () => {
    const featured = content.experience.items.filter((e) => e.featured).map((e) => e.company);
    expect(featured).toEqual(["Allegro Group", "Zentiva", "T-Mobile", "Megatech Industries"]);
  });

  it("uses the requested contact heading", () => {
    expect(content.contact.title.join(" ")).toBe("Máte nápad na web nebo digitální aplikaci?");
  });

  it("never presents Věra as a senior developer in her title or headline", () => {
    const c = content;
    const headline = [c.meta.title, c.meta.description, c.hero.role, ...c.hero.title]
      .join(" ")
      .toLowerCase();
    expect(headline).not.toContain("senior");
  });
});
