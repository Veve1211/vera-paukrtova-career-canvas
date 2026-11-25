import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { content, links } from "../src/content/site";

test.beforeEach(async ({ page }) => {
  // Wait for hydration: the menu button only works once React has taken over the page.
  await page.goto("/", { waitUntil: "networkidle" });
});

test("the page loads with the name and every section", async ({ page }) => {
  await expect(page).toHaveTitle(content.meta.title);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const { id } of content.nav) await expect(page.locator(`#${id}`)).toBeAttached();
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

test("the traffic engineer's card plays the site video once in view", async ({ page }) => {
  const project = content.projects.items.find((p) => p.id === "paukrt")!;
  const video = page
    .getByRole("article", { name: project.name })
    .locator("video:not(dialog video)");
  await expect(video).toHaveAttribute("src", "/paukrt-ukazka-webu.mp4");
  await expect(video).toHaveAttribute("poster", /.+/);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("the site video stays still on its poster", async ({ page }) => {
    const project = content.projects.items.find((p) => p.id === "paukrt")!;
    const video = page
      .getByRole("article", { name: project.name })
      .locator("video:not(dialog video)");
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });
});
