/**
 * All texts, projects, experience and links of the website live here.
 * Edit this file to update the content. The site is Czech only.
 *
 * Optional fields stay `null` (or are left out) until the real value is known; the site
 * then hides them: links.email, links.cvPdf, project.url / github, education.year.
 */

export const siteUrl = "https://verapaukrtova.cz";

export const links = {
  linkedin: "https://www.linkedin.com/in/vera-paukrtova/",
  email: "paukrtovavera@seznam.cz" as string | null,
  cvPdf: "/cv-vera-paukrtova.pdf" as string | null,
};

/** Page that starts the CV download; its page views in Vercel Analytics count the downloads. */
export const cvPagePath = "/cv";

/** The bigger goal a project belongs to; shown as a tag on the card and in the detail. */
export type MissionId = "jobs" | "education";

export type ProjectId = "cvecko" | "cesky-kral" | "kompleto" | "ciste-recenze" | "paukrt";

export type Project = {
  id: ProjectId;
  name: string;
  kind: string;
  /** live = in use, prototype = clickable demo on sample data, concept = idea without a link. */
  status: "live" | "prototype" | "concept";
  statusLabel: string;
  /** Optional: the bigger project (mission) this one is part of, in Věra's own words. */
  mission?: MissionId;
  /** What the app does – short, shown on the project list. */
  summary: string;
  /** Longer description for the project detail. Optional: the detail falls back to `summary`. */
  about?: string;
  /** Which problem it solves. Optional: left out when it would repeat the summary. */
  problem?: string;
  /** Věra's role in the project. Optional: left out when not stated. */
  role?: string;
  /** Current state of the project. Optional: left out when the status label says it all. */
  state?: string;
  /** One verifiable result: a number or a finding someone can check. Optional. */
  result?: string;
  /**
   * Optional short silent video of the live app (file in public/), played only after the
   * visitor presses play. `alt` says what it shows, for screen readers.
   */
  video?: { src: string; alt: string };
  /** Only technologies that are documented (brief, Věra's own words, or what the live app reports). */
  tech: string[];
  url: string | null;
  urlLabel: string | null;
  github: string | null;
};

export type Experience = {
  company: string;
  role: string;
  period: string | null;
  current?: boolean;
  /** Roles most relevant to digital products get the larger layout. */
  featured: boolean;
  summary: string;
  /** What carries over into building digital products. */
  transfer: string;
  tags: string[];
};

export type Education = {
  provider: string;
  title: string;
  type: string;
  year: string | null;
};

const projectMeta = {
  cvecko: { url: "https://cvecko.cz", github: "https://github.com/Veve1211/cvecko" },
  "cesky-kral": {
    url: "https://cesky-kral.up.railway.app",
    github: "https://github.com/Veve1211/cesky-kral",
  },
  kompleto: {
    url: "https://kompleto.vercel.app/",
    github: null,
  },
  "ciste-recenze": {
    url: "https://verim-recenze-v-klidu.vercel.app/",
    github: null,
  },
  paukrt: {
    url: "https://paukrt.lovable.app/",
    github: "https://github.com/Veve1211/jiri-paukrt-web",
  },
} satisfies Record<ProjectId, { url: string | null; github: string | null }>;

