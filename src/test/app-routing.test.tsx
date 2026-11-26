import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { cvPagePath } from "@/content/site";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the /cv download page that the CV button links to", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(cvPagePath).at(-1)?.routeId).toBe("/cv");
  });
});

describe("canonical host", () => {
  it.each(["/", "/?utm_source=share", "/cv?from=portfolio"])(
    "permanently redirects www%s to the canonical host",
    async (path) => {
      const { default: server } = await import("@/server");
      const response = await server.fetch(
        new Request(`https://www.verapaukrtova.cz${path}`),
        undefined,
        undefined,
      );
      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe(`https://verapaukrtova.cz${path}`);
    },
  );
});
