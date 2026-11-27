import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { content, cvPagePath, expertWebsitesPath, links, siteUrl } from "../src/content/site";

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

test("the projects button fits the first screen on every device", async ({ page }) => {
  const button = page.locator("#top").getByRole("link", { name: content.hero.ctaProjects });
  const box = (await button.boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()!.height);
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
  if (page.viewportSize()!.width < 600) {
    await page.setViewportSize({ width: 320, height: 900 });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth))
      .toBe(0);
  }
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

test("the contact form sends in the browser and preserves the message after a failure", async ({
  page,
}) => {
  const contact = page.locator("#kontakt");
  const copy = content.contactForm;
  const email = "visitor@example.com";
  const message = "Mám zájem o vlastní web.";
  let attempts = 0;

  await page.route(`https://formsubmit.co/ajax/${links.email}`, async (route) => {
    expect(route.request().postDataJSON()).toMatchObject({ email, message });
    attempts += 1;
    await route.fulfill({ json: { success: attempts > 1 ? "true" : "false" } });
  });

  await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(contact.locator(`a[href="${links.linkedin}"]`)).toBeVisible();
  await contact.getByLabel(copy.email).fill(email);
  await contact.getByLabel(copy.message).fill(message);
  await contact.getByRole("button", { name: copy.submit }).click();
  await expect(contact.getByRole("status")).toHaveText(copy.error);
  await expect(contact.getByLabel(copy.message)).toHaveValue(message);
  await contact.getByRole("button", { name: copy.submit }).click();
  await expect(contact.getByRole("status")).toHaveText(copy.success);
  await expect(contact.getByLabel(copy.message)).toHaveValue("");
});

test("the service page is linked, indexable and has its own enquiry form", async ({ page }) => {
  const copy = content.expertWebsites;
  await page.locator("#top").getByRole("link", { name: copy.linkLabel }).click();
  await expect(page).toHaveURL(new RegExp(`${expertWebsitesPath}$`));
  await expect(page).toHaveTitle(copy.title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}${expertWebsitesPath}`,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.heading);
  await page.getByRole("link", { name: copy.contactLink }).click();
  await expect(page.locator("#poptavka").getByLabel(content.contactForm.email)).toBeVisible();
  const sitemap = await page.request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`${siteUrl}${expertWebsitesPath}`);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
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
  const card = page.locator("#projekty").getByRole("article", { name: project.name });
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
    const card = page.locator("#projekty").getByRole("article", { name: project.name });
    const video = card.locator("video:not(dialog video)");
    await expect(video).toHaveAttribute("src", src);
    await expect(video.locator("+ img")).toHaveAttribute("loading", "lazy");
    await video.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);

    await card.getByRole("button", { name: content.ui.playVideo }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
    await expect(video.locator("+ img")).toHaveCount(0);
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

test("search engine verification tags are in the server-rendered head", async ({ request }) => {
  // Google reads the raw HTML without running JavaScript, so check the source, not the DOM.
  const html = await (await request.get("/")).text();
  const head = html.split("</head>")[0];
  expect(head).toContain('<meta name="seznam-wmt" content="xnQEye5IrXvqlbcfH7ZkiZAagmcaBgAd"');
  for (const token of [
    "Ctgx3MlIJJWdodU5RKD0QqkVdI_yZhYH0Ax9UxsskUY",
    "pG8AJgeqJ4lg7fjad5r0OpUpLkGvCx7khLQAfTJm6tA",
  ]) {
    expect(head).toContain(`<meta name="google-site-verification" content="${token}"`);
  }
});

test("the server advertises a crawlable favicon and social preview", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const head = html.split("</head>")[0];
  expect(head).toContain(`rel="canonical" href="${siteUrl}/"`);
  expect(head).toContain('property="og:image:width" content="1200"');
  expect(head).toContain('property="og:image:height" content="627"');
  const imageUrl = head.match(/property="og:image" content="([^"]+)"/)?.[1];
  expect(imageUrl).toBe(`${siteUrl}/og-image-v4.jpg`);
  expect(head).toContain(`name="twitter:image" content="${imageUrl}"`);
  const preview = await request.get(new URL(imageUrl!).pathname, {
    headers: { "user-agent": "facebookexternalhit/1.1" },
  });
  expect(preview.ok()).toBe(true);
  expect(preview.headers()["content-type"]).toContain("image/jpeg");

  for (const size of [48, 96]) {
    const path = `/favicon-${size}.png`;
    expect(head).toContain(`href="${path}"`);
    for (const bot of ["Googlebot-Image/1.0", "SeznamBot/4.0"]) {
      const icon = await request.get(path, { headers: { "user-agent": bot } });
      expect(icon.ok()).toBe(true);
      expect(icon.headers()["content-type"]).toContain("image/png");
      const png = await icon.body();
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([size, size]);
    }
  }
});

test("the quality section shows the lab results with their date", async ({ page }) => {
  const section = page.locator("#kvalita");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(section.getByText("99", { exact: true })).toBeVisible();
  await expect(section.locator('time[datetime="2026-11"]')).toBeVisible();
  // Per-project details stay folded until the visitor asks for them.
  await expect(section.getByRole("article").first()).toBeHidden();
  await section.getByText(content.quality.detailsToggle).click();
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
