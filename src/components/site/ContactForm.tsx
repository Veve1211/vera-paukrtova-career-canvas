import { useState, type FormEvent } from "react";

import { content, links } from "@/content/site";

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ContactForm() {
  const copy = content.contactForm;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const recipient = links.email;
  if (!recipient) return null;

  const endpoint = "https://formsubmit.co";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch(`${endpoint}/ajax/${recipient}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(15_000),
      });
      const result = (await response.json()) as { success?: boolean | string };
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      action={`${endpoint}/${recipient}`}
      method="post"
      onSubmit={submit}
      aria-busy={status === "sending"}
      className="grid max-w-xl gap-4 rounded-2xl border border-border bg-card p-5 text-foreground sm:p-6"
    >
      <input type="hidden" name="_subject" value={copy.subject} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" autoComplete="off" tabIndex={-1} hidden />

      <label className="grid gap-1.5 text-sm font-medium">
        {copy.email}
        <input
          className={field}
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          readOnly={status === "sending"}
          required
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {copy.message}
        <textarea
          className={field}
          name="message"
          rows={4}
          maxLength={4000}
          readOnly={status === "sending"}
          required
        />
      </label>

      <p className="text-sm text-muted-foreground">{copy.dataUse}</p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "sending" ? copy.submitting : copy.submit}
      </button>
      <div role="status" className="empty:hidden">
        {status === "sent" && <p className="text-sm font-medium">{copy.success}</p>}
        {status === "error" && <p className="text-sm font-medium">{copy.error}</p>}
      </div>
    </form>
  );
}
