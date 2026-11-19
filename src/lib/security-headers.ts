const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

// Only on the production domain: the Lovable editor shows previews inside an iframe.
const NO_FRAMING_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
};

/** Adds security headers to a response; framing is blocked only on the production domain. */
export function withSecurityHeaders(request: Request, response: Response): Response {
  const secured = new Response(response.body, response);
  const host = new URL(request.url).hostname;
  const headers =
    host === "verapaukrtova.cz" || host.endsWith(".verapaukrtova.cz")
      ? { ...SECURITY_HEADERS, ...NO_FRAMING_HEADERS }
      : SECURITY_HEADERS;
  for (const [name, value] of Object.entries(headers)) {
    if (!secured.headers.has(name)) secured.headers.set(name, value);
  }
  return secured;
}
