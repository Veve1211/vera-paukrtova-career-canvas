/**
 * All texts, projects, experience and links of the website live here.
 * Edit this file to update the content — both languages (cs / en) side by side.
 *
 * Fill-in-later fields (keep `null` until you have the real value — the site hides them):
 *  - links.cvPdf       → path to the CV PDF, e.g. "/cv-vera-paukrtova.pdf" (put the file into /public);
 *                        the "Download CV" button appears only once this is set
 *  - project.github    → GitHub repository URL (the link appears only once set)
 *  - education.year    → e.g. "2016"
 */

export type Lang = "cs" | "en";

export const siteUrl = "https://verapaukrtova.cz";

export const links = {
  linkedin: "https://www.linkedin.com/in/vera-paukrtova/",
  email: "paukrtovavera@seznam.cz" as string | null,
  github: "https://github.com/Veve1211",
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
  /** Which problem it solves. */
  /** Optional: left out when it would repeat the summary. */
  problem?: string;
  /** Věra's role in the project. Optional: left out when not stated. */
  role?: string;
  /** Current state of the project. */
  /** Optional: left out when the status label says it all. */
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
  cvecko: { url: "https://cvecko.cz", github: null },
  "cesky-kral": { url: "https://cesky-kral.up.railway.app", github: null },
  kompleto: { url: null, github: null },
  paukrt: { url: "https://paukrt.lovable.app/", github: "https://github.com/Veve1211/transport-constellation-atlas" },
} satisfies Record<ProjectId, { url: string | null; github: string | null }>;

const highlights = ["Web Development", "AI-assisted Applications", "QA Testing", "Customer Experience"];

