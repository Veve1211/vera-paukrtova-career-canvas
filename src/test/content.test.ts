import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { content, links, type Project } from "@/content/site";

/** Czech texts use non-breaking spaces after one-letter words; compare them as plain spaces. */
const plain = (text: string) => text.replace(/\u00a0/g, " ");

describe("site content", () => {
  it("links to Věra's real LinkedIn profile", () => {
    expect(links.linkedin).toBe("https://www.linkedin.com/in/vera-paukrtova/");
  });

  it("links the projects to their real addresses", () => {
    const urls = Object.fromEntries(content.projects.items.map((p) => [p.id, p.url]));
    expect(urls).toEqual({
      cvecko: "https://cvecko.cz",
      "cesky-kral": "https://cesky-kral.up.railway.app",
      kompleto: "https://kompleto.vercel.app/",
      "ciste-recenze": "https://verim-recenze-v-klidu.vercel.app/",
      paukrt: "https://paukrt.lovable.app/",
    });
  });

  it("links every project to its public code on GitHub", () => {
    for (const p of content.projects.items) {
      expect(p.github, p.id).toMatch(/^https:\/\/github\.com\/Veve1211\//);
    }
  });

  it("does not show a made-up e-mail before the real one is added", () => {
    expect(links.email === null || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(links.email)).toBe(true);
  });

  it("gives every live project one checkable result", () => {
    for (const p of content.projects.items.filter((p) => p.status === "live")) {
      expect(p.result, p.id).toMatch(/\d/);
    }
  });

  it("groups projects under Věra's two missions", () => {
    const missions = Object.fromEntries(
      (content.projects.items as readonly Project[])
        .filter((p) => p.mission)
        .map((p) => [p.id, p.mission]),
    );
    expect(missions).toEqual({ cvecko: "jobs", kompleto: "jobs", "cesky-kral": "education" });
  });

  it("names real tools instead of a generic AI tag", () => {
    for (const p of content.projects.items) {
      expect(
        p.tech.map((t) => plain(t).toLowerCase()),
        p.id,
      ).not.toContain("vývoj s pomocí ai");
    }
  });

  it("links the CV to a PDF that exists in public/", () => {
    if (!links.cvPdf) return;
    expect(links.cvPdf).toMatch(/^\/[\w.-]+\.pdf$/);
    expect(existsSync(join(process.cwd(), "public", links.cvPdf))).toBe(true);
  });

  it("keeps result texts free of test counts and dates that go stale", () => {
    for (const p of content.projects.items as readonly Project[]) {
      const text = plain(p.result ?? "");
      expect(text, p.id).not.toMatch(/\bstav \d/);
      expect(text, p.id).not.toMatch(/\d+ (jednotkových )?testů/);
    }
  });

  it("starts every list item with a capital letter", () => {
    const lists = [
      ...content.approach.pillars.map((p) => p.items),
      ...content.experience.items.map((e) => e.tags),
      content.hero.highlights,
      content.contact.areas,
      content.approach.tools,
    ];
    for (const item of lists.flat()) expect(item, item).toMatch(/^[\p{Lu}\d]/u);
  });

  it("sums up the projects in the hero", () => {
    expect(plain(content.hero.proofProjects)).toBe("2 živé aplikace · 1 web · 2 prototypy");
  });
});

describe("work experience", () => {
  it("shows Věra's real roles and dates, newest first", () => {
    const rows = content.experience.items.map((e) => [e.company, plain(e.role), e.period]);
    expect(rows).toEqual([
      ["Allegro Group", "Specialista podpory marketplace", "11/2025 – současnost"],
      ["Ipsos", "Koordinátor", "3/2025 – 11/2025"],
      ["Sigma AI", "Transkriptor", "1/2024 – 12/2024"],
      ["Zentiva", "Digitální HR podpora a webmaster", "1/2022 – 12/2022"],
      ["T-Mobile", "UAT tester", "2/2021 – 12/2021"],
      ["Megatech Industries", "QA inženýr", "1/2017 – 9/2020"],
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
      "Tvořím weby a aplikace s pomocí AI a sama je testuji.",
    );
    expect(plain(content.hero.offer)).toBe(
      "Aplikace dotáhnu od nápadu až do provozu: navrhnu, co mají dělat, vedu AI při vývoji, otestuji je a nasadím.",
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

  it("marks Kompleto and Čisté recenze as prototypes on sample data, with a link", () => {
    for (const id of ["kompleto", "ciste-recenze"]) {
      const project = content.projects.items.find((p) => p.id === id);
      expect(project?.status, id).toBe("prototype");
      expect(project?.url, id).toMatch(/^https:\/\/.+\.vercel\.app\/$/);
      expect(project?.summary, id).toContain("ukázkových datech");
    }
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
    const headline = [c.meta.title, c.meta.description, c.hero.role, ...c.hero.title, c.hero.offer]
      .join(" ")
      .toLowerCase();
    expect(headline).not.toContain("senior");
  });
});

describe("project order", () => {
  it("lists finished projects first, prototypes after them", () => {
    const statuses = content.projects.items.map((p) => p.status);
    expect(statuses).toEqual(
      [...statuses].sort((a, b) => Number(a !== "live") - Number(b !== "live")),
    );
    expect(content.projects.items.map((p) => p.id)).toEqual([
      "cvecko",
      "cesky-kral",
      "paukrt",
      "kompleto",
      "ciste-recenze",
    ]);
  });
});
