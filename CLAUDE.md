@AGENTS.md

# CLAUDE.md

## Projekt
- Osobní portfolio Věry Paukrtové pro klienty a spolupráci ve Vibecoding Akademii.
- Jedna stránka: projekty, přístup, zkušenosti, vzdělání, kontakt. Web je jen česky.

## Stack a prostředí
- TanStack Start (React 19, TanStack Router), Vite 8, TypeScript 5, Tailwind CSS 4, shadcn/ui; testy Vitest
- Balíčky přes bun (`bun.lock`); příkazy `bun run dev`, `bun run test`, `bun run build`
- Hosting Vercel, doména https://verapaukrtova.cz (nasazuje se z `main`)
- Repo je propojené s Lovable (viz AGENTS.md); obsah webu je v `src/content/site.ts`

## Pracovní postup
- Feature větev z `main` → PR → náhled na Vercelu → kontrola → merge do `main`

## Pravidla
- Nikdy nenechávej v UI placeholder.
- Před každým push na main otestuj web v prohlížeči na mobilu, tabletu a počítači – přes Chrome DevTools MCP, a když není k dispozici, přes Playwright s Chromiem.
- Zakázaný je jen odkaz „vera-paukrtova-career-canvas.lovable.app“; ostatní lovable.app projekty jsou povolené.
- Web je jen česky (přepínač CZ/EN odstraněn 2026-11-17).
- og:image 1200×627, text a fotka aspoň 180 px od stran (LinkedIn ořezává), česky.
- Při každé změně og:image změň i název souboru (og-image-v3.jpg …), LinkedIn si obrázek pamatuje podle adresy.
- Živnost je pozastavená – na webu žádné IČO, ceny ani objednávky.
- Žádné klíče v kódu ani v repu.