const cs = {
  meta: {
    title: "Věra Paukrtová – weby a\u00a0aplikace s\u00a0pomocí AI | QA a\u00a0zákaznická zkušenost",
    description:
      "Věra Paukrtová tvoří weby a\u00a0aplikace s\u00a0pomocí AI a\u00a0propojuje je s\u00a0praxí z\u00a0QA, UAT testování a\u00a0zákaznické zkušenosti. Projekty CVéčko a\u00a0Český král.",
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
    langSwitch: "Jazyk",
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
    highlights: ["Tvorba webů", "Aplikace s\u00a0pomocí AI", "Testování a\u00a0QA", "Zákaznická zkušenost"],
    seal: "Přemýšlím jako zákazník, hlídám kvalitu, tvořím s\u00a0AI.",
    proofLabel: "Praxe z",
    proofProjects: "2 živé aplikace · 1 koncept",
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
        state: "Hra je v\u00a0provozu a\u00a0zahrát si ji může kdokoli. Byla to moje první cesta od nápadu až k\u00a0živé aplikaci.",
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
        items: ["Návrh funkcionalit", "Psaní promptů", "vývoj s\u00a0pomocí AI", "Logika aplikací", "Iterace", "Nasazení na Railway"],
      },
      {
        index: "02",
        title: "Kvalita a\u00a0testování",
        text: "QA jsem dělala v\u00a0automobilovém průmyslu, UAT testování v\u00a0T-Mobile. Píšu testovací scénáře, hlásím chyby a\u00a0hledám jejich skutečné příčiny. Vlastní aplikace testuji v\u00a0Playwrightu.",
        items: ["QA", "UAT", "Funkční testování", "Testovací scénáře", "hlášení chyb", "analýza příčin", "Playwright"],
      },
      {
        index: "03",
        title: "Porozumění zákazníkům",
        text: "Z\u00a0Allegro, T-Mobile a\u00a0dalších firem vím, kde se lidé v\u00a0procesu zaseknou a\u00a0co je opravdu štve. Umím problém pojmenovat, zlepšit postup a\u00a0domluvit se se zákazníkem.",
        items: ["zákaznická zkušenost", "Uživatelské problémy", "Zlepšování procesů", "Komunikace se zákazníky", "Reklamace", "CRM"],
      },
    ],
    flow: ["Navrhnu", "Otestuji", "Ověřím očima uživatele"],
    summary:
      "Dohromady to znamená, že nápad dovedu do funkční podoby, otestuji ho a\u00a0ověřím, jestli dává smysl lidem, kteří ho budou používat.",
    principlesTitle: "Jak pracuji",
    principles: [
      "Důležitý je výsledek, i\u00a0když je nedokonalý – jinak je to nekončící proces.",
      "Pokud se to líbí mně jako perfekcionistce, je to už minimálně jeden člověk, kterému se to líbí.",
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
        tags: ["Mall.cz · Mall.sk · CZC", "Zákaznické procesy", "Reklamace", "Daktela", "Microsoft DAX"],
      },
      {
        company: "Ipsos",
        role: "Koordinátorka",
        period: "3/2025 – 11/2025",
        featured: false,
        summary:
          "Koordinovala jsem projekty sčítání dopravy a\u00a0byla oporou pro stovky terénních pracovníků. Dohromady šlo o\u00a0více než 7 000 segmentů.",
        transfer: "Přehled ve velkém objemu dat a\u00a0jasná komunikace s\u00a0mnoha lidmi najednou.",
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
        summary: "Spravovala jsem intranet pro pět zemí a\u00a0podporovala mezinárodní digitální procesy v\u00a0HR.",
        transfer: "Správa webového obsahu a\u00a0digitálních procesů tak, aby se v\u00a0nich vyznali lidé z\u00a0různých zemí.",
        tags: ["Intranet · 5 zemí", "Digitální procesy", "Mezinárodní tým"],
      },
      {
        company: "T-Mobile",
        role: "UAT testerka",
        period: "2/2021 – 12/2021",
        featured: true,
        summary:
          "Testovala jsem CRM a\u00a0webové aplikace, psala testovací scénáře a\u00a0hlásila chyby dřív, než se nová verze dostala k\u00a0zákazníkům.",
        transfer: "Testovací scénáře, UAT a\u00a0srozumitelné hlášení chyb — základ, na kterém stavím testování vlastních aplikací.",
        tags: ["UAT", "CRM", "Webové aplikace", "Testovací scénáře", "hlášení chyb"],
      },
      {
        company: "Megatech Industries",
        role: "QA inženýrka",
        period: "1/2017 – 9/2020",
        featured: true,
        summary:
          "Řídila jsem kvalitu pro Škodu, VW a\u00a0BMW, řešila reklamace a\u00a0hledala skutečné příčiny problémů — ne jen jejich projevy.",
        transfer: "Hledat příčinu, ne jen zalepit projev. Stejně přistupuji k\u00a0chybám v\u00a0aplikacích.",
        tags: ["Automobilový průmysl", "Řízení kvality", "Reklamace", "analýza příčin"],
      },
    ] satisfies Experience[],
  },
  education: {
    index: "04",
    label: "Vzdělání a\u00a0kurzy",
    title: ["Vzdělání", "a\u00a0kurzy."],
    items: [
      { provider: "University College Prague", title: "Destination Management", type: "Bakalářský titul", year: null },
      { provider: "University of Michigan", title: "Web Design for Everybody", type: "Online kurz", year: null },
      { provider: "PrimaKurzy", title: "Vývoj webových aplikací", type: "Kurz", year: null },
      { provider: "Coursera", title: "Crash Course on Python", type: "Online kurz", year: null },
    ] satisfies Education[],
  },
  contact: {
    index: "05",
    label: "Kontakt a\u00a0spolupráce",
    title: ["Máte nápad na web", "nebo digitální aplikaci?"],
    text: "Ráda se zapojím do tvorby webových stránek, aplikací s\u00a0pomocí AI nebo projektů, kde mohu propojit vývoj, testování a\u00a0zákaznickou zkušenost. Jsem otevřená projektové spolupráci i\u00a0příležitostem v\u00a0digitálních týmech.",
    areasTitle: "Kde se ráda zapojím",
    areas: ["Aplikace s\u00a0pomocí AI", "Testování a\u00a0QA", "Tvorba webových stránek", "Zákaznická zkušenost"],
    emailCta: "Napište mi e-mail",
  },
  footer: {
    note: "Navrženo a\u00a0postaveno s\u00a0AI — stejně jako moje aplikace.",
  },
};

export type SiteContent = typeof cs;

