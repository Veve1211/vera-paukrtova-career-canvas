import { content, links } from "@/content/site";

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function ContactForm() {
  const copy = content.contactForm;
  const recipient = links.email;
  if (!recipient) return null;

  return (
    <form
      action={`https://formsubmit.co/${recipient}`}
      method="post"
      className="grid max-w-xl gap-4 rounded-2xl border border-border bg-card p-5 text-foreground sm:p-6"
    >
      <input type="hidden" name="_subject" value={copy.subject} />
      <input type="text" name="_honey" autoComplete="off" tabIndex={-1} hidden />

      <label className="grid gap-1.5 text-sm font-medium">
        {copy.email}
        <input
          className={field}
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {copy.message}
        <textarea className={field} name="message" rows={4} maxLength={4000} required />
      </label>

      <p className="text-sm text-muted-foreground">{copy.dataUse}</p>
      <button
        type="submit"
        className="min-h-12 justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {copy.submit}
      </button>
    </form>
  );
}
