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
    });
  });

  it("uses Věra's real e-mail and GitHub", () => {
    expect(links.email).toBe("paukrtovavera@seznam.cz");
    expect(links.github).toBe("https://github.com/Veve1211");
  });

  it("has a complete English version for every Czech section", () => {
    const { cs, en } = content;
    expect(en.projects.items.map((p) => p.id)).toEqual(cs.projects.items.map((p) => p.id));
    expect(en.experience.items.map((e) => e.company)).toEqual(
      cs.experience.items.map((e) => e.company),
    );
    expect(en.approach.pillars.map((p) => p.index)).toEqual(
      cs.approach.pillars.map((p) => p.index),
    );
    expect(en.experience.items.map((e) => e.featured)).toEqual(
      cs.experience.items.map((e) => e.featured),
    );
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
      ["Ipsos", "Coordinator", "2025"],
      ["Sigma AI", "Transcriptor", "2024"],
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
    expect(content.cs.experience.items.filter((e) => e.current).map((e) => e.company)).toEqual([
      "Allegro Group",
    ]);
  });
});

describe("portfolio positioning", () => {
  it("uses the agreed professional title and headline", () => {
    expect(content.cs.hero.role).toBe("Vibecoder | AI aplikace s QA přesahem");
    expect(content.cs.hero.title.join(" ")).toBe(
      "Stavím weby a aplikace s AI – a pořádně je otestuju.",
    );
    expect(content.cs.hero.proofCompanies).toEqual([
      "Allegro Group",
      "T-Mobile",
      "Zentiva",
      "Megatech Industries",
    ]);
    expect(content.cs.hero.highlights).toEqual([
      "Web Development",
      "AI-assisted Applications",
      "QA Testing",
      "Customer Experience",
    ]);
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

  it("mentions Kompleto only as an upcoming line, not as a project card", () => {
    for (const lang of ["cs", "en"] as const) {
      const p = content[lang].projects;
      expect(p.items.map((i) => i.id)).toEqual(["cvecko", "cesky-kral"]);
      expect(p.upcoming.text).toContain("Kompleto");
    }
    expect(content.cs.projects.upcoming.label).toBe("Co chystám:");
  });

  it("keeps unknown numbers as visible [DOPLNIT] placeholders instead of inventing them", () => {
    for (const lang of ["cs", "en"] as const) {
      const c = content[lang];
      const results = c.projects.items.filter((p) => p.status === "live").map((p) => p.results);
      for (const r of results) expect(r).toContain("[DOPLNIT");
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
      const headline = [c.meta.title, c.meta.description, c.hero.role, ...c.hero.title]
        .join(" ")
        .toLowerCase();
      expect(headline).not.toContain("senior");
    }
  });
});

describe("portfolio texts (11/2026)", () => {
  const cs = content.cs;

  it("uses the new professional title", () => {
    expect(cs.hero.role).toBe("Vibecoder | AI aplikace s QA přesahem");
    expect(content.en.hero.role).toBe("Vibecoder | AI apps with a QA edge");
  });

  it("writes Cvéčko consistently everywhere", () => {
    const all = JSON.stringify(content);
    expect(all).not.toMatch(/CVéčko/);
    expect(cs.projects.items.find((p) => p.id === "cvecko")?.name).toBe("Cvéčko");
  });

  it("describes Cvéčko's concrete features", () => {
    const summary = cs.projects.items.find((p) => p.id === "cvecko")?.summary ?? "";
    for (const part of [
      "PDF/DOCX",
      "označí žlutě",
      "8 šablon",
      "7 barev",
      "motivační dopis",
      "anglická verze",
      "neukládá na server",
    ]) {
      expect(summary).toContain(part);
    }
  });

  it("starts Český král with the first-app sentence and lists Playwright tests", () => {
    const kral = cs.projects.items.find((p) => p.id === "cesky-kral")!;
    expect(
      kral.summary.startsWith("Moje první aplikace – od nápadu po živou verzi za 4 dny."),
    ).toBe(true);
    expect(kral.tech).toEqual(
      expect.arrayContaining([
        "Next.js",
        "Railway",
        "Playwright",
        "Automatické testy v Playwrightu",
      ]),
    );
  });

  it("states the Allegro NPS result without placeholders", () => {
    const allegro = cs.experience.items[0]!;
    expect(allegro.summary).toContain("100% NPS tři měsíce po sobě v zákaznické podpoře Allegro");
    expect(allegro.summary).not.toContain("[DOPLNIT");
  });

  it("shortens Ipsos and Sigma AI to role + company + year", () => {
    for (const lang of ["cs", "en"] as const) {
      for (const company of ["Ipsos", "Sigma AI"]) {
        const job = content[lang].experience.items.find((e) => e.company === company)!;
        expect(job.period).toMatch(/^\d{4}$/);
        expect(job.summary).toBe("");
        expect(job.transfer).toBe("");
        expect(job.tags).toEqual([]);
      }
    }
  });

  it("has no placeholder links", () => {
    const urls = [
      links.linkedin,
      links.github,
      ...cs.projects.items.flatMap((p) => [p.url, p.github]),
    ].filter(Boolean);
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });
});
