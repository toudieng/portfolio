/**
 * Single source of truth for the portfolio content.
 * Everything here comes from Astou Dieng's CV — do not invent anything.
 * Optional project fields (tech, github, demo, year, role, features) stay empty
 * until they are provided; the UI hides whatever is missing.
 */
import type { L10n } from "@/lib/i18n";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://astou-dieng.vercel.app",
  name: "Astou Dieng",
  cv: "/cv/Astou_DIENG_CV.pdf",
};

export const contact = {
  email: "asdieng.elc@outlook.com",
  phone: "+221 76 587 93 03",
  phoneHref: "tel:+221765879303",
  location: "Colobane, Dakar",
  github: "https://github.com/toudieng",
  linkedin: "" as string, // à compléter
};

export const heroWords: Record<"fr" | "en", string[]> = {
  fr: ["web", "mobile", "data", "systèmes répartis"],
  en: ["web", "mobile", "data", "distributed systems"],
};

export type SkillGroup = {
  id: string;
  title: L10n;
  icon: "code" | "database" | "server" | "kanban";
  items: L10n[];
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "dev",
    icon: "code",
    title: { fr: "Développement & Programmation", en: "Development & Programming" },
    items: [
      { fr: "Programmation orientée objet et procédurale", en: "Object-oriented & procedural programming" },
      { fr: "Développement web", en: "Web development" },
      { fr: "Frameworks & API, services Web, architectures SOA / microservices", en: "Frameworks & APIs, web services, SOA / microservices architectures" },
      { fr: "Développement mobile et applications réparties", en: "Mobile development & distributed applications" },
    ],
    tags: ["C", "C++", "Python", "Java", "HTML", "CSS", "JavaScript", "PHP", "JEE", ".NET", "Django", "Django REST Framework", "React", "Next.js", "Vite", "Flutter", "Dart", "Qt"],
  },
  {
    id: "data",
    icon: "database",
    title: { fr: "Data & Bases de données", en: "Data & Databases" },
    items: [
      { fr: "Conception et administration de bases de données", en: "Database design & administration" },
      { fr: "Programmation SQL, modélisation et requêtage", en: "SQL programming, modeling & querying" },
      { fr: "Big Data & NoSQL/NewSQL, calcul distribué, Business Intelligence", en: "Big Data & NoSQL/NewSQL, distributed computing, Business Intelligence" },
      { fr: "Machine Learning et programmation scientifique", en: "Machine Learning & scientific programming" },
    ],
    tags: ["PostgreSQL", "MySQL", "SQL Server", "Oracle", "Supabase", "SQL", "NoSQL", "Python", "Matlab"],
  },
  {
    id: "sys",
    icon: "server",
    title: { fr: "Systèmes & Réseaux", en: "Systems & Networks" },
    items: [
      { fr: "Administration Linux/Ubuntu, maintenance informatique", en: "Linux/Ubuntu administration, IT maintenance" },
      { fr: "Réseaux, sécurité, routage et commutation", en: "Networking, security, routing & switching" },
      { fr: "Systèmes embarqués, répartis et architecture des ordinateurs", en: "Embedded & distributed systems, computer architecture" },
      { fr: "Performance des systèmes informatiques", en: "Computer systems performance" },
    ],
    tags: ["Linux", "Ubuntu"],
  },
  {
    id: "pm",
    icon: "kanban",
    title: { fr: "Gestion de projet & Méthodologie", en: "Project Management & Methodology" },
    items: [
      { fr: "Gestion de projets informatiques, modélisation BPMN", en: "IT project management, BPMN modeling" },
      { fr: "Ateliers de Génie Logiciel (CI/CD, DevOps)", en: "Software engineering workshops (CI/CD, DevOps)" },
    ],
    tags: ["BPMN", "CI/CD", "DevOps", "GitLab"],
  },
];

export const strengths: L10n[] = [
  { fr: "Leadership", en: "Leadership" },
  { fr: "Autonomie", en: "Autonomy" },
  { fr: "Gestion de projet", en: "Project management" },
  { fr: "Développement personnel & communication", en: "Personal development & communication" },
  { fr: "Méthodologie de rédaction", en: "Writing methodology" },
];

export const languages: { name: L10n; level: number }[] = [
  { name: { fr: "Français", en: "French" }, level: 100 },
  { name: { fr: "Anglais", en: "English" }, level: 60 },
];

