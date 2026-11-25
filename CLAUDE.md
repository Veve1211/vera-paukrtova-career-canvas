@AGENTS.md

# CLAUDE.md

## Projekt
- Osobní portfolio Věry Paukrtové pro klienty a spolupráci ve Vibecoding Akademii.
- Jedna stránka: projekty, přístup, zkušenosti, vzdělání, kontakt. Web je jen česky.

## Uživatel
- Veve (Věra Paukrtová) zadává funkčně a jednoduše česky. AI rozhoduje technickou syntaxi a architekturu a stručně vysvětluje, proč.
- Cílová skupina webu: klienti a spolupracovníci (Vibecoding Akademie), personalisté.

## Design
- Barvy a písma jsou tokeny v `src/styles.css`: papírové pozadí, hlavní barva švestková (`--plum`), nadpisy Playfair Display (`font-display`), text DM Sans. Nové barvy jen přes tokeny, žádné natvrdo v komponentách.
- Klidný, redakční styl s hodně volného místa. Mobile first.

## Stack a prostředí
- TanStack Start (React 19, TanStack Router), Vite 8, TypeScript 5, Tailwind CSS 4; testy Vitest
- Balíčky přes bun (`bun.lock`); příkazy `bun run dev`, `bun run test`, `bun run build`, `bun run test:e2e` (Playwright: počítač, tablet, mobil + axe)
- V cloud sandboxu: `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome bun run test:e2e`
- Hosting Vercel, doména https://verapaukrtova.cz (nasazuje se z `main`)
- Repo je propojené s Lovable (viz AGENTS.md); obsah webu je v `src/content/site.ts`

## Pracovní postup
- Feature větev z `main` → PR → CI (lint, typy, Vitest, build, Playwright) a náhled na Vercelu → kontrola → merge do `main`
- Větev `dev` vědomě není: testovací prostředí je náhled na Vercelu, který vzniká u každého PR (vlastní adresa, stejný build jako ostrý web).

## Pravidla
- Nikdy nenechávej v UI placeholder.
- Před každým push na main otestuj web v prohlížeči na mobilu, tabletu a počítači – přes Chrome DevTools MCP, a když není k dispozici, přes Playwright s Chromiem.
- Zakázaný je jen odkaz „vera-paukrtova-career-canvas.lovable.app“; ostatní lovable.app projekty jsou povolené.
- Web je jen česky (přepínač CZ/EN odstraněn 2026-11-17).
- og:image 1200×627, text a fotka aspoň 180 px od stran (LinkedIn ořezává), česky.
- Při každé změně og:image změň i název souboru (og-image-v3.jpg …), LinkedIn si obrázek pamatuje podle adresy.
- Na webu žádné IČO, ceny ani objednávky (zatím se nic neprodává).
- Žádné klíče v kódu ani v repu; `.env` nikdy necommitovat (je v `.gitignore`).
- Kód, komentáře a commity anglicky, texty webu česky.
