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
    tags: ["C", "Python", "Java", "HTML", "CSS", "JavaScript", "PHP", "JEE", ".NET", "Django", "React", "Next.js", "Vite", "Flutter"],
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
    tags: ["PostgreSQL", "MySQL", "SQL Server", "Oracle", "SQL", "NoSQL", "Python", "Matlab"],
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
  featured?: boolean;
  /** gradient hue pair for the abstract cover */
  hue: [string, string];
};

const T = {
  fullstack: { fr: "Full-stack", en: "Full-stack" },
  ecommerce: { fr: "E-commerce", en: "E-commerce" },
  web: { fr: "Web", en: "Web" },
  mobile: { fr: "Mobile", en: "Mobile" },
  management: { fr: "Application de gestion", en: "Management app" },
  community: { fr: "Communautaire", en: "Community" },
  showcase: { fr: "Site vitrine", en: "Showcase website" },
  gitlab: { fr: "Workflow GitLab", en: "GitLab workflow" },
  team: { fr: "Co-développement", en: "Co-development" },
  health: { fr: "Santé", en: "Healthcare" },
} satisfies Record<string, L10n>;

export const projects: Project[] = [
  {
    slug: "naatal-mbay",
    title: { fr: "Naatal Mbay", en: "Naatal Mbay" },
    summary: {
      fr: "Plateforme e-commerce full-stack réalisée pour le projet « Naatal Mbay ».",
      en: "Full-stack e-commerce platform built for the “Naatal Mbay” project.",
    },
    tags: [T.fullstack, T.ecommerce, T.web],
    hue: ["#3B6CFF", "#22C55E"],
  },
  {
    slug: "yaay-vide",
    title: { fr: "Yaay Vidé", en: "Yaay Vidé" },
    summary: {
      fr: "Plateforme e-commerce full-stack de seconde main pensée pour les familles sénégalaises.",
      en: "Full-stack second-hand e-commerce platform designed for Senegalese families.",
    },
    tags: [T.fullstack, T.ecommerce, T.web],
    hue: ["#F5B547", "#EC4899"],
  },
  {
    slug: "yeugo",
    title: { fr: "Yeugo", en: "Yeugo" },
    summary: {
      fr: "Co-développement d'une application mobile de sécurité urbaine, avec gestion du workflow sur GitLab.",
      en: "Co-developed an urban-safety mobile app, with the team workflow managed on GitLab.",
    },
    tags: [T.mobile, T.team, T.gitlab],
    hue: ["#3B6CFF", "#A855F7"],
  },
  {
    slug: "restaurant",
    title: { fr: "Gestion de restaurant", en: "Restaurant management" },
    summary: {
      fr: "Plateforme de gestion de restaurant.",
      en: "Restaurant management platform.",
    },
    tags: [T.management, T.web],
    hue: ["#F5B547", "#EF4444"],
  },
  {
    slug: "creche",
    title: { fr: "Gestion de crèche", en: "Crèche management" },
    summary: {
      fr: "Projet communautaire : application de gestion d'une structure de garde d'enfants.",
      en: "Community project: management app for a childcare centre (crèche).",
    },
    tags: [T.community, T.management],
    hue: ["#14B8A6", "#3B6CFF"],
  },
  {
    slug: "hopital",
    title: { fr: "Gestion hospitalière", en: "Hospital management" },
    summary: {
      fr: "Logiciel de gestion hospitalière.",
      en: "Hospital management software.",
    },
    tags: [T.management, T.health],
    hue: ["#06B6D4", "#3B6CFF"],
  },
  {
    slug: "cisse-freres",
    title: { fr: "Cisse et Frères Groupe BTP", en: "Cisse et Frères Groupe BTP" },
    summary: {
      fr: "Site vitrine pour l'entreprise de BTP Cisse et Frères Groupe.",
      en: "Showcase website for the construction company Cisse et Frères Groupe.",
    },
    tags: [T.showcase, T.web],
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
