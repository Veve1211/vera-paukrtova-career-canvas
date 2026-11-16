/**
 * All texts, projects, experience and links of the website live here.
 * Edit this file to update the content — both languages (cs / en) side by side.
 *
 * Fill-in-later fields (keep `null` until you have the real value — the site hides them):
 *  - links.email       → your e-mail address
 *  - links.cvPdf       → path to the CV PDF, e.g. "/cv-vera-paukrtova.pdf" (put the file into /public)
 *  - project.github    → GitHub repository URL
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
    title: "Věra Paukrtová — zákaznické procesy, QA a aplikace tvořené s AI",
    description:
      "Věra Paukrtová: vidí web očima zákazníka, hlídá kvalitu a s pomocí AI staví vlastní aplikace. Zkušenosti z Allegro Group, Ipsos, Zentivy, T-Mobile a automotive QA.",
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
    problem: "Proč vznikl",
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
    tagline: "Přemýšlím jako zákazník, hlídám kvalitu, tvořím s AI.",
    intro:
      "Roky pracuji tam, kde se potkávají zákazníci, systémy a kvalita — od řízení kvality pro automotive přes testování v T-Mobile až po podporu prodejců v Allegro Group. Stejný pohled dnes dávám do vlastních aplikací, které tvořím s AI: vím, kde se uživatel zasekne, a chci to vyřešit dřív, než se to stane.",
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
    title: ["Vidím web", "očima zákazníka."],
    paragraphs: [
      "Moje největší síla je jednoduchá: dokážu se okamžitě vžít do zákazníka. Podívám se na web očima člověka, kterého už něco naštvalo — a UX i funkční chyby najdu dřív, než narazí na skutečné lidi.",
      "Naučila mě to praxe. Ve výrobě jsem pro Škodu, VW a BMW hledala skutečné příčiny reklamací, v T-Mobile jsem testovala aplikace před vydáním a dnes v Allegro Group každý den řeším, co prodejce opravdu trápí. Každá z těch rolí mě učila totéž: dívat se na věci z druhé strany.",
      "Tenhle pohled teď přenáším do vlastních aplikací, které tvořím s AI. Nejsem seniorní programátorka a nepředstírám to. Umím ale z nápadu udělat něco, co funguje a co si můžete sami vyzkoušet.",
    ],
    strengthsTitle: "Jak pracuji",
    strengths: [
      {
        title: "Oči naštvaného uživatele",
        text: "Web proklikám tak, jak by ho proklikal někdo, kdo spěchá a nemá trpělivost. Tam se chyby ukážou nejdřív.",
      },
      {
        title: "Výsledek před dokonalostí",
        text: "„Důležitý je výsledek, i když je nedokonalý — jinak je to nekončící proces.“",
      },
      {
        title: "Perfekcionistka jako první uživatelka",
        text: "„Pokud se to líbí mně jako perfekcionistce, je to už minimálně jeden člověk, kterému se to líbí.“",
      },
      {
        title: "Od nápadu po nasazení",
        text: "Píšu prompty, navrhuji logiku, řídím nasazení na Railway a testuji v Playwrightu.",
      },
      {
        title: "Na druhé straně je vždycky člověk",
        text: "Prodejce, terénní pracovník nebo kolega v jiné zemi — každý potřebuje, aby věci prostě fungovaly.",
      },
    ],
  },
  projects: {
    index: "02",
    label: "Selected Projects",
    title: ["Vlastní projekty,", "které si můžete vyzkoušet."],
    intro:
      "Píšu prompty, navrhuji logiku, nasazuji na Railway a testuji v Playwrightu. Nejvíc mě baví začátek, kdy se z myšlenky stává něco skutečného — a pak postupné dolaďování, dokud to není přesně takové, jaké to chci mít.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "Webová aplikace",
        status: "live",
        statusLabel: "Živá aplikace",
        summary: "Nástroj na životopisy, který jsem si postavila sama pro sebe — přesně podle svých představ.",
        problem:
          "Běžné nástroje na tvorbu CV mi v jedné konkrétní věci prostě nefungovaly. Místo dalšího kompromisu jsem si postavila vlastní, který vypadá i funguje tak, jak potřebuji.",
        details:
          "CVéčko je pro mě začátek. Do budoucna se chci věnovat celému hledání práce — a myslet přitom i na lidi s roztroušenou sklerózou, aby z toho měli užitek i oni.",
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
        summary: "Moje úplně první aplikace — webová hra o českých panovnících.",
        problem:
          "Česká historie mě bavila a pořád baví. Chtěla jsem, aby si k ní žáci a studenti našli cestu přirozeně — hrou místo memorování: odpovídají na otázky, sbírají karty panovníků a objevují jejich příběhy.",
        details:
          "Na Českém králi jsem si poprvé prošla celou cestu od nápadu až k živé aplikaci, kterou si může zahrát kdokoli.",
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
        summary: "Pracovní nabídky z různých zdrojů na jednom místě.",
        problem:
          "Nabídky práce jsou rozházené po mnoha portálech a hledání znamená procházet pořád dokola stejné weby. Kompleto navazuje na CVéčko — obojí se točí kolem hledání práce.",
        details: "Projekt je zatím ve fázi konceptu a návrhu. Technologie upřesním, až se vývoj pohne dál.",
        tech: ["Koncept", "UX návrh", "AI-assisted development"],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
    ] satisfies Project[],
  },
  experience: {
    index: "03",
    label: "Pracovní zkušenosti",
    title: ["Kde jsem se", "to naučila."],
    intro: "Šest míst, jedna nit: vždycky jsem stála mezi lidmi a systémy a hlídala, aby věci fungovaly.",
    items: [
      {
        company: "Allegro Group",
        role: "Marketplace Support Specialist",
        period: "11/2025 – současnost",
        current: true,
        summary:
          "Pomáhám prodejcům na Mall.cz, Mall.sk a CZC — od reklamací až po logiku rušení objednávek. Pracuji v Daktele a Microsoft DAX a tři měsíce po sobě jsem si udržela 100% NPS skóre.",
        tags: ["Mall.cz · Mall.sk · CZC", "Reklamace", "Daktela", "Microsoft DAX", "100% NPS · 3 měsíce v řadě"],
      },
      {
        company: "Ipsos",
        role: "Coordinator",
        period: "3/2025 – 11/2025",
        summary:
          "Koordinovala jsem projekty sčítání dopravy a byla oporou pro stovky terénních pracovníků. Dohromady šlo o více než 7 000 segmentů.",
        tags: ["Sčítání dopravy", "Stovky terénních pracovníků", "7 000+ segmentů"],
      },
      {
        company: "Sigma AI",
        role: "Transcriptor",
        period: "1/2024 – 12/2024",
        summary: "Přepisovala jsem audio data a kontrolovala jejich kvalitu — práce, ve které rozhoduje každé slovo.",
        tags: ["Přepis audia", "Kontrola kvality", "Práce s daty"],
      },
      {
        company: "Zentiva",
        role: "Digital HR Support / Webmaster",
        period: "1/2022 – 12/2022",
        summary: "Spravovala jsem intranet pro pět zemí a podporovala mezinárodní digitální procesy v HR.",
        tags: ["Intranet · 5 zemí", "Digitální HR", "Mezinárodní tým"],
      },
      {
        company: "T-Mobile",
        role: "UAT Tester",
        period: "2/2021 – 12/2021",
        summary:
          "Testovala jsem CRM a webové aplikace, psala testovací scénáře a hlásila chyby dřív, než se release dostal k zákazníkům.",
        tags: ["UAT", "CRM", "Testovací scénáře", "Bug reporting"],
      },
      {
        company: "Megatech Industries",
        role: "QA Engineer",
        period: "1/2017 – 9/2020",
        summary:
          "Řídila jsem kvalitu pro Škodu, VW a BMW, řešila reklamace a hledala skutečné příčiny problémů — ne jen jejich projevy.",
        tags: ["Automotive", "Reklamace", "Root cause analysis"],
      },
    ] satisfies Experience[],
  },
  skills: {
    index: "04",
    label: "Dovednosti",
    title: ["Co do týmu", "přináším."],
    intro: "Bez nafouknutých úrovní — jen to, s čím opravdu pracuji.",
    groups: [
      {
        title: "AI & Digital Creation",
        items: ["AI-assisted development", "Vibe coding", "Psaní promptů", "Návrh logiky aplikací", "Nasazení na Railway"],
      },
      {
        title: "Testing & Quality",
        items: ["UAT testing", "QA", "Playwright", "Testovací scénáře", "Bug reporting", "Root cause analysis"],
      },
      {
        title: "Customer & Digital Operations",
        items: ["Marketplace support", "Reklamace", "Daktela", "Microsoft DAX", "CRM", "Intranet"],
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
    text: "Hledám tým, kde se potká zákaznický pohled, péče o kvalitu a chuť tvořit nové věci s AI. Jestli takový máte, ráda si s vámi promluvím.",
    areasTitle: "Oblasti spolupráce",
    areas: ["Junior IT / Web Development", "QA & UAT Testing", "AI-assisted Projects", "Customer & Digital Operations"],
    linkedinCta: "Napište mi na LinkedIn",
    emailCta: "Napsat e-mail",
    noEmail: "Nejrychleji mě zastihnete přes LinkedIn.",
  },
  footer: {
    note: "Navrženo a postaveno s AI — stejně jako moje aplikace.",
  },
};

export type SiteContent = typeof cs;

const en: SiteContent = {
  meta: {
    title: "Věra Paukrtová — Customer Operations, QA & Apps Built with AI",
    description:
      "Věra Paukrtová sees a website through the customer's eyes, guards quality and builds her own apps with AI. Experience at Allegro Group, Ipsos, Zentiva, T-Mobile and in automotive QA.",
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
    problem: "Why I built it",
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
    tagline: "I think like a customer, guard quality, build with AI.",
    intro:
      "For years I've worked where customers, systems and quality meet — from quality management in automotive, through testing at T-Mobile, to supporting sellers at Allegro Group. Today I bring the same perspective to the apps I build with AI: I know where users get stuck, and I want to fix it before it happens.",
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
    title: ["I see a website", "through the customer's eyes."],
    paragraphs: [
      "My biggest strength is simple: I can put myself in the customer's shoes instantly. I look at a website the way someone who's already annoyed would — and I catch UX and functional bugs before they ever reach real people.",
      "Practice taught me that. In manufacturing I traced the real causes of complaints for Škoda, VW and BMW, at T-Mobile I tested applications before release, and today at Allegro Group I deal every day with what actually bothers sellers. Every one of those roles taught me the same thing: look at things from the other side.",
      "Now I bring that perspective to my own apps, which I build with AI. I'm not a senior developer and I don't pretend to be. But I can turn an idea into something that works — something you can try for yourself.",
    ],
    strengthsTitle: "How I work",
    strengths: [
      {
        title: "Through an annoyed user's eyes",
        text: "I click through a website the way someone in a hurry with no patience would. That's where bugs show up first.",
      },
      {
        title: "Results over perfection",
        text: "“What matters is the result, even an imperfect one — otherwise it's a never-ending process.”",
      },
      {
        title: "A perfectionist as the first user",
        text: "“If I like it as a perfectionist, that's already at least one person who likes it.”",
      },
      {
        title: "From idea to deployment",
        text: "I write the prompts, design the logic, run deployment on Railway and test with Playwright.",
      },
      {
        title: "There's always a person on the other side",
        text: "A seller, a field worker or a colleague in another country — everyone needs things to simply work.",
      },
    ],
  },
  projects: {
    index: "02",
    label: "Selected Projects",
    title: ["Projects of my own", "you can try yourself."],
    intro:
      "I write the prompts, design the logic, deploy on Railway and test with Playwright. What I love most is the very beginning, when an idea turns into something real — and then the gradual fine-tuning until it's exactly what I want.",
    items: [
      {
        id: "cvecko",
        name: "CVéčko",
        kind: "Web application",
        status: "live",
        statusLabel: "Live app",
        summary: "A CV tool I built for myself — exactly the way I wanted it.",
        problem:
          "The usual CV builders just didn't work for me on one specific thing. Instead of settling for another compromise, I built my own that looks and works the way I need.",
        details:
          "CVéčko is a starting point. Next, I want to focus on the whole job-search journey — with people living with multiple sclerosis in mind, so it's useful for them too.",
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
        summary: "My very first app — a web game about Czech rulers.",
        problem:
          "Czech history has always fascinated me, and it still does. I wanted pupils and students to find their way to it naturally — through play instead of memorising: answering questions, collecting ruler cards and discovering their stories.",
        details:
          "With Český král I went through the whole journey for the first time — from an idea to a live app anyone can play.",
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
        summary: "Job offers from different sources, all in one place.",
        problem:
          "Job offers are scattered across many portals, and searching means going through the same websites over and over. Kompleto follows on from CVéčko — both revolve around finding work.",
        details: "The project is still in the concept and design phase. I'll define the technology as development moves forward.",
        tech: ["Concept", "UX design", "AI-assisted development"],
        urlLabel: null,
        ...projectMeta.kompleto,
      },
    ] satisfies Project[],
  },
  experience: {
    index: "03",
    label: "Experience",
    title: ["Where I", "learned it."],
    intro: "Six places, one common thread: I've always stood between people and systems, making sure things work.",
    items: [
      {
        company: "Allegro Group",
        role: "Marketplace Support Specialist",
        period: "11/2025 – present",
        current: true,
        summary:
          "I support sellers on Mall.cz, Mall.sk and CZC — from complaints to the logic behind order cancellations. I work in Daktela and Microsoft DAX, and I kept a 100% NPS score for three months in a row.",
        tags: ["Mall.cz · Mall.sk · CZC", "Complaints", "Daktela", "Microsoft DAX", "100% NPS · 3 months running"],
      },
      {
        company: "Ipsos",
        role: "Coordinator",
        period: "3/2025 – 11/2025",
        summary:
          "I coordinated traffic-count projects and was the go-to support for hundreds of field workers — over 7,000 segments in total.",
        tags: ["Traffic counts", "Hundreds of field workers", "7,000+ segments"],
      },
      {
        company: "Sigma AI",
        role: "Transcriptor",
        period: "1/2024 – 12/2024",
        summary: "I transcribed audio data and checked its quality — work where every single word matters.",
        tags: ["Audio transcription", "Quality control", "Data work"],
      },
      {
        company: "Zentiva",
        role: "Digital HR Support / Webmaster",
        period: "1/2022 – 12/2022",
        summary: "I managed the intranet for five countries and supported international digital HR processes.",
        tags: ["Intranet · 5 countries", "Digital HR", "International team"],
      },
      {
        company: "T-Mobile",
        role: "UAT Tester",
        period: "2/2021 – 12/2021",
        summary:
          "I tested CRM and web applications, wrote test scenarios and reported bugs before a release reached customers.",
        tags: ["UAT", "CRM", "Test scenarios", "Bug reporting"],
      },
      {
        company: "Megatech Industries",
        role: "QA Engineer",
        period: "1/2017 – 9/2020",
        summary:
          "I managed quality for Škoda, VW and BMW, handled complaints and looked for the real root causes of problems — not just their symptoms.",
        tags: ["Automotive", "Complaints", "Root cause analysis"],
      },
    ] satisfies Experience[],
  },
  skills: {
    index: "04",
    label: "Skills",
    title: ["What I bring", "to a team."],
    intro: "No inflated levels — just what I really work with.",
    groups: [
      {
        title: "AI & Digital Creation",
        items: ["AI-assisted development", "Vibe coding", "Prompt writing", "App logic design", "Deployment on Railway"],
      },
      {
        title: "Testing & Quality",
        items: ["UAT testing", "QA", "Playwright", "Test scenarios", "Bug reporting", "Root cause analysis"],
      },
      {
        title: "Customer & Digital Operations",
        items: ["Marketplace support", "Complaints", "Daktela", "Microsoft DAX", "CRM", "Intranet"],
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
    text: "I'm looking for a team where a customer's perspective, care for quality and the drive to build new things with AI come together. If that sounds like yours, I'd love to talk.",
    areasTitle: "Areas of collaboration",
    areas: cs.contact.areas,
    linkedinCta: "Message me on LinkedIn",
    emailCta: "Send an e-mail",
    noEmail: "The fastest way to reach me is LinkedIn.",
  },
  footer: {
    note: "Designed and built with AI — just like my apps.",
  },
};

export const content: Record<Lang, SiteContent> = { cs, en };
