# Morning Companion

PWA de routine matinale islamique — adhkar guidés, checklist, suivi du poids,
objectif du jour, bilan, dashboard (série/badges/niveau), mode strict.
Next.js 15 (App Router) + TypeScript + Tailwind, 100% offline (IndexedDB).

## 1. Déployer sur Vercel

**Option A — via GitHub (recommandé)**
```bash
cd morning-companion
git init
git add .
git commit -m "Morning Companion v1"
```
Crée un repo vide sur GitHub, puis :
```bash
git remote add origin https://github.com/<toi>/morning-companion.git
git push -u origin main
```
Va sur https://vercel.com/new, importe le repo, clique **Deploy**. C'est tout —
Vercel détecte Next.js automatiquement, aucune configuration à ajouter.

**Option B — sans GitHub, avec la CLI Vercel**
```bash
npm i -g vercel
cd morning-companion
vercel        # suit les instructions, préview
vercel --prod # met en ligne la vraie URL
```

## 2. Installer sur iPhone

1. Ouvre l'URL Vercel dans **Safari** (pas Chrome — l'installation PWA iOS
   passe uniquement par Safari).
2. Bouton **Partager** → **Sur l'écran d'accueil**.
3. L'app s'ouvre désormais en plein écran, comme une vraie app.

## 3. Mode Strict + Raccourcis iPhone

Dans **Réglages → Mode strict**, active le mode strict : à l'ouverture, l'app
saute directement à l'étape où tu t'es arrêté (ou affiche "routine terminée"
si c'est déjà fait) au lieu de montrer l'accueil.

Pour que ça se déclenche automatiquement quand tu ouvres Instagram/TikTok/etc :

1. App **Raccourcis** → onglet **Automatisation** → **+** → **App**.
2. Choisis Instagram (ou TikTok, Safari, X...) → **Est ouverte**.
3. Ajoute l'action **Ouvrir l'URL** → colle l'URL de ton app Vercel (ou mieux,
   ouvre d'abord la PWA installée puis choisis-la dans la liste des apps si
   elle apparaît).
4. Désactive **Demander avant d'exécuter**.
5. Répète pour chaque app à intercepter.

Limite connue d'iOS : une automatisation "App ouverte" ne peut pas *fermer*
l'app cible ni bloquer son lancement — elle ouvre juste Morning Companion
par-dessus. L'utilisateur doit encore appuyer sur "Retour" pour revenir à
l'app initiale. C'est une limite d'iOS, pas de cette app.

## 4. Notifications

Les notifications sont **locales et best-effort** : elles ne se déclenchent
que si l'app/PWA est ouverte en arrière-plan (onglet ou fenêtre standalone).
iOS ne permet pas de réveiller une PWA fermée sans un vrai serveur de push
(VAPID + service worker push). Pour aller plus loin :

- Héberger un petit backend (ex. Vercel Edge Function) qui envoie des push
  Web Push signés VAPID à l'heure choisie.
- Ou utiliser un vrai calcul d'horaire de Fajr (API comme Aladhan) au lieu
  d'une heure fixe dans les réglages.

Ces deux points ne sont pas branchés dans cette v1 pour rester simple et
100% gratuit à héberger, mais l'architecture (settings.notifTime,
`lib/notifications.ts`) est prête à les recevoir.

## 5. Structure du projet

```
app/                  routes Next.js (App Router), une seule page qui gère
                      tout le flux (state machine côté client)
components/screens/   un composant par écran (Home, Adhkar, Routine, ...)
components/ui.tsx      primitives UI partagées (ProgressBar, Toggle, ...)
lib/data.ts           adhkar, checklist, citations — à éditer pour changer
                       le contenu sans toucher au reste du code
lib/types.ts           types + valeurs par défaut de l'état sauvegardé
lib/storage.ts         persistance offline via IndexedDB (idb-keyval)
lib/notifications.ts    rappel local quotidien (best-effort)
public/manifest.json   manifeste PWA
public/icons/           icônes (croissant doré généré)
public/fonts/           Inter / Fraunces / Amiri auto-hébergées (woff2)
```

Pour ajouter/modifier une invocation, éditer uniquement le tableau `ADHKAR`
dans `lib/data.ts` — aucun autre fichier n'a besoin d'être touché.

## 6. Notes sécurité

`npm audit` signale quelques vulnérabilités **indirectes**, toutes situées
dans les dépendances de build de `@ducanh2912/next-pwa` (génération du
service worker via Workbox). Elles s'exécutent uniquement pendant
`npm run build` sur du code que tu contrôles — aucun impact côté utilisateur
final ni en production. À surveiller lors des futures mises à jour de ce
package.

## 7. Commandes locales

```bash
npm install
npm run dev     # développement, http://localhost:3000
npm run build   # build de production (déjà testé, passe sans erreur)
npm start        # sert le build de production en local
```
