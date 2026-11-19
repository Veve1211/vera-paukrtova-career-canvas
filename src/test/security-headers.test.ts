import { describe, expect, it } from "vitest";

import { withSecurityHeaders } from "@/lib/security-headers";

const page = () => new Response("<p>ok</p>", { headers: { "content-type": "text/html" } });

describe("security headers", () => {
  it("adds the basic headers everywhere", () => {
    const res = withSecurityHeaders(new Request("https://preview.example.com/"), page());
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("X-Frame-Options")).toBeNull();
  });

  it("blocks framing on the production domain", () => {
    const res = withSecurityHeaders(new Request("https://verapaukrtova.cz/"), page());
    expect(res.headers.get("X-Frame-Options")).toBe("DENY");
    expect(res.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
  });

  it("keeps the status and body", async () => {
    const res = withSecurityHeaders(
      new Request("https://verapaukrtova.cz/x"),
      new Response("missing", { status: 404 }),
    );
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("missing");
  });
});
