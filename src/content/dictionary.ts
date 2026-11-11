import type { Locale } from "@/lib/i18n";

const fr = {
  meta: {
    title: "Astou Dieng — Étudiante en informatique & développeuse full-stack",
    description:
      "Portfolio d'Astou Dieng, étudiante en Master Systèmes d'Information Répartis à l'UCAD (Dakar). Développement web & mobile, data, systèmes et réseaux.",
  },
  nav: {
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    journey: "Parcours",
    contact: "Contact",
    menu: "Menu",
    close: "Fermer",
    skip: "Aller au contenu",
    theme: "Changer de thème",
    language: "Changer de langue",
  },
  hero: {
    badge: "Master SIR · UCAD — Dakar",
    hello: "Bonjour, je suis",
    role: "Étudiante en informatique",
    lead: "Je conçois et je développe des applications",
    pitch:
      "Des plateformes e-commerce aux applications mobiles, je transforme des besoins concrets en solutions logicielles fiables, de la base de données jusqu'à l'interface.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger mon CV",
    scroll: "Défiler",
  },
  about: {
    kicker: "À propos",
    title: "Curieuse, rigoureuse, et tournée vers le concret.",
    p1: "Je suis Astou, étudiante en informatique à l'Université Cheikh Anta Diop de Dakar. Après une Licence en Informatique, je poursuis un Master en Systèmes d'Information Répartis.",
    p2: "J'aime construire des projets qui servent : une marketplace de seconde main pour les mamans sénégalaises, une plateforme e-commerce pour digitaliser la filière maraîchère (mon mémoire de Licence), des outils de gestion pour un restaurant ou un hôpital, une application mobile de sécurité urbaine. J'avance avec autonomie, je fédère volontiers une équipe et je soigne autant la méthode que le code.",
    p3: "En dehors des écrans : lecture, écriture et sport.",
    stats: { projects: "projets", degrees: "diplômes UCAD", languages: "langues" },
    based: "Basée à",
  },
  skills: {
    kicker: "Compétences",
    title: "Une boîte à outils large, du code à l'infrastructure.",
    strengths: "Atouts personnels",
    languages: "Langues",
    interests: "Centres d'intérêt",
  },
  projects: {
    kicker: "Projets",
    title: "Projets académiques et personnels.",
    subtitle: "Cliquez sur un projet pour voir le détail.",
    details: "Voir le détail",
    code: "Code",
    demo: "Démo",
    role: "Mon rôle",
    features: "Fonctionnalités clés",
    stack: "Technologies",
    soon: "Détails à venir.",
    featured: "Projet phare",
    close: "Fermer",
    more: "Tous mes dépôts sur GitHub",
  },
  journey: {
    kicker: "Parcours",
    title: "Formation.",
    current: "En cours",
  },
  contact: {
    kicker: "Contact",
    title: "Un projet, un stage, une question ?",
    subtitle: "Écrivez-moi, je vous répondrai avec plaisir.",
    name: "Nom",
    email: "Email",
    message: "Message",
    namePh: "Votre nom",
    emailPh: "vous@exemple.com",
    messagePh: "Parlez-moi de votre projet…",
    send: "Envoyer le message",
    note: "Le bouton ouvre votre messagerie avec le message pré-rempli.",
    phone: "Téléphone",
    location: "Localisation",
    copy: "Copier",
    copied: "Copié !",
    subject: "Prise de contact depuis votre portfolio",
  },
  footer: {
    rights: "Tous droits réservés.",
    built: "Conçu et développé avec Next.js",
    top: "Retour en haut",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "Astou Dieng — Computer Science student & full-stack developer",
    description:
      "Portfolio of Astou Dieng, Master's student in Distributed Information Systems at UCAD (Dakar). Web & mobile development, data, systems and networks.",
  },
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    journey: "Journey",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    theme: "Toggle theme",
    language: "Switch language",
  },
  hero: {
    badge: "Master SIR · UCAD — Dakar",
    hello: "Hi, I'm",
    role: "Computer Science student",
    lead: "I design and build applications for",
    pitch:
      "From e-commerce platforms to mobile apps, I turn real-world needs into reliable software, from the database all the way to the interface.",
    ctaProjects: "View my projects",
    ctaCv: "Download my resume",
    scroll: "Scroll",
  },
  about: {
    kicker: "About",
    title: "Curious, rigorous, and focused on what's real.",
    p1: "I'm Astou, a Computer Science student at Cheikh Anta Diop University in Dakar. After a Bachelor's in Computer Science, I'm now pursuing a Master's in Distributed Information Systems.",
    p2: "I love building projects that are useful: a second-hand marketplace for Senegalese mothers, an e-commerce platform to digitalise the market-gardening sector (my Bachelor's thesis), management tools for a restaurant or a hospital, an urban-safety mobile app. I work autonomously, enjoy bringing a team together, and care as much about method as about code.",
    p3: "Away from the screen: reading, writing and sport.",
    stats: { projects: "projects", degrees: "UCAD degrees", languages: "languages" },
    based: "Based in",
  },
  skills: {
    kicker: "Skills",
    title: "A broad toolbox, from code to infrastructure.",
    strengths: "Personal strengths",
    languages: "Languages",
    interests: "Interests",
  },
  projects: {
    kicker: "Projects",
    title: "Academic & personal projects.",
    subtitle: "Click a project to see the details.",
    details: "See details",
    code: "Code",
    demo: "Demo",
    role: "My role",
    features: "Key features",
    stack: "Tech stack",
    soon: "More details coming soon.",
    featured: "Featured",
    close: "Close",
    more: "All my repositories on GitHub",
  },
  journey: {
    kicker: "Journey",
    title: "Education.",
    current: "Ongoing",
  },
  contact: {
    kicker: "Contact",
    title: "A project, an internship, a question?",
    subtitle: "Drop me a line, I will be glad to reply.",
    name: "Name",
    email: "Email",
    message: "Message",
    namePh: "Your name",
    emailPh: "you@example.com",
    messagePh: "Tell me about your project…",
    send: "Send message",
    note: "The button opens your email app with the message pre-filled.",
    phone: "Phone",
    location: "Location",
    copy: "Copy",
    copied: "Copied!",
    subject: "Contact from your portfolio",
  },
  footer: {
    rights: "All rights reserved.",
    built: "Designed & built with Next.js",
    top: "Back to top",
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
