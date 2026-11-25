import { describe, expect, it } from "vitest";

import {
  allPageSpeedScores,
  formatCs,
  measuredAt,
  pageSpeedAverage,
  projectsQuality,
  securityHeadersRange,
} from "@/content/quality";
import { content } from "@/content/site";

const plain = (text: string) => text.replace(/\u00a0/g, " ");

describe("technical quality results", () => {
  it("states when the lab measurements were taken", () => {
    expect(measuredAt).toMatch(/^\d{4}-\d{2}$/);
    expect(plain(content.quality.footnote)).toContain("laboratorních měření");
  });

  it("averages all 32 PageSpeed scores to 99.19", () => {
    expect(allPageSpeedScores()).toHaveLength(32);
    expect(pageSpeedAverage()).toBe(99.19);
    expect(formatCs(pageSpeedAverage(), 2)).toBe("99,19");
  });

  it("keeps every score in its valid range", () => {
    for (const p of projectsQuality) {
      for (const s of allPageSpeedScores([p])) expect(s, p.id).toBeGreaterThanOrEqual(0);
      for (const s of allPageSpeedScores([p])) expect(s, p.id).toBeLessThanOrEqual(100);
      expect(p.gtmetrix.performance, p.id).toBeLessThanOrEqual(100);
      expect(p.gtmetrix.structure, p.id).toBeLessThanOrEqual(100);
      if (p.waveAim !== null) expect(p.waveAim, p.id).toBeLessThanOrEqual(10);
    }
  });

  it("shows the measured performance per project and device", () => {
    const perf = Object.fromEntries(
      projectsQuality.map((p) => [
        p.id,
        [p.pageSpeed.mobile.performance, p.pageSpeed.desktop.performance],
      ]),
    );
    expect(perf).toEqual({
      portfolio: [86, 99],
      paukrt: [99, 98],
      cvecko: [94, 100],
      "cesky-kral": [98, 100],
    });
  });

  it("summarises Security Headers grades as A / A+", () => {
    expect(securityHeadersRange()).toBe("A / A+");
  });

  it("links every project to a live HTTPS site and its public GitHub", () => {
    for (const p of projectsQuality) {
      expect(p.url, p.id).toMatch(/^https:\/\//);
      expect(p.github, p.id).toMatch(/^https:\/\/github\.com\/Veve1211\//);
      expect(p.practices.length, p.id).toBeGreaterThan(0);
    }
  });

  it("uses the same live addresses as the project list", () => {
    for (const p of projectsQuality) {
      const listed = content.projects.items.find((item) => item.id === p.id);
      if (listed) expect(p.url, p.id).toBe(listed.url);
    }
  });

  it("never presents lab scores as search ranking or grades as a full audit", () => {
    const notes = content.quality.notes.map((n) => plain(`${n.title} ${n.text}`)).join(" ");
    expect(notes).toContain("není pozice ve vyhledávání");
    expect(notes).toContain("není audit");
    expect(notes).toContain("ne data návštěvníků");
  });
});