export const interests: L10n[] = [
  { fr: "Lecture", en: "Reading" },
  { fr: "Écriture", en: "Writing" },
  { fr: "Sport", en: "Sport" },
];

export type Project = {
  slug: string;
  title: L10n;
  summary: L10n;
  description?: L10n;
  role?: L10n;
  features?: L10n[];
  tags: L10n[];
  tech?: string[];
  year?: string;
  github?: string;
  demo?: string;
  /** Highlighted project ("projet phare"), shown larger */
  featured?: boolean;
  /** Optional screenshot in /public (e.g. "/projects/yaay-vide.png"); abstract cover otherwise */
  image?: string;
  /** gradient hue pair for the abstract cover */
  hue: [string, string];
};

const T = {
  fullstack: { fr: "Full-stack", en: "Full-stack" },
  ecommerce: { fr: "E-commerce", en: "E-commerce" },
  marketplace: { fr: "Marketplace", en: "Marketplace" },
  web: { fr: "Web", en: "Web" },
  mobile: { fr: "Mobile", en: "Mobile" },
  management: { fr: "Application de gestion", en: "Management app" },
  desktop: { fr: "Application de bureau", en: "Desktop app" },
  community: { fr: "Communautaire", en: "Community" },
  pm: { fr: "Gestion de projet", en: "Project management" },
  showcase: { fr: "Site vitrine", en: "Showcase website" },
  gitlab: { fr: "Workflow GitLab", en: "GitLab workflow" },
  team: { fr: "Travail en équipe", en: "Teamwork" },
  solo: { fr: "Projet solo", en: "Solo project" },
  thesis: { fr: "Mémoire de Licence", en: "Bachelor's thesis" },
  realtime: { fr: "Temps réel", en: "Real-time" },
  health: { fr: "Santé", en: "Healthcare" },
} satisfies Record<string, L10n>;

