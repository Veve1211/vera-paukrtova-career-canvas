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
