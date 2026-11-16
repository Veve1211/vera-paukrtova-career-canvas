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

  it("does not show a made-up e-mail before the real one is added", () => {
    expect(links.email === null || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(links.email)).toBe(true);
  });

  it("has a complete English version for every Czech section", () => {
    const { cs, en } = content;
    expect(en.projects.items.map((p) => p.id)).toEqual(cs.projects.items.map((p) => p.id));
    expect(en.experience.items.map((e) => e.company)).toEqual(cs.experience.items.map((e) => e.company));
    expect(en.skills.groups).toHaveLength(cs.skills.groups.length);
    expect(en.education.items).toHaveLength(cs.education.items.length);
    expect(en.nav.map((n) => n.id)).toEqual(cs.nav.map((n) => n.id));
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
