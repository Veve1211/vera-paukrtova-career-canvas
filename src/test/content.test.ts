import { describe, expect, it } from "vitest";

import { content, links } from "@/content/site";

describe("site content", () => {
  it("links to Věra's real LinkedIn profile", () => {
    expect(links.linkedin).toBe("https://www.linkedin.com/in/vera-paukrtova/");
  });

  it("links the live projects to their real addresses", () => {
    const urls = Object.fromEntries(content.cs.projects.items.map((p) => [p.id, p.url]));
    expect(urls).toEqual({
      cvecko: "https://cvecko.cz",
      "cesky-kral": "https://cesky-kral.up.railway.app",
      kompleto: null,
    });
  });

  it("uses Věra's real e-mail and GitHub", () => {
    expect(links.email).toBe("paukrtovavera@seznam.cz");
    expect(links.github).toBe("https://github.com/Veve1211");
  });

  it("has a complete English version for every Czech section", () => {
    const { cs, en } = content;
    expect(en.projects.items.map((p) => p.id)).toEqual(cs.projects.items.map((p) => p.id));
    expect(en.experience.items.map((e) => e.company)).toEqual(cs.experience.items.map((e) => e.company));
    expect(en.approach.pillars.map((p) => p.index)).toEqual(cs.approach.pillars.map((p) => p.index));
    expect(en.experience.items.map((e) => e.featured)).toEqual(cs.experience.items.map((e) => e.featured));
    expect(en.education.items).toHaveLength(cs.education.items.length);
    expect(en.nav.map((n) => n.id)).toEqual(cs.nav.map((n) => n.id));
    expect(en.services.items.map((s) => s.icon)).toEqual(cs.services.items.map((s) => s.icon));
    expect(en.approach.tools).toHaveLength(cs.approach.tools.length);
  });
});

describe("work experience", () => {
  it("shows Věra's real roles and dates, newest first", () => {
    const rows = content.cs.experience.items.map((e) => [e.company, e.role, e.period]);
    expect(rows).toEqual([
      ["Allegro Group", "Marketplace Support Specialist", "11/2025 – současnost"],
      ["Ipsos", "Coordinator", "3/2025 – 11/2025"],
      ["Sigma AI", "Transcriptor", "1/2024 – 12/2024"],
      ["Zentiva", "Digital HR Support / Webmaster", "1/2022 – 12/2022"],
      ["T-Mobile", "UAT Tester", "2/2021 – 12/2021"],
      ["Megatech Industries", "QA Engineer", "1/2017 – 9/2020"],
    ]);
  });

  it("uses the same dates in English", () => {
    const cs = content.cs.experience.items.map((e) => e.period?.split(" – ")[0]);
    const en = content.en.experience.items.map((e) => e.period?.split(" – ")[0]);
    expect(en).toEqual(cs);
    expect(content.en.experience.items[0]?.period).toBe("11/2025 – present");
  });

  it("marks only Allegro Group as the current job", () => {
    expect(content.cs.experience.items.filter((e) => e.current).map((e) => e.company)).toEqual(["Allegro Group"]);
  });
});

describe("portfolio positioning", () => {
  it("uses the agreed professional title and headline", () => {
    expect(content.cs.hero.role).toBe("AI-assisted Web Developer | QA & Customer Experience");
    expect(content.cs.hero.title.join(" ")).toBe("Stavím weby a aplikace s AI – a pořádně je otestuju.");
    expect(content.cs.hero.proofCompanies).toEqual(["Allegro Group", "T-Mobile", "Zentiva", "Megatech Industries"]);
    expect(content.cs.hero.highlights).toEqual(["Web Development", "AI-assisted Applications", "QA Testing", "Customer Experience"]);
  });

  it("puts projects right after the intro, before the work history", () => {
    const ids = content.cs.nav.map((n) => n.id);
    expect(ids[0]).toBe("projekty");
    expect(ids.indexOf("projekty")).toBeLessThan(ids.indexOf("zkusenosti"));
  });

  it("puts the collaboration section between projects and approach", () => {
    const ids = content.cs.nav.map((n) => n.id);
    expect(ids.slice(0, 3)).toEqual(["projekty", "spoluprace", "pristup"]);
  });

  it("marks Kompleto as in development, last, without a live link", () => {
    for (const lang of ["cs", "en"] as const) {
      const items = content[lang].projects.items;
      const kompleto = items.at(-1);
      expect(kompleto?.id).toBe("kompleto");
      expect(kompleto?.status).toBe("concept");
      expect(kompleto?.url).toBeNull();
    }
    expect(content.cs.projects.items.at(-1)?.statusLabel).toBe("Ve vývoji");
  });

  it("keeps unknown numbers as visible [DOPLNIT] placeholders instead of inventing them", () => {
    for (const lang of ["cs", "en"] as const) {
      const c = content[lang];
      const results = c.projects.items.filter((p) => p.status === "live").map((p) => p.results);
      for (const r of results) expect(r).toContain("[DOPLNIT");
      expect(c.experience.items[0]?.summary).toContain("[DOPLNIT]");
    }
  });

  it("gives the Allegro, T-Mobile, Megatech and Zentiva roles the larger layout", () => {
    const featured = content.cs.experience.items.filter((e) => e.featured).map((e) => e.company);
    expect(featured).toEqual(["Allegro Group", "Zentiva", "T-Mobile", "Megatech Industries"]);
  });

  it("uses the requested contact heading", () => {
    expect(content.cs.contact.title.join(" ")).toBe("Pojďme společně vytvořit něco, co funguje.");
    expect(content.cs.contact.form.subject).toBe("Poptávka z webu");
  });

  it("never presents Věra as a senior developer in her title or headline", () => {
    for (const lang of ["cs", "en"] as const) {
      const c = content[lang];
      const headline = [c.meta.title, c.meta.description, c.hero.role, ...c.hero.title].join(" ").toLowerCase();
      expect(headline).not.toContain("senior");
    }
  });
});
