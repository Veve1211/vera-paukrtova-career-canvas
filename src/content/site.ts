/**
 * All texts, projects, experience and links of the website live here.
 * Edit this file to update the content — both languages (cs / en) side by side.
 *
 * Fill-in-later fields (keep `null` until you have the real value — the site hides them):
 *  - links.email       → your e-mail address
 *  - links.cvPdf       → path to the CV PDF, e.g. "/cv-vera-paukrtova.pdf" (put the file into /public)
 *  - project.github    → GitHub repository URL
 *  - experience.period → e.g. "2021 – 2023"
 *  - education.year    → e.g. "2016"
 */

export type Lang = "cs" | "en";

export const links = {
  linkedin: "https://www.linkedin.com/in/vera-paukrtova/",
  email: null as string | null,
  cvPdf: null as string | null,
};

export type ProjectId = "cvecko" | "cesky-kral" | "kompleto";

export type Project = {
  id: ProjectId;
  name: string;
  kind: string;
  status: "live" | "concept";
  statusLabel: string;
  summary: string;
  problem: string;
  details: string;
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
  summary: string;
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
} satisfies Record<ProjectId, { url: string | null; github: string | null }>;

const cs = {
  meta: {
    title: "Věra Paukrtová — Customer Operations & QA | Digitální produkty s AI",
    description:
      "Osobní web a interaktivní CV Věry Paukrtové. Zákaznické procesy, QA a UAT testování, vlastní webové aplikace vytvářené s pomocí AI.",
  },
  skipLink: "Přeskočit na obsah",
  nav: [
    { id: "o-mne", label: "O mně" },
    { id: "projekty", label: "Projekty" },
    { id: "zkusenosti", label: "Zkušenosti" },
    { id: "dovednosti", label: "Dovednosti" },
    { id: "vzdelani", label: "Vzdělání" },
    { id: "kontakt", label: "Kontakt" },
  ],
  ui: {
    menuOpen: "Otevřít menu",
    menuClose: "Zavřít menu",
    langSwitch: "Switch to English",
    downloadCv: "Stáhnout CV",
    cvSoon: "CV ke stažení brzy",
    github: "GitHub",
    githubSoon: "GitHub repozitář brzy",
    problem: "Řešený problém",
    tech: "Technologie a přístup",
    current: "Aktuálně",
    backToTop: "Zpět nahoru",
    newTab: "(otevře se v novém okně)",
    portraitNote: "Místo pro portrét",
  },
  hero: {
    eyebrow: "Customer Operations & QA Specialist",
    eyebrowSecond: "Building Digital Products with AI",
    name: ["Věra", "Paukrtová"],
    tagline: "People. Technology. Better Solutions.",
    intro:
      "Propojuji zkušenosti ze zákaznických procesů, kvality a testování s moderními digitálními technologiemi. Vyvíjím vlastní webové projekty s využitím AI a hledám příležitosti, kde mohu spojit analytické myšlení, kreativitu a praktická řešení.",
    ctaProjects: "Prohlédnout projekty",
    ctaExperience: "Moje zkušenosti",
    ctaLinkedin: "LinkedIn",
    proofLabel: "Zkušenosti z",
    proofProjects: "2 živé aplikace · 1 ve vývoji",
  },
  focus: {
    title: "Profesní zaměření",
    items: [
      "AI-assisted Web Development & Vibe Coding",
      "Junior Web Development",
      "QA / UAT Testing",
      "AI Automation & Digital Workflows",
      "Customer Operations & IT Support",
    ],
  },
  about: {
    index: "01",
    label: "O mně",
    title: ["Mezi lidmi, procesy", "a technologiemi."],
    paragraphs: [
      "Moje kariéra nezačala v kódu, ale u lidí a procesů. Léta pracuji tam, kde se potkávají zákazníci, systémy a kvalita — od podpory prodejců na marketplace Allegro přes UAT testování CRM a webových aplikací v T-Mobile až po řízení kvality ve výrobě.",
      "Díky tomu vím, jak software vypadá z druhé strany: kde se uživatel zasekne, kde proces drhne a proč je přesně popsaná chyba polovinou opravy. Tuhle zkušenost dnes přenáším do vlastních projektů. Aplikace navrhuji, stavím s pomocí AI, testuji a nasazuji — a s každou se posouvám v HTML, CSS, JavaScriptu i práci s Gitem.",
      "Nepředstírám, že jsem seniorní programátorka. Jsem člověk, který umí problém rozebrat, věci dotáhnout do konce a s AI jako pracovním nástrojem udělat z nápadu funkční produkt.",
    ],
    strengthsTitle: "Na čem stavím",
    strengths: [
      { title: "Analytické myšlení", text: "Problém nejdřív rozložím na části, teprve pak hledám řešení." },
      { title: "Preciznost a odpovědnost", text: "Z kvality a testování vím, že detail rozhoduje. Věci dotahuji." },
      { title: "Komunikace a řešení problémů", text: "Technickou věc umím vysvětlit srozumitelně a vyslechnout druhou stranu." },
      { title: "Testování systémů", text: "Testovací scénáře, evidence chyb a UAT v reálných projektech." },
      { title: "Samostatnost", text: "Vlastní projekty vedu od nápadu přes testování až po nasazení." },
      { title: "AI v praxi", text: "AI používám jako pracovní nástroj při návrhu, vývoji i ladění aplikací." },
      { title: "Zájem o technologie", text: "Dlouhodobě mě baví hledat, jak procesy zjednodušit a zlepšit." },
    ],
  },
  projects: {
    index: "02",
    label: "Selected Projects",
    title: ["Vlastní projekty,", "které si můžete vyzkoušet."],
    intro: "Každý projekt navrhuji, vyvíjím s pomocí AI, testuji a nasazuji sama.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "Webová aplikace",
        status: "live",
        statusLabel: "Živá aplikace",
        summary: "Vlastní webová aplikace pro tvorbu profesionálních životopisů.",
        problem:
          "Sestavit přehledný a strukturovaný životopis bývá zdlouhavé. Cílem byl nástroj, který uživatelům tvorbu CV co nejvíc usnadní.",
        details:
          "Návrh a tvorba nástroje, který uživatelům usnadňuje vytváření strukturovaného CV — stačí o sobě napsat pár vět.",
        tech: ["AI-assisted development", "Webové technologie", "GitHub", "Railway"],
        urlLabel: "Otevřít cvecko.cz",
        ...projectMeta.cvecko,
      },
      {
        id: "cesky-kral",
        name: "Český král",
        kind: "Interaktivní webová hra",
        status: "live",
        statusLabel: "Živá aplikace",
        summary: "Interaktivní webová hra o českých panovnících s výběrem postav.",
        problem:
          "Jak přiblížit českou historii hravě — místo memorování odpovídat na otázky, sbírat karty panovníků a objevovat jejich příběhy.",
        details:
          "Samostatný kreativní projekt propojující logiku, interaktivitu a vývoj s pomocí AI.",
        tech: ["AI-assisted development", "GitHub", "Playwright", "Railway"],
        urlLabel: "Zahrát si Českého krále",
        ...projectMeta["cesky-kral"],
      },
      {
        id: "kompleto",
        name: "Kompleto",
        kind: "Koncept platformy",
        status: "concept",
        statusLabel: "Ve vývoji / koncept",
        summary: "Koncept platformy sdružující pracovní nabídky z různých zdrojů na jednom místě.",
        problem:
          "Pracovní nabídky jsou roztříštěné po mnoha portálech a hledání znamená procházet stále dokola různé weby.",
        details: "Projekt je ve fázi konceptu a návrhu. Technologie upřesním s postupem vývoje.",
        tech: ["Koncept", "UX návrh", "AI-assisted development"],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
    ] satisfies Project[],
  },
  experience: {
    index: "03",
    label: "Pracovní zkušenosti",
    title: ["Praxe, ze které", "vychází každý projekt."],
    intro: "Zákaznické procesy, testování a kvalita v mezinárodních firmách.",
    items: [
      {
        company: "Allegro",
        role: "Marketplace Support Specialist",
        period: null,
        current: true,
        summary:
          "Podpora marketplace prodejců, práce s interními systémy, zákaznické procesy a řešení složitých případů.",
        tags: ["Marketplace", "Interní systémy", "Řešení případů"],
      },
      {
        company: "T-Mobile",
        role: "UAT Tester",
        period: null,
        summary: "Testování CRM a webových aplikací, tvorba testovacích scénářů a evidence chyb.",
        tags: ["UAT", "CRM", "Bug reporting"],
      },
      {
        company: "Zentiva",
        role: "Digital HR Support / Webmaster",
        period: null,
        summary:
          "Správa intranetového obsahu, podpora digitálních procesů a mezinárodní komunikace.",
        tags: ["Intranet", "Digitální procesy", "Mezinárodní tým"],
      },
      {
        company: "Ipsos",
        role: "Coordinator",
        period: null,
        summary: "Koordinace terénních projektů, organizace dat a komunikace.",
        tags: ["Koordinace", "Data", "Komunikace"],
      },
      {
        company: "Megatech Industries",
        role: "QA Engineer",
        period: null,
        summary: "Řízení kvality, dokumentace, reklamace a komunikace s výrobou.",
        tags: ["Řízení kvality", "Dokumentace", "Reklamace"],
      },
    ] satisfies Experience[],
  },
  skills: {
    index: "04",
    label: "Dovednosti",
    title: ["Co do týmu", "přináším."],
    intro: "Bez nafouknutých úrovní — jen to, s čím skutečně pracuji.",
    groups: [
      {
        title: "AI & Digital Creation",
        items: ["AI-assisted development", "Vibe coding", "Webové projekty", "Automatizace pracovních postupů"],
      },
      {
        title: "Testing & Quality",
        items: ["UAT testing", "QA", "Testovací scénáře", "Bug reporting", "Kontrola kvality"],
      },
      {
        title: "Customer & Digital Operations",
        items: ["Marketplace support", "Daktela", "Microsoft DAX", "CRM", "Komunikace", "Řešení problémů"],
      },
      {
        title: "Web Development",
        note: "Rozvíjím",
        items: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Základy Pythonu"],
      },
    ],
  },
  education: {
    index: "05",
    label: "Vzdělání a certifikace",
    title: ["Vzdělání", "a kurzy."],
    items: [
      { provider: "University College Prague", title: "Destination Management", type: "Bakalářský titul", year: null },
      { provider: "University of Michigan", title: "Web Design for Everybody", type: "Online kurz", year: null },
      { provider: "PrimaKurzy", title: "Vývoj webových aplikací", type: "Kurz", year: null },
      { provider: "Coursera", title: "Crash Course on Python", type: "Online kurz", year: null },
    ] satisfies Education[],
  },
  contact: {
    index: "06",
    label: "Kontakt a příležitosti",
    title: "Let's create something meaningful.",
    text: "Ráda se spojím s týmy a lidmi, kteří hledají kombinaci technického uvažování, důslednosti a lidského přístupu.",
    areasTitle: "Oblasti spolupráce",
    areas: ["Junior IT / Web Development", "QA & UAT Testing", "AI-assisted Projects", "Customer & Digital Operations"],
    linkedinCta: "Napište mi na LinkedIn",
    emailCta: "Napsat e-mail",
    noEmail: "Nejrychleji mě zastihnete přes LinkedIn.",
  },
  footer: {
    note: "Navrženo a vytvořeno s pomocí AI.",
  },
};