/** Order = display order. Featured projects come first. */
export const projects: Project[] = [
  {
    slug: "yaay-vide",
    title: { fr: "Yaay Vidé", en: "Yaay Vidé" },
    featured: true,
    year: "2026",
    summary: {
      fr: "Marketplace de seconde main pensée pour les mamans et les familles au Sénégal.",
      en: "Second-hand marketplace designed for mothers and families in Senegal.",
    },
    description: {
      fr: "Plateforme e-commerce full-stack de seconde main : une marketplace où les mamans au Sénégal peuvent vendre et acheter des articles d'occasion pour leur famille.",
      en: "Full-stack second-hand e-commerce platform: a marketplace where mothers in Senegal can sell and buy pre-owned items for their families.",
    },
    role: {
      fr: "Projet réalisé seule, de A à Z : conception, frontend et backend.",
      en: "Built solo from A to Z: design, frontend and backend.",
    },
    tags: [T.marketplace, T.fullstack, T.solo],
    tech: ["React", "Vite", "Django"],
    hue: ["#F5B547", "#EC4899"],
  },
  {
    slug: "yeugo",
    title: { fr: "Yeugo", en: "Yeugo" },
    featured: true,
    year: "2025",
    summary: {
      fr: "Application mobile de sécurité urbaine avec localisation en temps réel, co-développée en équipe.",
      en: "Urban-safety mobile app with real-time location, co-developed as a team.",
    },
    description: {
      fr: "Yeugo est une application mobile de sécurité urbaine qui s'appuie sur la localisation en temps réel. Le projet a été co-développé en équipe, avec un workflow de collaboration géré sur GitLab.",
      en: "Yeugo is an urban-safety mobile app built around real-time location. It was co-developed as a team, with the collaboration workflow managed on GitLab.",
    },
    role: {
      fr: "Développeuse frontend : interfaces de l'application mobile en Flutter / Dart.",
      en: "Frontend developer: built the mobile app's interfaces with Flutter / Dart.",
    },
    tags: [T.mobile, T.realtime, T.team, T.gitlab],
    tech: ["Flutter", "Dart", "Supabase", "GitLab"],
    hue: ["#3B6CFF", "#A855F7"],
  },
  {
    slug: "naatal-mbay",
    title: { fr: "Naatal Mbay", en: "Naatal Mbay" },
    year: "2025",
    summary: {
      fr: "Plateforme e-commerce full-stack pour la digitalisation de la filière maraîchère sénégalaise.",
      en: "Full-stack e-commerce platform to digitalise Senegal's market-gardening sector.",
    },
    description: {
      fr: "Naatal Mbay est une plateforme e-commerce full-stack dédiée à la digitalisation de la filière maraîchère sénégalaise. Ce projet a fait l'objet de mon mémoire de fin de cycle de Licence.",
      en: "Naatal Mbay is a full-stack e-commerce platform dedicated to digitalising Senegal's market-gardening sector. It was the subject of my Bachelor's final thesis.",
    },
    role: {
      fr: "Projet réalisé entièrement seule, dans le cadre de mon mémoire de Licence : frontend, backend et API.",
      en: "Built entirely on my own as my Bachelor's thesis project: frontend, backend and API.",
    },
    tags: [T.ecommerce, T.fullstack, T.thesis],
    tech: ["React", "Vite", "Django", "Django REST Framework"],
    hue: ["#3B6CFF", "#22C55E"],
  },
  {
    slug: "restaurant",
    title: { fr: "Gestion de restaurant", en: "Restaurant management" },
    year: "2024",
    summary: {
      fr: "Plateforme de gestion de restaurant : du menu en ligne à la commande, jusqu'au service sur place ou en livraison.",
      en: "Restaurant management platform: from the online menu to ordering, through dine-in service or delivery.",
    },
    description: {
      fr: "Plateforme web qui gère toute l'activité d'un restaurant : menu en ligne, prise de commande, puis service sur place ou livraison.",
      en: "Web platform covering a restaurant's whole workflow: online menu, ordering, then dine-in service or delivery.",
    },
    role: {
      fr: "Réalisé en binôme, avec un partage du travail à parts égales.",
      en: "Built in a pair, with the work split equally.",
    },
    tags: [T.management, T.web, T.team],
    tech: ["Django"],
    hue: ["#F5B547", "#EF4444"],
  },
  {
    slug: "hopital",
    title: { fr: "Gestion hospitalière", en: "Hospital management" },
    year: "2024",
    summary: {
      fr: "Logiciel de bureau pour la gestion hospitalière, développé en C++ avec Qt.",
      en: "Desktop software for hospital management, built in C++ with Qt.",
    },
    tags: [T.desktop, T.management, T.health],
    tech: ["C++", "Qt"],
    hue: ["#06B6D4", "#3B6CFF"],
  },
  {
    slug: "creche",
    title: { fr: "Projet de crèche", en: "Crèche project" },
    year: "2025",
    summary: {
      fr: "Projet communautaire mené en cours de gestion de projet : la gestion d'une structure de garde d'enfants.",
      en: "Community project for a project-management course: managing a childcare centre (crèche).",
    },
    description: {
      fr: "Projet communautaire réalisé dans le cadre du cours de gestion de projet. Le travail portait entièrement sur la gestion du projet de crèche, sans partie développement.",
      en: "Community project carried out for a project-management course. The work focused entirely on managing the crèche project, with no development part.",
    },
    tags: [T.pm, T.community],
    hue: ["#14B8A6", "#3B6CFF"],
  },
  {
    slug: "cisse-freres",
    title: { fr: "Cisse et Frères Groupe BTP", en: "Cisse et Frères Groupe BTP" },
    year: "2023",
    summary: {
      fr: "Site vitrine pour l'entreprise de BTP Cisse et Frères Groupe.",
      en: "Showcase website for the construction company Cisse et Frères Groupe.",
    },
    tags: [T.showcase, T.web],
    tech: ["HTML", "CSS"],
    hue: ["#F5B547", "#3B6CFF"],
  },
];

export type TimelineItem = {
  period: L10n;
  title: L10n;
  place: L10n;
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    period: { fr: "2026 — en cours", en: "2026 — present" },
    title: { fr: "Master en Systèmes d'Information Répartis", en: "Master's in Distributed Information Systems" },
    place: {
      fr: "Section informatique, Faculté des Sciences et Techniques, UCAD",
      en: "Computer Science dept., Faculty of Science & Technology, UCAD",
    },
    current: true,
  },
  {
    period: { fr: "2022 — 2025", en: "2022 — 2025" },
    title: { fr: "Licence en Informatique", en: "Bachelor's in Computer Science" },
    place: {
      fr: "Section informatique, Faculté des Sciences et Techniques, UCAD",
      en: "Computer Science dept., Faculty of Science & Technology, UCAD",
    },
  },
];