const cs = {
  meta: {
    title:
      "Věra Paukrtová – weby a\u00a0aplikace s\u00a0pomocí AI | QA a\u00a0zákaznická zkušenost",
    description:
      "Věra Paukrtová tvoří weby a\u00a0aplikace s\u00a0pomocí AI a\u00a0propojuje je s\u00a0praxí z\u00a0QA, UAT testování a\u00a0zákaznické zkušenosti. Projekty Cvéčko a\u00a0Český král.",
    /** Topics for the search-engine profile (JSON-LD). */
    knowsAbout: ["Tvorba webů s\u00a0pomocí AI", "QA", "UAT testování", "Zákaznická zkušenost"],
  },
  skipLink: "Přeskočit na obsah",
  nav: [
    { id: "projekty", label: "Projekty" },
    { id: "pristup", label: "Co přináším" },
    { id: "zkusenosti", label: "Zkušenosti" },
    { id: "vzdelani", label: "Vzdělání" },
    { id: "kvalita", label: "Kvalita" },
    { id: "kontakt", label: "Kontakt" },
  ],
  ui: {
    mainNav: "Hlavní navigace",
    mobileNav: "Mobilní navigace",
    menuOpen: "Otevřít menu",
    menuClose: "Zavřít menu",
    downloadCv: "Stáhnout CV",
    github: "Kód na GitHubu",
    whatItDoes: "Co aplikace dělá",
    moreAbout: "Více o\u00a0projektu",
    closeDetail: "Zavřít detail projektu",
    problem: "Jaký problém řeší",
    role: "Moje role",
    state: "Aktuální stav",
    result: "Výsledek",
    tech: "Technologie",
    current: "Aktuálně",
    transfer: "Co z\u00a0toho využívám v\u00a0digitálních produktech",
    moreExperience: "Další zkušenosti",
    backToTop: "Zpět nahoru",
    newTab: "(otevře se v\u00a0novém okně)",
    portraitAlt: "Portrét Věry Paukrtové",
    desktopView: "počítačová verze",
    mobileView: "mobilní verze",
    conceptIllustration: "Ilustrace konceptu — nejde o\u00a0snímek aplikace",
    playVideo: "Přehrát ukázku webu",
    pauseVideo: "Pozastavit ukázku webu",
  },
  hero: {
    name: "Věra Paukrtová",
    role: "Weby a\u00a0aplikace s\u00a0pomocí AI | QA a\u00a0zákaznická zkušenost",
    title: ["Tvořím weby a\u00a0aplikace s\u00a0pomocí AI", "a\u00a0sama je testuji."],
    /** One sentence under the headline: what Věra does now (wording agreed 2026-11-25). */
    offer:
      "Aplikace dotáhnu od nápadu až do provozu: navrhnu, co mají dělat, vedu AI při vývoji, otestuji je a\u00a0nasadím.",
    ctaProjects: "Prohlédnout projekty",
    ctaContact: "Kontaktovat mě",
    seal: "Přemýšlím jako zákazník, hlídám kvalitu, tvořím s\u00a0AI.",
    proofLabel: "Praxe z",
    proofProjects: "2 živé aplikace · 1 web · 2 prototypy",
  },
  projects: {
    index: "01",
    label: "Projekty",
    upcomingTitle: "Připravuji",
    missions: {
      jobs: "Hledání práce",
      education: "Vzdělávání",
    } satisfies Record<MissionId, string>,
    missionLabel: "Součást projektu",
    title: ["Aplikace, které", "si můžete vyzkoušet."],
    intro:
      "Navrhuji, řídím vývoj s\u00a0AI, testuji v\u00a0Playwrightu a\u00a0nasazuji na Railway, Vercel nebo Lovable. Většina projektů patří ke dvěma větším cílům: hledání práce a\u00a0vzdělávání.",
    items: [
      {
        id: "cvecko",
        name: "Cvéčko",
        kind: "Webová aplikace na tvorbu životopisů",
        status: "live",
        statusLabel: "Živá aplikace",
        mission: "jobs",
        summary:
          "Napíšete o\u00a0sobě pár vět a\u00a0AI z\u00a0nich poskládá přehledný životopis — bez formulářů, rovnou jako PDF.",
        about:
          "Napíšete o\u00a0sobě pár vět a\u00a0AI z\u00a0nich poskládá přehledný životopis — bez vyplňování formulářů, s\u00a0výsledkem jako PDF ve formátu A4.",
        problem:
          "Běžné nástroje na tvorbu CV mi nefungovaly. Chtěla jsem vlastní, který vypadá i\u00a0funguje přesně podle mých představ.",
        role: "Nápad, návrh funkcí a\u00a0uživatelského postupu, vývoj s\u00a0pomocí AI, testování a\u00a0nasazení. Zvolila jsem vkládání textu místo formuláře, protože je pro zákazníka přívětivější, a\u00a0výstup jen na jednu stranu A4, protože tolik má životopis mít. Rozhodla jsem také, že kontrolu, jestli AI nic nepřidala, nebude dělat AI, ale kód — a\u00a0že po spuštění už nepřidávám funkce, dokud aplikaci nevyzkouší první skuteční uživatelé.",
        state:
          "Aplikace je v\u00a0provozu a\u00a0životopis s\u00a0PDF je zdarma. Platby jsou připravené, ale vypnuté. Spolu s\u00a0prototypem Kompleto tvoří jeden projekt: celou cestu hledáním práce na jednom místě.",
        result:
          "Pojistka v\u00a0kódu porovná firmy, roky, čísla i\u00a0dovednosti v\u00a0životopisu s\u00a0původním textem a\u00a0co v\u00a0něm nebylo, žlutě podtrhne. Každou změnu před nasazením hlídají automatické testy na počítači i\u00a0mobilu (běží v\u00a0CI na GitHubu), bezpečnost prošla auditem ve 2\u00a0kolech.",
        video: {
          src: "/cvecko-ukazka.mp4",
          alt: "ukázka aplikace: z\u00a0neučesaného textu vznikne životopis, údaje, které v\u00a0textu nebyly, jsou podtržené žlutě; pak vložení inzerátu a\u00a0motivační dopis",
        },
        tech: ["Next.js", "Claude Code", "Railway", "GitHub"],
        urlLabel: "Otevřít cvecko.cz",
        ...projectMeta.cvecko,
      },
      {
        id: "cesky-kral",
        name: "Český král",
        kind: "Interaktivní vzdělávací webová hra",
        status: "live",
        statusLabel: "Živá aplikace",
        mission: "education",
        summary:
          "Hráč odpovídá na otázky o\u00a0českých panovnících a\u00a0sbírá je jako karty. Ve hře je denní výzva, rychlé kvízy, žebříček i\u00a0vlastní erb.",
        problem:
          "Česká historie mě bavila a\u00a0pořád baví. Chtěla jsem, aby si k\u00a0ní žáci a\u00a0studenti našli cestu přirozeně — hrou, ne memorováním.",
        role: "Moje úplně první aplikace: návrh herní logiky, prompty pro AI, testování v\u00a0Playwrightu a\u00a0nasazení na Railway. Při testování na mobilu jsem zjistila, že se otázky z\u00a0prohraného kola opakují v\u00a0mistrovském kole a\u00a0že fakt po odpovědi nejde dočíst. Rozdělila jsem proto otázky do tří uzavřených okruhů a\u00a0zrušila automatický přechod na další otázku. Zdroj u každé otázky je moje rozhodnutí kvůli důvěryhodnosti: hra míří i\u00a0do škol.",
        state:
          "Hra je v\u00a0provozu a\u00a0zahrát si ji může kdokoli. Je součástí většího projektu o\u00a0vzdělávání: chci studentům a\u00a0žákům přiblížit učení v\u00a0podobě, která je pro ně přijatelná.",
        result:
          "18 panovníků a\u00a0241 otázek, u\u00a0každé odkaz na zdroj. Správnou odpověď zná jen server a\u00a0skóre do žebříčků počítá jen on, takže ho hráč nemůže podvrhnout.",
        video: {
          src: "/cesky-kral-ukazka.mp4",
          alt: "ukázka hry: kolo o\u00a0kartu Libuše, pět otázek a\u00a0odhalení nové karty ve sbírce",
        },
        tech: ["Next.js", "Claude Code", "Playwright", "Railway"],
        urlLabel: "Zahrát si Českého krále",
        ...projectMeta["cesky-kral"],
      },
      {
        id: "paukrt",
        name: "Profesní web dopravního inženýra",
        kind: "Portfolio pro bratra",
        status: "live",
        statusLabel: "Živý web",
        summary: "Portfolio pro mého bratra, inženýra pro návrh silnic a\u00a0křižovatek.",
        about:
          "Osobní prezentace a\u00a0CV mého bratra, inženýra pro návrh silnic a\u00a0křižovatek. Dvojjazyčný web (EN/CZ) s\u00a0modrým vizuálem inspirovaným dopravním modelem. Součástí je interaktivní mapa sítě: dá se přepínat mezi zobrazením sítě a\u00a0zatížení (V/C) a\u00a0klikat na jednotlivé křižovatky. Je označená jako ilustrativní, nejde o\u00a0data z\u00a0projektů.",
        role: "Návrh a\u00a0řízení projektu, texty, animace a\u00a0testování přístupnosti.",
        state:
          "Web je v\u00a0provozu, hotový byl za 8\u00a0dní. Na tvorbu webových portfolií se chci dál zaměřit.",
        result:
          "Každá stránka v\u00a0angličtině i\u00a0češtině prochází automatickou kontrolou přístupnosti (WCAG 2.1 AA) na počítači, tabletu i\u00a0mobilu.",
        video: {
          src: "/paukrt-ukazka-webu.mp4",
          alt: "ukázka webu: mapa sítě se zatížením (V/C), mapa toků u\u00a0projektu a\u00a0simulátor dopravního koridoru",
        },
        tech: ["Lovable", "React", "GitHub"],
        urlLabel: "Zobrazit web",
        ...projectMeta.paukrt,
      },
      {
        id: "kompleto",
        name: "Kompleto",
        kind: "Prototyp vyhledávače práce",
        status: "prototype",
        statusLabel: "Prototyp",
        mission: "jobs",
        summary:
          "Vyhledávač práce, který má sdružit nabídky z\u00a0celého českého trhu a\u00a0nechat lidi přesně filtrovat. Zatím běží na ukázkových datech.",
        about:
          "Vyhledávač práce, který má jednou sdružit nabídky z\u00a0celého českého trhu na jednom místě a\u00a0nechat lidi přesně filtrovat: slova, která v\u00a0nabídce nechcete, minimální mzda, typ úvazku, práce z\u00a0domova nebo vhodnost pro OZP. Stejnou nabídku z\u00a0více portálů ukáže jen jednou.",
        problem:
          "Vždycky mi enormně vadilo, jak jsou nabídky práce roztříštěné. Chci jedno místo, kam stačí se podívat — s\u00a0dokonalou filtrací.",
        role: "Návrh a\u00a0řízení prototypu v\u00a0Lovable, texty a\u00a0testování vyhledávání.",
        state:
          "Prototyp jsem postavila za jeden den čisté práce (rozložený do 3\u00a0dnů) a\u00a0běží na ukázkových datech. Spolu s\u00a0Cvéčkem tvoří jeden projekt o\u00a0hledání práce. S\u00a0dalším vývojem určitě počítám, největší výzvou bude napojení na další portály.",
        video: {
          src: "/kompleto-ukazka.mp4",
          alt: "ukázka prototypu: filtry Nechci „call centrum“, jen z\u00a0domova a\u00a0mzda od 45\u00a0000\u00a0Kč, pak uložení nabídky",
        },
        tech: ["Lovable", "React", "TanStack Start"],
        urlLabel: "Vyzkoušet prototyp",
        ...projectMeta.kompleto,
      },
      {
        id: "ciste-recenze",
        name: "Čisté recenze",
        kind: "Prototyp kontroly recenzí",
        status: "prototype",
        statusLabel: "Prototyp",
        summary:
          "Ukáže, jestli se dá věřit recenzím podniku: skóre důvěryhodnosti a\u00a0podezřelé vzorce v\u00a0hodnoceních. Zatím běží na ukázkových datech.",
        about:
          "Aplikace odpovídá na jednu otázku: dá se věřit recenzím podniku? Ukáže skóre důvěryhodnosti 0–100, porovná hodnocení českých a\u00a0zahraničních recenzentů a\u00a0upozorní na podezřelé vzorce. Výsledek je odhad, ne důkaz.",
        problem:
          "Recenze na Googlu se dají zfalšovat. V\u00a0zahraničí už podobná kontrola funguje.",
        role: "Návrh a\u00a0řízení prototypu v\u00a0Lovable, texty a\u00a0testování výsledků.",
        state:
          "Prototyp jsem postavila za jeden den čisté práce (rozložený do 3\u00a0dnů) a\u00a0běží na ukázkových datech a\u00a0podnicích v\u00a0Praze. S\u00a0dalším vývojem určitě počítám, chci ho dotáhnout tak, aby byl opravdu užitečný.",
        video: {
          src: "/ciste-recenze-ukazka.mp4",
          alt: "ukázka prototypu na ukázkových datech (podnik je smyšlený): zadání podniku, kontrola recenzí a\u00a0výsledek, skóre důvěryhodnosti 24 ze 100, porovnání českých a\u00a0zahraničních recenzentů a\u00a0podezřelé vzorce",
        },
        tech: ["Lovable", "React", "TanStack Start"],
        urlLabel: "Vyzkoušet prototyp",
        ...projectMeta["ciste-recenze"],
      },
    ] satisfies Project[],
  },
  /** Section texts only; the measured numbers live in `src/content/quality.ts`. */
  quality: {
    index: "05",
    label: "Technická kvalita a\u00a0ověřené výsledky",
    title: ["Od nápadu", "k\u00a0produkčnímu nasazení."],
    intro:
      "Každý projekt prochází technickými kontrolami zaměřenými na výkon, přístupnost, bezpečnost a\u00a0SEO.",
    detailsToggle: "Zobrazit podrobné výsledky a\u00a0postupy",
    statsLabel: "Souhrn měření",
    stats: {
      projects: "Nasazené projekty",
      projectsNote: "s\u00a0živým webem a\u00a0veřejným kódem",
      average: "Průměrné skóre PageSpeed",
      averageNote: "ze 100, průměr {count} měření: 4\u00a0kategorie, mobil i\u00a0počítač",
      seo: "PageSpeed SEO",
      seoNote: "technická kontrola, ne pozice ve vyhledávání",
      headers: "Security Headers",
      headersNote: "hodnocení HTTP hlaviček, ne bezpečnostní audit",
    },
    practicesTitle: "Technologie a\u00a0vývojové postupy",
    practices: [
      {
        title: "GitHub a\u00a0verzování",
        text: "Každá změna vzniká ve vlastní větvi a\u00a0do hlavní větve jde jen přes pull request.",
      },
      {
        title: "CI/CD",
        text: "GitHub Actions u\u00a0každého pull requestu spustí lint, kontrolu typů, testy a\u00a0build. Nasazení na Vercel nebo Railway proběhne až po sloučení.",
      },
      {
        title: "Automatizované testy",
        text: "Jednotkové testy ve Vitestu a\u00a0testy v\u00a0prohlížeči v\u00a0Playwrightu na mobilu i\u00a0počítači.",
      },
      {
        title: "Produkční nasazení",
        text: "Testovací prostředí nebo náhled každé změny, teprve potom ostrý web na vlastní adrese s\u00a0HTTPS.",
      },
      {
        title: "SEO a\u00a0strukturovaná data",
        text: "Metadata, sitemap a\u00a0robots.txt všude, strukturovaná data (JSON-LD) u\u00a0portfolia a\u00a0Cvéčka.",
      },
      {
        title: "Analytika bez cookies",
        text: "Umami u\u00a0Cvéčka, Vercel Web Analytics u\u00a0portfolia. Bez cookies a\u00a0bez sledování napříč weby.",
      },
      {
        title: "Bezpečnost a\u00a0přístupnost",
        text: "Bezpečnostní hlavičky, audit závislostí a\u00a0automatická kontrola přístupnosti axe v\u00a0testech.",
      },
    ],
    resultsTitle: "Výsledky jednotlivých projektů",
    labels: {
      pageSpeed: "PageSpeed výkon",
      mobile: "Mobil",
      desktop: "Počítač",
      otherCategories: "Přístupnost, osvědčené postupy a\u00a0SEO",
      otherCategoriesValue: "100 na mobilu i\u00a0počítači",
      gtmetrix: "GTmetrix",
      gtmetrixPerformance: "výkon",
      gtmetrixStructure: "struktura",
      securityHeaders: "Security Headers",
      sslLabs: "SSL Labs",
      waveAim: "WAVE AIM",
      notMeasured: "neměřeno",
      outOf100: "ze 100",
      outOf10: "z\u00a010",
      practices: "Ověřené postupy",
      live: "Živý web",
      github: "Kód na GitHubu",
    },
    notesTitle: "Jak výsledky číst",
    notes: [
      {
        title: "Laboratorní měření, ne data návštěvníků",
        text: "PageSpeed Insights (Lighthouse) i\u00a0GTmetrix načtou stránku jednou na simulovaném zařízení a\u00a0připojení. Nejde o\u00a0data skutečných uživatelů (Core Web Vitals z\u00a0Chrome UX Report), ta tu neuvádím. Výsledek se mezi měřeními může o\u00a0pár bodů lišit.",
      },
      {
        title: "SEO skóre není pozice ve vyhledávání",
        text: "PageSpeed SEO kontroluje technické základy: titulek, popis, indexovatelnost a\u00a0odkazy. Jak vysoko se web ve vyhledávání zobrazí, z\u00a0něj vyčíst nelze.",
      },
      {
        title: "Bezpečnostní známka není audit",
        text: "Security Headers hodnotí bezpečnostní HTTP hlavičky, SSL Labs nastavení HTTPS. Nejde o\u00a0kompletní bezpečnostní audit ani penetrační test.",
      },
      {
        title: "WAVE AIM je automatický odhad",
        text: "Skóre 0–10 odhaduje přístupnost z\u00a0kódu stránky. Ruční kontrolu klávesnicí a\u00a0čtečkou obrazovky nenahrazuje.",
      },
    ],
    footnote: "Výsledky laboratorních měření z\u00a0{date}. Hodnoty se mohou v\u00a0čase měnit.",
  },
  approach: {
    index: "02",
    label: "Co přináším do projektů",
    title: ["Jeden přístup,", "tři úhly pohledu."],
    intro:
      "Dokážu se okamžitě vžít do zákazníka. Podívám se na web očima člověka, kterého už něco naštvalo — a\u00a0UX i\u00a0funkční chyby najdu dřív, než se dostanou ke skutečným lidem. Nejsem seniorní programátor a\u00a0nepředstírám to. Navrhuji, co a\u00a0proč má aplikace dělat, vedu při vývoji AI, testuji a\u00a0nasazuji.",
    pillars: [
      {
        index: "01",
        title: "Tvorba digitálních produktů",
        text: "Od nápadu přes návrh funkcí a\u00a0logiky až po nasazení. Webové aplikace tvořím s\u00a0AI nástroji a\u00a0dolaďuji je v\u00a0iteracích, dokud nefungují tak, jak mají.",
        items: [
          "Návrh funkcionalit",
          "Psaní promptů",
          "Vývoj s\u00a0pomocí AI",
          "Logika aplikací",
          "Iterace",
          "Nasazení na Railway",
        ],
      },
      {
        index: "02",
        title: "Kvalita a\u00a0testování",
        text: "QA jsem dělala v\u00a0automobilovém průmyslu, UAT testování v\u00a0T-Mobile. Píšu testovací scénáře, hlásím chyby a\u00a0hledám jejich skutečné příčiny. Vlastní aplikace testuji v\u00a0Playwrightu.",
        items: [
          "QA",
          "UAT",
          "Funkční testování",
          "Testovací scénáře",
          "Hlášení chyb",
          "Analýza příčin",
          "Playwright",
        ],
      },
      {
        index: "03",
        title: "Porozumění zákazníkům",
        text: "Z\u00a0Allegro, T-Mobile a\u00a0dalších firem vím, kde se lidé v\u00a0procesu zaseknou a\u00a0co je opravdu štve. Umím problém pojmenovat, zlepšit postup a\u00a0domluvit se se zákazníkem.",
        items: [
          "Uživatelské problémy",
          "Zlepšování procesů",
          "Komunikace se zákazníky",
          "Reklamace",
          "CRM",
        ],
      },
    ],
    flow: ["Navrhnu", "Otestuji", "Ověřím očima uživatele"],
    summary:
      "Dohromady to znamená, že nápad dovedu do funkční podoby, otestuji ho a\u00a0ověřím, jestli dává smysl lidem, kteří ho budou používat.",
    principlesTitle: "Jak pracuji",
    principles: [
      "Důležitý je výsledek, i\u00a0když je nedokonalý – jinak je to nekončící proces.",
      "Nestačí, aby to fungovalo. Musí to dávat smysl lidem.",
    ],
    principlesAuthor: "— Věra Paukrtová",
    toolsTitle: "S\u00a0čím pracuji",
    toolsNote: "Kód píše AI. Já řídím zadání, kontroluji pull requesty, testy a\u00a0nasazení.",
    tools: [
      "Claude Code",
      "Lovable",
      "Next.js a\u00a0React",
      "TypeScript",
      "GitHub: větve, PR a\u00a0CI",
      "Playwright",
      "Railway a\u00a0Vercel",
    ],
  },
  experience: {
    index: "03",
    label: "Pracovní zkušenosti",
    title: ["Praxe, která mě naučila", "myslet na uživatele."],
    intro:
      "V\u00a0těchto rolích jsem nevyvíjela software. Naučila jsem se v\u00a0nich ale testovat, hledat příčiny problémů a\u00a0vidět proces očima zákazníka — a\u00a0to dnes dávám do každého projektu.",
    items: [
      {
        company: "Allegro Group",
        role: "Specialista podpory marketplace",
        period: "11/2025 – současnost",
        current: true,
        featured: true,
        summary:
          "Pomáhám prodejcům na Mall.cz, Mall.sk a\u00a0CZC — od reklamací až po logiku rušení objednávek. Pracuji v\u00a0Daktele a\u00a0Microsoft DAX.",
        transfer:
          "Každý den vidím, kde se lidé v\u00a0procesu ztrácejí a\u00a0proč. Učí mě to navrhovat postupy a\u00a0rozhraní, které uživatelům nepřekážejí.",
        tags: [
          "Mall.cz · Mall.sk · CZC",
          "Zákaznické procesy",
          "Reklamace",
          "Daktela",
          "Microsoft DAX",
        ],
      },
      {
        company: "Ipsos",
        role: "Koordinátor",
        period: "3/2025 – 11/2025",
        featured: false,
        summary:
          "Koordinovala jsem projekty sčítání dopravy a\u00a0byla oporou pro stovky terénních pracovníků. Dohromady šlo o\u00a0více než 7 000 segmentů.",
        transfer:
          "Přehled ve velkém objemu dat a\u00a0jasná komunikace s\u00a0mnoha lidmi najednou.",
        tags: ["Sčítání dopravy", "Stovky terénních pracovníků", "7 000+ segmentů"],
      },
      {
        company: "Zentiva",
        role: "Digitální HR podpora a\u00a0webmaster",
        period: "1/2022 – 12/2022",
        featured: true,
        summary:
          "Spravovala jsem intranet pro pět zemí a\u00a0podporovala mezinárodní digitální procesy v\u00a0HR.",
        transfer:
          "Správa webového obsahu a\u00a0digitálních procesů tak, aby se v\u00a0nich vyznali lidé z\u00a0různých zemí.",
        tags: ["Intranet · 5 zemí", "Digitální procesy", "Mezinárodní tým"],
      },
      {
        company: "T-Mobile",
        role: "UAT tester",
        period: "2/2021 – 12/2021",
        featured: true,
        summary:
          "Testovala jsem CRM a\u00a0webové aplikace, psala testovací scénáře a\u00a0hlásila chyby dřív, než se nová verze dostala k\u00a0zákazníkům.",
        transfer:
          "Testovací scénáře, UAT a\u00a0srozumitelné hlášení chyb — základ, na kterém stavím testování vlastních aplikací.",
        tags: ["UAT", "CRM", "Webové aplikace", "Testovací scénáře", "Hlášení chyb"],
      },
      {
        company: "Megatech Industries",
        role: "QA inženýr",
        period: "1/2017 – 9/2020",
        featured: true,
        summary:
          "Řídila jsem kvalitu pro Škodu, VW a\u00a0BMW, řešila reklamace a\u00a0hledala skutečné příčiny problémů — ne jen jejich projevy.",
        transfer:
          "Hledat příčinu, ne jen zalepit projev. Stejně přistupuji k\u00a0chybám v\u00a0aplikacích.",
        tags: ["Automobilový průmysl", "Řízení kvality", "Reklamace", "Analýza příčin"],
      },
    ] satisfies Experience[],
  },
  education: {
    index: "04",
    label: "Vzdělání a\u00a0kurzy",
    title: ["Vzdělání", "a\u00a0kurzy."],
    items: [
      {
        provider: "Vibecoding Akademie",
        title: "Vibecoding Akademie I",
        type: "Online kurz (Claude Code)",
        year: "2026",
      },
      {
        provider: "Vibecoding Akademie",
        title: "Vibecoding Basecamp",
        type: "Online kurz (Lovable)",
        year: "2026",
      },
      {
        provider: "University of Michigan",
        title: "Web Design for Everybody",
        type: "Specializace (certifikát)",
        year: "12/2025",
      },
      {
        provider: "PrimaKurzy",
        title: "Vývoj webových aplikací",
        type: "Kurz (certifikát)",
        year: "6/2025",
      },
      {
        provider: "Coursera",
        title: "Crash Course on Python",
        type: "Online kurz",
        year: "6/2023",
      },
      {
        provider: "University College Prague",
        title: "Destination Management",
        type: "Bakalářský titul",
        year: "2013",
      },
    ] satisfies Education[],
  },
  contact: {
    index: "06",
    label: "Kontakt a\u00a0spolupráce",
    title: ["Máte nápad na web", "nebo digitální aplikaci?"],
    text: "Ráda pomůžu s\u00a0webem nebo aplikací od prvního nápadu až po spuštění. Jsem otevřená projektové spolupráci i\u00a0příležitostem v\u00a0digitálních týmech.",
    stepsTitle: "Jak spolupráce probíhá",
    steps: [
      {
        title: "Zavoláme si",
        text: "Řeknete mi, co potřebujete a\u00a0pro koho web nebo aplikace je.",
      },
      {
        title: "Navrhnu rozsah",
        text: "Sepíšu, co bude hotové v\u00a0první verzi a\u00a0co může počkat.",
      },
      {
        title: "Průběžné náhledy",
        text: "Každou změnu vidíte na vlastní testovací adrese dřív, než jde ven.",
      },
      {
        title: "Předání",
        text: "Web nebo aplikaci spustím a\u00a0předám vám přístupy i\u00a0kód.",
      },
    ],
    areasTitle: "Kde se ráda zapojím",
    areas: [
      "Aplikace s\u00a0pomocí AI",
      "Testování a\u00a0QA",
      "Tvorba webových stránek",
      "Osobní weby a\u00a0portfolia",
    ],
    emailCta: "Napište mi e-mail",
  },
  /** The /cv page: starts the CV download (each visit = one download in Vercel Analytics). */
  cvPage: {
    title: "Životopis — Věra Paukrtová",
    heading: "Stahuji životopis",
    text: "Stahování by se mělo spustit samo. Pokud se nespustilo, použijte odkaz níže.",
    manualLink: "Stáhnout CV (PDF)",
    unavailableHeading: "Životopis teď není k\u00a0dispozici",
    unavailableText: "Napište mi prosím přes LinkedIn.",
    back: "Zpět na web",
  },
  footer: {
    note: "Navrženo a\u00a0postaveno s\u00a0AI — stejně jako moje aplikace.",
  },
};

export type SiteContent = typeof cs;

export const content: SiteContent = cs;