export type SiteContent = typeof cs;

const en: SiteContent = {
  meta: {
    title: "Věra Paukrtová — Customer Operations & QA | Building Digital Products with AI",
    description:
      "Personal website and interactive CV of Věra Paukrtová. Customer operations, QA and UAT testing, and her own web apps built with AI.",
  },
  skipLink: "Skip to content",
  nav: [
    { id: "o-mne", label: "About" },
    { id: "projekty", label: "Projects" },
    { id: "zkusenosti", label: "Experience" },
    { id: "dovednosti", label: "Skills" },
    { id: "vzdelani", label: "Education" },
    { id: "kontakt", label: "Contact" },
  ],
  ui: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitch: "Přepnout do češtiny",
    downloadCv: "Download CV",
    cvSoon: "CV download coming soon",
    github: "GitHub",
    githubSoon: "GitHub repository coming soon",
    problem: "The problem",
    tech: "Technology & approach",
    current: "Current",
    backToTop: "Back to top",
    newTab: "(opens in a new tab)",
    portraitNote: "Portrait coming soon",
  },
  hero: {
    eyebrow: "Customer Operations & QA Specialist",
    eyebrowSecond: "Building Digital Products with AI",
    name: ["Věra", "Paukrtová"],
    tagline: "People. Technology. Better Solutions.",
    intro:
      "I connect experience from customer operations, quality and testing with modern digital technology. I build my own web projects with AI and I'm looking for opportunities where analytical thinking, creativity and practical solutions come together.",
    ctaProjects: "View projects",
    ctaExperience: "My experience",
    ctaLinkedin: "LinkedIn",
    proofLabel: "Experience at",
    proofProjects: "2 live apps · 1 in development",
  },
  focus: {
    title: "Professional focus",
    items: cs.focus.items,
  },
  about: {
    index: "01",
    label: "About",
    title: ["Between people,", "processes and technology."],
    paragraphs: [
      "My career didn't start in code — it started with people and processes. For years I've worked where customers, systems and quality meet: from supporting sellers on the Allegro marketplace, through UAT testing of CRM and web applications at T-Mobile, to quality management in manufacturing.",
      "That's why I know what software looks like from the other side: where users get stuck, where a process grinds, and why a precisely described bug is half of the fix. Today I bring that experience into my own projects. I design applications, build them with AI, test and deploy them — and each one moves me forward in HTML, CSS, JavaScript and working with Git.",
      "I don't pretend to be a senior developer. I'm someone who can break a problem down, see things through, and — with AI as a working tool — turn an idea into a working product.",
    ],
    strengthsTitle: "What I build on",
    strengths: [
      { title: "Analytical thinking", text: "I break a problem into parts first, and only then look for a solution." },
      { title: "Precision & ownership", text: "Quality and testing taught me that details decide. I follow through." },
      { title: "Communication & problem solving", text: "I explain technical matters clearly and listen to the other side." },
      { title: "Systems testing", text: "Test scenarios, defect tracking and UAT on real projects." },
      { title: "Independence", text: "I take my own projects from idea through testing to deployment." },
      { title: "AI in practice", text: "I use AI as a working tool for designing, building and debugging apps." },
      { title: "Passion for technology", text: "I've long enjoyed finding ways to simplify and improve processes." },
    ],
  },
  projects: {
    index: "02",
    label: "Selected Projects",
    title: ["Projects of my own", "you can try yourself."],
    intro: "I design, build with AI, test and deploy every project myself.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "Web application",
        status: "live",
        statusLabel: "Live app",
        summary: "My own web application for creating professional CVs.",
        problem:
          "Putting together a clear, well-structured CV takes time. The goal was a tool that makes creating a CV as easy as possible.",
        details:
          "Designing and building a tool that helps people create a structured CV — all it takes is a few sentences about yourself.",
        tech: ["AI-assisted development", "Web technologies", "GitHub", "Railway"],
        urlLabel: "Open cvecko.cz",
        ...projectMeta.cvecko,
      },
      {
        id: "cesky-kral",
        name: "Český král",
        kind: "Interactive web game",
        status: "live",
        statusLabel: "Live app",
        summary: "An interactive web game about Czech rulers with character selection.",
        problem:
          "How to bring Czech history closer in a playful way — answering questions, collecting ruler cards and discovering their stories instead of memorising.",
        details: "An independent creative project combining logic, interactivity and AI-assisted development.",
        tech: ["AI-assisted development", "GitHub", "Playwright", "Railway"],
        urlLabel: "Play Český král",
        ...projectMeta["cesky-kral"],
      },
      {
        id: "kompleto",
        name: "Kompleto",
        kind: "Platform concept",
        status: "concept",
        statusLabel: "In development / Concept",
        summary: "A platform concept bringing job offers from different sources into one place.",
        problem:
          "Job offers are scattered across many portals, and searching means going through the same websites over and over.",
        details: "The project is in the concept and design phase. The technology will be defined as development progresses.",
        tech: ["Concept", "UX design", "AI-assisted development"],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
    ] satisfies Project[],
  },
  experience: {
    index: "03",
    label: "Experience",
    title: ["The practice behind", "every project."],
    intro: "Customer operations, testing and quality in international companies.",
    items: [
      {
        company: "Allegro",
        role: "Marketplace Support Specialist",
        period: null,
        current: true,
        summary:
          "Supporting marketplace sellers, working with internal systems, customer processes and resolving complex cases.",
        tags: ["Marketplace", "Internal systems", "Case resolution"],
      },
      {
        company: "T-Mobile",
        role: "UAT Tester",
        period: null,
        summary: "Testing CRM and web applications, writing test scenarios and tracking defects.",
        tags: ["UAT", "CRM", "Bug reporting"],
      },
      {
        company: "Zentiva",
        role: "Digital HR Support / Webmaster",
        period: null,
        summary: "Managing intranet content, supporting digital processes and international communication.",
        tags: ["Intranet", "Digital processes", "International team"],
      },
      {
        company: "Ipsos",
        role: "Coordinator",
        period: null,
        summary: "Coordinating field projects, organising data and communication.",
        tags: ["Coordination", "Data", "Communication"],
      },
      {
        company: "Megatech Industries",
        role: "QA Engineer",
        period: null,
        summary: "Quality management, documentation, complaints handling and communication with production.",
        tags: ["Quality management", "Documentation", "Complaints"],
      },
    ] satisfies Experience[],
  },
  skills: {
    index: "04",
    label: "Skills",
    title: ["What I bring", "to a team."],
    intro: "No inflated levels — just what I actually work with.",
    groups: [
      {
        title: "AI & Digital Creation",
        items: ["AI-assisted development", "Vibe coding", "Web projects", "Workflow automation"],
      },
      {
        title: "Testing & Quality",
        items: ["UAT testing", "QA", "Test scenarios", "Bug reporting", "Quality control"],
      },
      {
        title: "Customer & Digital Operations",
        items: ["Marketplace support", "Daktela", "Microsoft DAX", "CRM", "Communication", "Problem solving"],
      },
      {
        title: "Web Development",
        note: "Developing skills",
        items: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Python basics"],
      },
    ],
  },
  education: {
    index: "05",
    label: "Education & certificates",
    title: ["Education", "and courses."],
    items: [
      { provider: "University College Prague", title: "Destination Management", type: "Bachelor's degree", year: null },
      { provider: "University of Michigan", title: "Web Design for Everybody", type: "Online course", year: null },
      { provider: "PrimaKurzy", title: "Web Application Development", type: "Course", year: null },
      { provider: "Coursera", title: "Crash Course on Python", type: "Online course", year: null },
    ] satisfies Education[],
  },
  contact: {
    index: "06",
    label: "Contact & opportunities",
    title: "Let's create something meaningful.",
    text: "I'd love to connect with teams and people looking for a combination of technical thinking, diligence and a human approach.",
    areasTitle: "Areas of collaboration",
    areas: cs.contact.areas,
    linkedinCta: "Message me on LinkedIn",
    emailCta: "Send an e-mail",
    noEmail: "The fastest way to reach me is LinkedIn.",
  },
  footer: {
    note: "Designed and built with AI.",
  },
};

export const content: Record<Lang, SiteContent> = { cs, en };
