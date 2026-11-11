# Portfolio — Astou Dieng

Portfolio personnel bilingue (FR / EN) : Next.js 15 (App Router), TypeScript, Tailwind CSS v4, composants shadcn/ui (Radix), Framer Motion, Lenis.

## Démarrer en local

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr ou /en
npm run build && npm start   # version de production
```

## Modifier le contenu

Tout le contenu vient du CV et se trouve dans **deux fichiers** :

| Fichier | Contenu |
| --- | --- |
| `src/content/profile.ts` | contacts, compétences, projets, formation |
| `src/content/dictionary.ts` | tous les textes de l'interface, en FR et EN |

Pour enrichir un projet, complète ses champs optionnels dans `profile.ts` : `tech`, `description`, `role`, `features`, `year`, `github`, `demo`. Chaque champ vide est simplement masqué. Pour LinkedIn, renseigne `contact.linkedin`.

Le CV téléchargeable est `public/cv/Astou_DIENG_CV.pdf` : remplace ce fichier pour le mettre à jour.

## Structure

```
src/app/[locale]/          page FR/EN, layout, métadonnées, image Open Graph
src/app/sitemap.ts         sitemap.xml   ·  src/app/robots.ts → robots.txt
src/middleware.ts          redirige / vers /fr ou /en selon la langue du navigateur
src/components/sections/   Hero, À propos, Compétences, Projets, Parcours, Contact, Footer
src/components/ui/         composants shadcn/ui (button, badge, dialog)
```

## Déployer sur Vercel

1. Va sur https://vercel.com, connecte-toi avec GitHub.
2. **Add New → Project**, puis importe le dépôt `toudieng/portfolio`.
3. Vercel détecte Next.js automatiquement : laisse les réglages par défaut et clique sur **Deploy**.
4. Dans **Settings → Environment Variables**, ajoute
   `NEXT_PUBLIC_SITE_URL` = l'URL finale du site (ex. `https://astoudieng.com` ou `https://portfolio-xxx.vercel.app`),
   puis **Deployments → Redeploy**. Cette URL sert au sitemap, au canonical et aux images Open Graph.
5. Chaque `git push` sur `main` redéploie automatiquement le site.

## Ajouter un nom de domaine

1. Achète un domaine (Vercel Domains, Namecheap, OVH, Gandi…).
2. Dans Vercel : **Project → Settings → Domains → Add**, saisis `tondomaine.com` (Vercel propose d'ajouter aussi `www`).
3. Chez ton registrar, crée les enregistrements DNS que Vercel affiche, en général :
   - `A` sur `@` → `76.76.21.21`
   - `CNAME` sur `www` → `cname.vercel-dns.com`

   (ou remplace les serveurs DNS par ceux de Vercel)
4. Attends la propagation (de quelques minutes à 48 h). Le certificat HTTPS est créé automatiquement.
5. Mets à jour `NEXT_PUBLIC_SITE_URL` avec le nouveau domaine et redéploie.
6. Optionnel : déclare le site dans Google Search Console et soumets `https://tondomaine.com/sitemap.xml`.
