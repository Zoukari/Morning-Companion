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

## 4. Notifications push (réelles, même app fermée)

Contrairement à une v1 "best-effort" (qui ne marche que si l'app est ouverte),
celle-ci envoie de vraies notifications Web Push via un petit backend, et
relance toutes les 20 min dans ta plage horaire jusqu'à ce que tu ouvres
l'app et fasses tes adhkar.

**Comment ça marche :** Vercel Hobby ne peut déclencher un cron qu'une fois
par jour (et de façon imprécise). On contourne ça avec une **GitHub Action
gratuite** qui ping une route API toutes les 10 min ; cette route décide
elle-même si elle doit envoyer un push (dans la plage horaire ? adhkar pas
encore faits ? pas déjà notifié récemment ?).

**Mise en place (une seule fois) :**

1. **Générer les clés VAPID** (chez toi, pas dans un chat) :
   ```bash
   npx web-push generate-vapid-keys
   ```
   Ça donne une clé publique et une clé privée.

2. **Créer une base Redis sur Vercel** (gratuit, via Upstash) : Dashboard
   Vercel → ton projet → **Storage** → **Create Database** → **Redis**.
   Vercel connecte automatiquement les variables d'environnement
   (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).

3. **Ajouter les variables d'environnement** sur Vercel (Project → Settings →
   Environment Variables) :
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` → la clé publique de l'étape 1
   - `VAPID_PRIVATE_KEY` → la clé privée de l'étape 1
   - `CRON_SECRET` → une chaîne aléatoire longue (`openssl rand -hex 32`)

4. **Redéployer** (`git push` suffit, Vercel redéploie tout seul).

5. **Ajouter deux secrets sur GitHub** (repo → Settings → Secrets and
   variables → Actions → New repository secret) :
   - `CRON_SECRET` → exactement la même valeur que sur Vercel
   - `APP_URL` → ton URL Vercel, ex. `https://morning-companion.vercel.app`
     (sans `/` à la fin)

6. Le fichier `.github/workflows/reminder.yml` est déjà prêt — dès qu'il est
   sur GitHub, l'Action se déclenche automatiquement toutes les 10 min. Tu
   peux la lancer manuellement depuis l'onglet **Actions** → **Run workflow**
   pour tester tout de suite sans attendre.

7. Dans l'app, va dans **Réglages → Notifications push**, active le toggle
   (ça demande la permission iOS et enregistre ton appareil), puis règle ta
   **plage de rappel** (par défaut 05:00–06:30).

**Limites à connaître :**
- Sur iPhone, les push web n'existent que depuis iOS 16.4, et **uniquement
  si l'app est installée sur l'écran d'accueil** (pas juste un onglet Safari).
- GitHub peut retarder une Action de quelques minutes si le repo est peu
  actif — sans conséquence ici puisqu'on retente toutes les 10 min.
- Un seul appareil abonné à la fois dans cette v1 (stockage simple pour un
  usage personnel). Si tu réinstalles l'app sur un nouvel iPhone, réactive
  juste le toggle — ça remplace l'abonnement précédent.

## 5. Structure du projet

```
app/                  routes Next.js (App Router), une seule page qui gère
                      tout le flux (state machine côté client)
app/api/subscribe/    enregistre l'abonnement push de l'appareil
app/api/sync/         reçoit la plage horaire + statut du jour côté client
app/api/cron/reminder/ décide d'envoyer un push (appelée par GitHub Actions)
components/screens/   un composant par écran (Home, Adhkar, Routine, ...)
components/ui.tsx      primitives UI partagées (ProgressBar, Toggle, ...)
lib/data.ts           adhkar, checklist, citations — à éditer pour changer
                       le contenu sans toucher au reste du code
lib/types.ts           types + valeurs par défaut de l'état sauvegardé
lib/storage.ts         persistance offline via IndexedDB (idb-keyval)
lib/push.ts             abonnement push + sync côté client
lib/pushServer.ts       stockage KV + envoi web-push côté serveur
worker/index.js         code du service worker (push, clic sur la notif)
.github/workflows/      la GitHub Action qui déclenche le cron toutes les 10 min
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
