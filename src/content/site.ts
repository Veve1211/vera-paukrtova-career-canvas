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

export type ProjectId = "cvecko" | "cesky-kral" | "kompleto" | "paukrt";

export type Project = {
  id: ProjectId;
  name: string;
  kind: string;
  status: "live" | "concept";
  statusLabel: string;
  /** What the app does. */
  summary: string;
  /** Which problem it solves. Optional: left out when it would repeat the summary. */
  problem?: string;
  /** Věra's role in the project. Optional: left out when not stated. */
  role?: string;
  /** Current state of the project. Optional: left out when the status label says it all. */
  state?: string;
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
  cvecko: { url: "https://cvecko.cz", github: "https://github.com/Veve1211/cv-studio" },
  "cesky-kral": {
    url: "https://cesky-kral.up.railway.app",
    github: "https://github.com/Veve1211/cesky-kral",
  },
  kompleto: { url: null, github: null },
  paukrt: {
    url: "https://paukrt.lovable.app/",
    github: "https://github.com/Veve1211/transport-constellation-atlas",
  },
} satisfies Record<ProjectId, { url: string | null; github: string | null }>;

const highlights = [
  "Web Development",
  "AI-assisted Applications",
  "QA Testing",
  "Customer Experience",
];

const cs = {
  meta: {
    title:
      "Věra Paukrtová – weby a\u00a0aplikace s\u00a0pomocí AI | QA a\u00a0zákaznická zkušenost",
    description:
      "Věra Paukrtová tvoří weby a\u00a0aplikace s\u00a0pomocí AI a\u00a0propojuje je s\u00a0praxí z\u00a0QA, UAT testování a\u00a0zákaznické zkušenosti. Projekty CVéčko a\u00a0Český král.",
    /** Topics for the search-engine profile (JSON-LD). */
    knowsAbout: ["Tvorba webů s\u00a0pomocí AI", "QA", "UAT testování", "Zákaznická zkušenost"],
  },
  skipLink: "Přeskočit na obsah",
  nav: [
    { id: "projekty", label: "Projekty" },
    { id: "pristup", label: "Co přináším" },
    { id: "zkusenosti", label: "Zkušenosti" },
    { id: "vzdelani", label: "Vzdělání" },
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
    problem: "Jaký problém řeší",
    role: "Moje role",
    state: "Aktuální stav",
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
  },
  hero: {
    name: "Věra Paukrtová",
    role: "Weby a\u00a0aplikace s\u00a0pomocí AI | QA a\u00a0zákaznická zkušenost",
    title: ["Tvořím weby a\u00a0aplikace s\u00a0pomocí AI,", "které dávají smysl lidem."],
    intro:
      "Propojuji tvorbu digitálních produktů s\u00a0praktickými zkušenostmi ze zákaznické podpory a\u00a0QA. Díky tomu přemýšlím nejen nad tím, jak aplikaci vytvořit, ale především jak bude fungovat pro skutečné uživatele.",
    ctaProjects: "Prohlédnout moje projekty",
    ctaContact: "Kontaktovat mě",
    highlightsLabel: "Zaměření",
    highlights: [
      "Tvorba webů",
      "Aplikace s\u00a0pomocí AI",
      "Testování a\u00a0QA",
      "Zákaznická zkušenost",
    ],
    seal: "Přemýšlím jako zákazník, hlídám kvalitu, tvořím s\u00a0AI.",
    proofLabel: "Praxe z",
    proofProjects: "2 živé aplikace · 1 web · 1 připravuju",
  },
  projects: {
    index: "01",
    label: "Projekty",
    upcomingTitle: "Připravuju",
    title: ["Aplikace, které", "si můžete vyzkoušet."],
    intro:
      "Píšu prompty, navrhuji logiku, testuji v\u00a0Playwrightu a\u00a0nasazuji na Railway. Nejvíc mě baví začátek, kdy se z\u00a0myšlenky stává něco skutečného — a\u00a0pak postupné dolaďování, dokud to není přesně takové, jaké to chci mít.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "Webová aplikace na tvorbu životopisů",
        status: "live",
        statusLabel: "Živá aplikace",
        summary:
          "Napíšete o\u00a0sobě pár vět a\u00a0AI z\u00a0nich poskládá přehledný životopis — bez vyplňování formulářů, s\u00a0výsledkem jako PDF ve formátu A4. Postavila jsem ho, protože mi běžné nástroje na tvorbu CV nefungovaly a\u00a0chtěla jsem vlastní, který vypadá i\u00a0funguje přesně podle mých představ.",
        role: "Nápad, návrh funkcí a\u00a0uživatelského postupu, vývoj s\u00a0pomocí AI přes prompty, testování a\u00a0nasazení.",
        state:
          "Aplikace je v\u00a0provozu. Do budoucna ji chci rozšířit na celou cestu hledáním práce — s\u00a0myšlenkou i\u00a0na lidi s\u00a0roztroušenou sklerózou.",
        tech: ["Next.js", "Railway", "GitHub", "vývoj s\u00a0pomocí AI"],
        urlLabel: "Otevřít cvecko.cz",
        ...projectMeta.cvecko,
      },
      {
        id: "cesky-kral",
        name: "Český král",
        kind: "Interaktivní vzdělávací webová hra",
        status: "live",
        statusLabel: "Živá aplikace",
        summary:
          "Hráč odpovídá na otázky o\u00a0českých panovnících a\u00a0sbírá je jako karty. Ve hře je denní výzva, rychlé kvízy, žebříček i\u00a0vlastní erb.",
        problem:
          "Česká historie mě bavila a\u00a0pořád baví. Chtěla jsem, aby si k\u00a0ní žáci a\u00a0studenti našli cestu přirozeně — hrou, ne memorováním.",
        role: "Moje úplně první aplikace: návrh herní logiky, prompty pro AI, testování v\u00a0Playwrightu a\u00a0nasazení na Railway.",
        state:
          "Hra je v\u00a0provozu a\u00a0zahrát si ji může kdokoli. Byla to moje první cesta od nápadu až k\u00a0živé aplikaci.",
        tech: ["Next.js", "Railway", "Playwright", "vývoj s\u00a0pomocí AI"],
        urlLabel: "Zahrát si Českého krále",
        ...projectMeta["cesky-kral"],
      },
      {
        id: "kompleto",
        name: "Kompleto",
        kind: "Koncept platformy",
        status: "concept",
        statusLabel: "Ve vývoji",
        summary:
          "Připravovaný koncept platformy, která má sdružit pracovní nabídky z\u00a0různých zdrojů na jednom místě. Dnes jsou rozházené po mnoha portálech a\u00a0hledání znamená procházet pořád dokola stejné weby.",
        role: "Nápad a\u00a0návrh konceptu — co má platforma umět a\u00a0jak by ji lidé používali.",
        tech: [],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
      {
        id: "paukrt",
        name: "Profesní web dopravního inženýra",
        kind: "Osobní profesní web",
        status: "live",
        statusLabel: "Živý web",
        summary:
          "Osobní prezentace a\u00a0CV inženýra pro návrh silnic a\u00a0křižovatek. Dvojjazyčný web (EN/CZ) s\u00a0modrým vizuálem inspirovaným dopravním modelem.",
        tech: ["Lovable", "React", "GitHub"],
        urlLabel: "Zobrazit web",
        ...projectMeta.paukrt,
      },
    ] satisfies Project[],
  },
  approach: {
    index: "02",
    label: "Co přináším do projektů",
    title: ["Jeden přístup,", "tři úhly pohledu."],
    intro:
      "Dokážu se okamžitě vžít do zákazníka. Podívám se na web očima člověka, kterého už něco naštvalo — a\u00a0UX i\u00a0funkční chyby najdu dřív, než se dostanou ke skutečným lidem. Nejsem seniorní programátorka a\u00a0nepředstírám to. Navrhuji, co a\u00a0proč má aplikace dělat, vedu při vývoji AI, testuji a\u00a0nasazuji.",
    pillars: [
      {
        index: "01",
        title: "Tvorba digitálních produktů",
        text: "Od nápadu přes návrh funkcí a\u00a0logiky až po nasazení. Webové aplikace tvořím s\u00a0AI nástroji a\u00a0dolaďuji je v\u00a0iteracích, dokud nefungují tak, jak mají.",
        items: [
          "Návrh funkcionalit",
          "Psaní promptů",
          "vývoj s\u00a0pomocí AI",
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
          "hlášení chyb",
          "analýza příčin",
          "Playwright",
        ],
      },
      {
        index: "03",
        title: "Porozumění zákazníkům",
        text: "Z\u00a0Allegro, T-Mobile a\u00a0dalších firem vím, kde se lidé v\u00a0procesu zaseknou a\u00a0co je opravdu štve. Umím problém pojmenovat, zlepšit postup a\u00a0domluvit se se zákazníkem.",
        items: [
          "zákaznická zkušenost",
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
    learningTitle: "Kde se stále učím",
    learning: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Základy Pythonu"],
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
        role: "Specialistka podpory marketplace",
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
        role: "Koordinátorka",
        period: "3/2025 – 11/2025",
        featured: false,
        summary:
          "Koordinovala jsem projekty sčítání dopravy a\u00a0byla oporou pro stovky terénních pracovníků. Dohromady šlo o\u00a0více než 7 000 segmentů.",
        transfer:
          "Přehled ve velkém objemu dat a\u00a0jasná komunikace s\u00a0mnoha lidmi najednou.",
        tags: ["Sčítání dopravy", "Stovky terénních pracovníků", "7 000+ segmentů"],
      },
      {
        company: "Sigma AI",
        role: "Přepisovatelka",
        period: "1/2024 – 12/2024",
        featured: false,
        summary: "Přepisovala jsem audio data a\u00a0kontrolovala jejich kvalitu.",
        transfer: "Pečlivost a\u00a0kontrola kvality dat, kde rozhoduje každý detail.",
        tags: ["Přepis audia", "Kontrola kvality", "Práce s\u00a0daty"],
      },
      {
        company: "Zentiva",
        role: "Digitální HR podpora a\u00a0webmasterka",
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
        role: "UAT testerka",
        period: "2/2021 – 12/2021",
        featured: true,
        summary:
          "Testovala jsem CRM a\u00a0webové aplikace, psala testovací scénáře a\u00a0hlásila chyby dřív, než se nová verze dostala k\u00a0zákazníkům.",
        transfer:
          "Testovací scénáře, UAT a\u00a0srozumitelné hlášení chyb — základ, na kterém stavím testování vlastních aplikací.",
        tags: ["UAT", "CRM", "Webové aplikace", "Testovací scénáře", "hlášení chyb"],
      },
      {
        company: "Megatech Industries",
        role: "QA inženýrka",
        period: "1/2017 – 9/2020",
        featured: true,
        summary:
          "Řídila jsem kvalitu pro Škodu, VW a\u00a0BMW, řešila reklamace a\u00a0hledala skutečné příčiny problémů — ne jen jejich projevy.",
        transfer:
          "Hledat příčinu, ne jen zalepit projev. Stejně přistupuji k\u00a0chybám v\u00a0aplikacích.",
        tags: ["Automobilový průmysl", "Řízení kvality", "Reklamace", "analýza příčin"],
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
      { provider: "PrimaKurzy", title: "Vývoj webových aplikací", type: "Kurz", year: "6/2025" },
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
        year: null,
      },
    ] satisfies Education[],
  },
  contact: {
    index: "05",
    label: "Kontakt a\u00a0spolupráce",
    title: ["Máte nápad na web", "nebo digitální aplikaci?"],
    text: "Ráda se zapojím do tvorby webových stránek, aplikací s\u00a0pomocí AI nebo projektů, kde mohu propojit vývoj, testování a\u00a0zákaznickou zkušenost. Jsem otevřená projektové spolupráci i\u00a0příležitostem v\u00a0digitálních týmech.",
    areasTitle: "Kde se ráda zapojím",
    areas: [
      "Aplikace s\u00a0pomocí AI",
      "Testování a\u00a0QA",
      "Tvorba webových stránek",
      "Zákaznická zkušenost",
    ],
    emailCta: "Napište mi e-mail",
  },
  footer: {
    note: "Navrženo a\u00a0postaveno s\u00a0AI — stejně jako moje aplikace.",
  },
};

export type SiteContent = typeof cs;

export const content: SiteContent = cs;
