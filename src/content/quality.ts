/**
 * Measured technical results of Věra's projects. Update the numbers here only; the
 * "Technická kvalita" section renders this file and computes the summary itself.
 *
 * All values are lab measurements (one test run on a test device), never real-user data.
 * When you re-measure, change `measuredAt` / `measuredLabel` and every number at once.
 */

export const measuredAt = "2026-11";
/** Genitive, as used in the footnote: "Výsledky … z listopadu 2026". */
export const measuredLabel = "listopadu 2026";

/** PageSpeed Insights (Lighthouse) scores 0–100 for one device. */
export type PageSpeedScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

/** A security grade as the tool reports it (A+, A, B …). */
export type Grade = "A+" | "A" | "B" | "C" | "D" | "E" | "F";

export type ProjectQuality = {
  id: "portfolio" | "paukrt" | "cvecko" | "cesky-kral";
  name: string;
  kind: string;
  url: string;
  /** Public repository; null when the code is not public. */
  github: string | null;
  pageSpeed: { mobile: PageSpeedScores; desktop: PageSpeedScores };
  gtmetrix: { performance: number; structure: number };
  securityHeaders: Grade;
  sslLabs: Grade;
  /** Clarifies a grade when it does not cover every server (e.g. only finished endpoints). */
  sslLabsNote?: string;
  /** WAVE AIM score 0–10; null when it was not measured. */
  waveAim: number | null;
  /** Only practices that really exist in the project's repository or live site. */
  practices: string[];
};

const full = { accessibility: 100, bestPractices: 100, seo: 100 };

export const projectsQuality: ProjectQuality[] = [
  {
    id: "portfolio",
    name: "Toto portfolio",
    kind: "verapaukrtova.cz",
    url: "https://verapaukrtova.cz/",
    github: "https://github.com/Veve1211/vera-paukrtova-web",
    pageSpeed: {
      mobile: { performance: 86, ...full },
      desktop: { performance: 99, ...full },
    },
    gtmetrix: { performance: 85, structure: 98 },
    securityHeaders: "A+",
    sslLabs: "A+",
    waveAim: null,
    practices: [
      "CI v GitHub Actions: audit závislostí, lint, typy, testy, build",
      "Playwright na mobilu, tabletu i počítači + kontrola axe",
      "Náhled každé změny na Vercelu, nasazení z větve main",
      "Strukturovaná data (JSON-LD), sitemap a robots.txt",
      "Vercel Web Analytics bez cookies",
    ],
  },
  {
    id: "paukrt",
    name: "Jirkův web",
    kind: "Profesní web dopravního inženýra",
    url: "https://paukrt.lovable.app/",
    github: "https://github.com/Veve1211/jiri-paukrt-web",
    pageSpeed: {
      mobile: { performance: 99, ...full },
      desktop: { performance: 98, ...full },
    },
    gtmetrix: { performance: 93, structure: 100 },
    securityHeaders: "A+",
    sslLabs: "A+",
    sslLabsNote: "na dokončených koncových bodech",
    waveAim: 9.5,
    practices: [
      "CI v GitHub Actions: lint, typy, testy, build",
      "Playwright na mobilu, tabletu i počítači + kontrola axe",
      "Testy bezpečnostních hlaviček a SEO",
      "Sitemap a robots.txt",
    ],
  },
  {
    id: "cvecko",
    name: "Cvéčko",
    kind: "Webová aplikace na tvorbu životopisů",
    url: "https://cvecko.cz",
    github: "https://github.com/Veve1211/cvecko",
    pageSpeed: {
      mobile: { performance: 94, ...full },
      desktop: { performance: 100, ...full },
    },
    gtmetrix: { performance: 91, structure: 96 },
    securityHeaders: "A",
    sslLabs: "A",
    waveAim: 9.2,
    practices: [
      "CI v GitHub Actions: lint, typy, testy, build, Playwright",
      "Denní automatická kontrola testovacího prostředí po nasazení",
      "Testy přístupnosti (axe) a Content-Security-Policy",
      "Strukturovaná data (JSON-LD), sitemap a robots.txt",
      "Analytika Umami bez cookies",
    ],
  },
  {
    id: "cesky-kral",
    name: "Český král",
    kind: "Vzdělávací webová hra",
    url: "https://cesky-kral.up.railway.app",
    github: "https://github.com/Veve1211/cesky-kral",
    pageSpeed: {
      mobile: { performance: 98, ...full },
      desktop: { performance: 100, ...full },
    },
    gtmetrix: { performance: 99, structure: 98 },
    securityHeaders: "A",
    sslLabs: "A",
    waveAim: 9.6,
    practices: [
      "CI v GitHub Actions u každého PR: lint, typy, testy, build",
      "Playwright na počítači i mobilu s testovací databází",
      "Testovací web (staging) a ostrý web, každý s vlastní databází",
      "Sitemap, robots.txt a bezpečnostní hlavičky",
    ],
  },
];

/** Every PageSpeed score of every project (4 categories × 2 devices each). */
export function allPageSpeedScores(items: ProjectQuality[] = projectsQuality): number[] {
  return items.flatMap((p) =>
    [p.pageSpeed.mobile, p.pageSpeed.desktop].flatMap((s) => [
      s.performance,
      s.accessibility,
      s.bestPractices,
      s.seo,
    ]),
  );
}

/** Average of all PageSpeed scores, rounded to two decimals. */
export function pageSpeedAverage(items: ProjectQuality[] = projectsQuality): number {
  const scores = allPageSpeedScores(items);
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;
}

/** Czech number format: decimal comma (99,19). */
export function formatCs(value: number, digits = 0): string {
  return value.toLocaleString("cs-CZ", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Distinct Security Headers grades from lowest to highest, e.g. "A / A+". */
export function securityHeadersRange(items: ProjectQuality[] = projectsQuality): string {
  const order: Grade[] = ["F", "E", "D", "C", "B", "A", "A+"];
  const grades = [...new Set(items.map((p) => p.securityHeaders))];
  grades.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return grades.join(" / ");
}