const en: SiteContent = {
  meta: {
    title: "Věra Paukrtová — AI-assisted Web Developer | QA & Customer Experience",
    description:
      "Věra Paukrtová builds websites and AI-assisted apps, backed by hands-on experience in QA, UAT testing and customer experience. Projects: CVéčko and Český král.",
  },
  skipLink: "Skip to content",
  nav: [
    { id: "projekty", label: "Projects" },
    { id: "pristup", label: "What I bring" },
    { id: "zkusenosti", label: "Experience" },
    { id: "vzdelani", label: "Education" },
    { id: "kontakt", label: "Contact" },
  ],
  ui: {
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitch: "Language / Jazyk",
    downloadCv: "Download CV",
    github: "Code on GitHub",
    whatItDoes: "What the app does",
    problem: "The problem it solves",
    role: "My role",
    state: "Current status",
    tech: "Technology",
    current: "Current",
    transfer: "What I use from it in digital products",
    moreExperience: "More experience",
    backToTop: "Back to top",
    newTab: "(opens in a new tab)",
    portraitAlt: "Portrait of Věra Paukrtová",
    desktopView: "desktop view",
    mobileView: "mobile view",
    conceptIllustration: "Concept illustration — not a screenshot of an app",
  },
  hero: {
    name: "Věra Paukrtová",
    role: "AI-assisted Web Developer | QA & Customer Experience",
    title: ["I build websites and AI-assisted apps", "that make sense to people."],
    intro:
      "I combine building digital products with hands-on experience in customer support and QA. That's why I think not only about how to build an app, but above all about how it will work for real users.",
    ctaProjects: "See my projects",
    ctaContact: "Get in touch",
    highlightsLabel: "Focus",
    highlights,
    seal: "I think like a customer, guard quality, build with AI.",
    proofLabel: "Experience at",
    proofProjects: "2 live apps · 1 concept",
  },
  projects: {
    index: "01",
    label: "Projects",
    upcomingTitle: "In the works",
    title: ["Apps you can", "try for yourself."],
    intro:
      "I write the prompts, design the logic, test with Playwright and deploy on Railway. What I love most is the very beginning, when an idea turns into something real — and then the gradual fine-tuning until it's exactly what I want.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "CV builder web app",
        status: "live",
        statusLabel: "Live app",
        summary:
          "You write a few sentences about yourself and AI turns them into a clear CV — no forms to fill in, with the result as an A4 PDF. I built it because the usual CV builders didn't work for me, and I wanted my own that looks and works exactly the way I want.",
        role: "Idea, feature and user-flow design, AI-assisted development through prompts, testing and deployment.",
        state:
          "The app is live. Next, I want to extend it to the whole job-search journey — with people living with multiple sclerosis in mind too.",
        tech: ["Next.js", "Railway", "GitHub", "AI-assisted development"],
        urlLabel: "Open cvecko.cz",
        ...projectMeta.cvecko,
      },
      {
        id: "cesky-kral",
        name: "Český král",
        kind: "Interactive educational web game",
        status: "live",
        statusLabel: "Live app",
        summary:
          "Players answer questions about Czech rulers and collect them as cards. The game has a daily challenge, quick quizzes, a leaderboard and a personal coat of arms.",
        problem:
          "Czech history has always fascinated me, and it still does. I wanted pupils and students to find their way to it naturally — through play, not memorising.",
        role: "My very first app: game logic design, prompts for the AI, testing with Playwright and deployment on Railway.",
        state: "The game is live and anyone can play it. It was my first journey from an idea all the way to a live app.",
        tech: ["Next.js", "Railway", "Playwright", "AI-assisted development"],
        urlLabel: "Play Český král",
        ...projectMeta["cesky-kral"],
      },
      {
        id: "kompleto",
        name: "Kompleto",
        kind: "Platform concept",
        status: "concept",
        statusLabel: "In development",
        summary:
          "An upcoming platform concept that would bring job offers from different sources together in one place. Today they are scattered across many portals, and searching means going through the same websites over and over.",
        role: "Idea and concept design — what the platform should do and how people would use it.",
        tech: [],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
      {
        id: "paukrt",
        name: "Transport engineer's professional website",
        kind: "Personal professional website",
        status: "live",
        statusLabel: "Live website",
        summary:
          "A personal presentation and CV of an engineer who designs roads and junctions. A bilingual website (EN/CZ) with a blue look inspired by a transport model.",
        tech: ["Lovable", "React", "GitHub"],
        urlLabel: "View the website",
        ...projectMeta.paukrt,
      },
    ] satisfies Project[],
  },
  approach: {
    index: "02",
    label: "What I bring to projects",
    title: ["One approach,", "three perspectives."],
    intro:
      "I can put myself in the customer's shoes instantly. I look at a website the way someone who's already annoyed would — and I catch UX and functional bugs before they reach real people. I'm not a senior developer and I don't pretend to be. I decide what an app should do and why, guide the AI through development, test and deploy.",
    pillars: [
      {
        index: "01",
        title: "Building digital products",
        text: "From the idea through feature and logic design to deployment. I build web apps with AI tools and refine them in iterations until they work the way they should.",
        items: ["Feature design", "Prompt writing", "AI-assisted development", "App logic", "Iteration", "Deployment on Railway"],
      },
      {
        index: "02",
        title: "Quality & testing",
        text: "I did QA in automotive and UAT testing at T-Mobile. I write test scenarios, report bugs and look for their real root causes. I test my own apps with Playwright.",
        items: ["QA", "UAT", "Functional testing", "Test scenarios", "Bug reporting", "Root cause analysis", "Playwright"],
      },
      {
        index: "03",
        title: "Understanding customers",
        text: "At Allegro, T-Mobile and other companies I learned where people get stuck in a process and what really frustrates them. I can name the problem, improve the flow and talk it through with the customer.",
        items: ["Customer experience", "User problems", "Process improvement", "Customer communication", "Complaints", "CRM"],
      },
    ],
    flow: ["I design it", "I test it", "I check it through users' eyes"],
    summary:
      "Put together, it means I can take an idea to a working product, test it and check that it makes sense to the people who will use it.",
    principlesTitle: "How I work",
    principles: [
      "What matters is the result, even an imperfect one — otherwise it's a never-ending process.",
      "If I like it as a perfectionist, that's already at least one person who likes it.",
    ],
    principlesAuthor: "— Věra Paukrtová",
    learningTitle: "Where I'm still learning",
    learning: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Python basics"],
  },
  experience: {
    index: "03",
    label: "Experience",
    title: ["Experience that taught me", "to think about users."],
    intro:
      "I didn't develop software in these roles. But they taught me to test, to look for the root cause of problems and to see a process through the customer's eyes — and I bring that to every project today.",
    items: [
      {
        company: "Allegro Group",
        role: "Marketplace Support Specialist",
        period: "11/2025 – present",
        current: true,
        featured: true,
        summary:
          "I support sellers on Mall.cz, Mall.sk and CZC — from complaints to the logic behind order cancellations. I work in Daktela and Microsoft DAX.",
        transfer:
          "Every day I see where people get lost in a process, and why. It teaches me to design flows and interfaces that stay out of users' way.",
        tags: ["Mall.cz · Mall.sk · CZC", "Customer processes", "Complaints", "Daktela", "Microsoft DAX"],
      },
      {
        company: "Ipsos",
        role: "Coordinator",
        period: "3/2025 – 11/2025",
        featured: false,
        summary:
          "I coordinated traffic-count projects and was the go-to support for hundreds of field workers — over 7,000 segments in total.",
        transfer: "Keeping an overview of large amounts of data and communicating clearly with many people at once.",
        tags: ["Traffic counts", "Hundreds of field workers", "7,000+ segments"],
      },
      {
        company: "Sigma AI",
        role: "Transcriptor",
        period: "1/2024 – 12/2024",
        featured: false,
        summary: "I transcribed audio data and checked its quality.",
        transfer: "Care and quality control of data where every detail matters.",
        tags: ["Audio transcription", "Quality control", "Data work"],
      },
      {
        company: "Zentiva",
        role: "Digital HR Support / Webmaster",
        period: "1/2022 – 12/2022",
        featured: true,
        summary: "I managed the intranet for five countries and supported international digital HR processes.",
        transfer: "Managing web content and digital processes so that people from different countries can find their way around.",
        tags: ["Intranet · 5 countries", "Digital processes", "International team"],
      },
      {
        company: "T-Mobile",
        role: "UAT Tester",
        period: "2/2021 – 12/2021",
        featured: true,
        summary:
          "I tested CRM and web applications, wrote test scenarios and reported bugs before a release reached customers.",
        transfer: "Test scenarios, UAT and clear bug reports — the foundation I build on when testing my own apps.",
        tags: ["UAT", "CRM", "Web applications", "Test scenarios", "Bug reporting"],
      },
      {
        company: "Megatech Industries",
        role: "QA Engineer",
        period: "1/2017 – 9/2020",
        featured: true,
        summary:
          "I managed quality for Škoda, VW and BMW, handled complaints and looked for the real root causes of problems — not just their symptoms.",
        transfer: "Find the cause, don't just patch the symptom. I approach bugs in apps the same way.",
        tags: ["Automotive", "Quality management", "Complaints", "Root cause analysis"],
      },
    ] satisfies Experience[],
  },
  education: {
    index: "04",
    label: "Education & courses",
    title: ["Education", "and courses."],
    items: [
      { provider: "University College Prague", title: "Destination Management", type: "Bachelor's degree", year: null },
      { provider: "University of Michigan", title: "Web Design for Everybody", type: "Online course", year: null },
      { provider: "PrimaKurzy", title: "Web Application Development", type: "Course", year: null },
      { provider: "Coursera", title: "Crash Course on Python", type: "Online course", year: null },
    ] satisfies Education[],
  },
  contact: {
    index: "05",
    label: "Contact & collaboration",
    title: ["Have an idea for a website", "or a digital app?"],
    text: "I'd love to get involved in building websites, AI-assisted apps or projects where I can combine development, testing and customer experience. I'm open to project collaboration as well as opportunities in digital teams.",
    areasTitle: "Where I'd love to help",
    areas: ["AI-assisted apps", "Testing & QA", "Building websites", "Customer experience"],
    emailCta: "Email me",
  },
  footer: {
    note: "Designed and built with AI — just like my apps.",
  },
};

export const content: Record<Lang, SiteContent> = { cs, en };
