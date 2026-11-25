import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { content, cvPagePath, links } from "../src/content/site";

test.beforeEach(async ({ page }) => {
  // Wait for hydration: the menu button only works once React has taken over the page.
  await page.goto("/", { waitUntil: "networkidle" });
});

test("the page loads with the name and every section", async ({ page }) => {
  await expect(page).toHaveTitle(content.meta.title);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const { id } of content.nav) await expect(page.locator(`#${id}`)).toBeAttached();
});

test("the hero says what Věra does, right under the headline", async ({ page }) => {
  const sentence = page.getByText(content.hero.offer);
  await expect(sentence).toBeVisible();
  const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
  const box = await sentence.boundingBox();
  expect(box!.y).toBeGreaterThan(h1!.y + h1!.height - 1);
});

test("the CV button leads to /cv, which downloads the real PDF", async ({ page, context }) => {
  test.skip(!links.cvPdf, "no CV yet");
  // Every CV button (header, mobile menu, contact) goes through /cv so each download is counted.
  const buttons = page.locator(`a[href="${cvPagePath}"]`);
  expect(await buttons.count()).toBeGreaterThan(0);
  await expect(page.locator(`a[href="${links.cvPdf}"]`)).toHaveCount(0);
  const contactButton = page.locator("#kontakt").getByRole("link", { name: content.ui.downloadCv });
  await expect(contactButton).toHaveAttribute("href", cvPagePath);
  await expect(contactButton).toHaveAttribute("target", "_blank");

  // The PDF itself is served.
  const pdf = await page.request.get(links.cvPdf!);
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");

  // Clicking opens /cv in a new tab, which starts the download on its own.
  const [cvTab] = await Promise.all([context.waitForEvent("page"), contactButton.click()]);
  const download = await cvTab.waitForEvent("download");
  expect(download.suggestedFilename()).toBe(links.cvPdf!.split("/").pop());
  await expect(cvTab).toHaveURL(new RegExp(`${cvPagePath}$`));
  await expect(cvTab.getByRole("heading", { level: 1 })).toHaveText(content.cvPage.heading);
  await expect(cvTab.getByRole("link", { name: content.cvPage.manualLink })).toHaveAttribute(
    "href",
    links.cvPdf!,
  );
  const results = await new AxeBuilder({ page: cvTab })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});

test("fonts come from this site, not from Google", async ({ page }) => {
  const hosts = new Set<string>();
  page.on("request", (r) => hosts.add(new URL(r.url()).host));
  await page.reload({ waitUntil: "networkidle" });
  expect([...hosts].filter((h) => /fonts\.(googleapis|gstatic)\.com/.test(h))).toEqual([]);
  const families = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
  });
  expect(families).toEqual(
    expect.arrayContaining(["DM Sans Variable", "Playfair Display Variable"]),
  );
});

test("no horizontal scrolling", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("navigation reaches every section", async ({ page }) => {
  const viewport = page.viewportSize()!;
  // The full nav shows from Tailwind's lg breakpoint (1024 px); below it there's a menu button.
  const menu = viewport.width < 1024;
  for (const { id, label } of content.nav) {
    if (menu) {
      await page.getByRole("button", { name: content.ui.menuOpen }).click();
      await page.locator("#mobile-menu").getByRole("link", { name: label }).click();
      await expect(page.locator("#mobile-menu")).toBeHidden();
    } else {
      await page
        .getByRole("navigation", { name: content.ui.mainNav })
        .getByRole("link", { name: label })
        .click();
    }
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("the menu closes with Escape", async ({ page }) => {
  test.skip(page.viewportSize()!.width >= 1024, "no menu on wide screens");
  await page.getByRole("button", { name: content.ui.menuOpen }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("contact links point to the real e-mail and LinkedIn", async ({ page }) => {
  const contact = page.locator("#kontakt");
  if (links.email) await expect(contact.locator(`a[href="mailto:${links.email}"]`)).toBeVisible();
  await expect(contact.locator(`a[href="${links.linkedin}"]`)).toBeVisible();
});

test("the forbidden Lovable preview link is nowhere on the page", async ({ page }) => {
  await expect(page.locator('a[href*="vera-paukrtova-career-canvas.lovable.app"]')).toHaveCount(0);
});

test("no accessibility violations (WCAG 2.1 AA)", async ({ page }) => {
  // Sections fade in on scroll; scroll through so axe sees them at full opacity.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});

test("no errors in the console", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.reload();
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("a project card opens its detail with the link, Escape closes it", async ({ page }) => {
  const project = content.projects.items.find((p) => p.id === "cesky-kral")!;
  const card = page.getByRole("article", { name: project.name });
  // The list shows only the summary; the link to the app lives in the detail.
  await expect(card.getByRole("link", { name: new RegExp(project.urlLabel!) })).toBeHidden();
  await card.getByRole("button", { name: /Více o\s+projektu/ }).click();
  const dialog = page.getByRole("dialog", { name: project.name });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: new RegExp(project.urlLabel!) })).toHaveAttribute(
    "href",
    project.url!,
  );
  const results = await new AxeBuilder({ page })
    .include("dialog[open]")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

for (const project of content.projects.items.filter((p) => "video" in p)) {
  test(`${project.name}: the video plays only after pressing play`, async ({ page }) => {
    const { src } = (project as { video: { src: string } }).video;
    const card = page.getByRole("article", { name: project.name });
    const video = card.locator("video:not(dialog video)");
    await expect(video).toHaveAttribute("src", src);
    await expect(video).toHaveAttribute("poster", /.+/);
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);

    await card.getByRole("button", { name: content.ui.playVideo }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
    // The play button must not open the project detail behind it.
    await expect(page.getByRole("dialog")).toBeHidden();

    // Pausing sticks: scrolling away and back doesn't restart it.
    await card.getByRole("button", { name: content.ui.pauseVideo }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });
}

test("the Google Search Console verification tags are in the server-rendered HTML", async ({
  request,
}) => {
  // Google reads the raw HTML without running JavaScript, so check the source, not the DOM.
  const html = await (await request.get("/")).text();
  for (const token of [
    "Ctgx3MlIJJWdodU5RKD0QqkVdI_yZhYH0Ax9UxsskUY",
    "pG8AJgeqJ4lg7fjad5r0OpUpLkGvCx7khLQAfTJm6tA",
  ]) {
    expect(html).toContain(`<meta name="google-site-verification" content="${token}"`);
  }
});

test("the quality section shows the lab results with their date", async ({ page }) => {
  const section = page.locator("#kvalita");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(section.getByText("99,19", { exact: true })).toBeVisible();
  await expect(section.locator('time[datetime="2026-11"]')).toBeVisible();
  for (const name of ["Toto portfolio", "Web inženýra", "Cvéčko", "Český král"]) {
    const card = section.getByRole("article", { name });
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /Živý web/ })).toHaveAttribute("target", "_blank");
    await expect(card.getByRole("link", { name: /Kód na GitHubu/ })).toHaveAttribute(
      "href",
      /^https:\/\/github\.com\/Veve1211\//,
    );
  }
});
