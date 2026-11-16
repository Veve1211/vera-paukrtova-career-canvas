import { useI18n } from "@/lib/i18n";

function Row({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 pr-10 text-sm whitespace-nowrap text-muted-foreground">
          <span>{item}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-primary/50" />
        </li>
      ))}
    </ul>
  );
}

export function FocusBand() {
  const { t } = useI18n();
  return (
    <section aria-label={t.focus.title} className="group overflow-hidden border-y border-border bg-card/50 py-6">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row items={t.focus.items} />
        <Row items={t.focus.items} hidden />
      </div>
    </section>
  );
}
