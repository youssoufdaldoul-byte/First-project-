# BurgerLab — Brief du site

> Source de vérité : `SKILL.md`. Ce document fige la structure, le mécanisme scroll
> et l'ordre de construction. Aucun code n'est encore écrit.

## 1. L'idée maîtresse

Une **landing single-page, scroll-driven et cinématique** construite autour d'une seule idée :

> **Le scroll contrôle un film de révélation de burger.**

Le burger phare se **désassemble** en vue éclatée verticale puis se **réassemble**,
piloté image par image au scroll. Tout ce qui ne sert pas cette révélation ou la marque
est coupé.

## 2. Stack technique (fixe)

- **Build :** Vite + React (TypeScript de préférence)
- **Smooth scroll :** Lenis
- **Animation / binding scroll :** GSAP + ScrollTrigger
- **Média :** Higgsfield MCP (GPT Image 2, Nano Banana Pro, Seedance 2.0) + ffmpeg local
- **Fonts :** serif display (titres) + sans propre (corps)

## 3. Le mécanisme scroll hero (cœur du site)

Contrat d'implémentation :

1. Un `<canvas>` fixe, plein écran, derrière le contenu.
2. Une **séquence de frames JPG** (`/public/sequence/frame_0001.jpg …`) préchargée en objets `Image`.
3. Un **spacer haut** (ex. `300vh`) crée la distance de scroll.
4. **ScrollTrigger** mappe la progression scroll `0 → 1` sur l'index de frame `0 → N-1`.
5. À chaque update, dessiner la frame correspondante sur le canvas (logique `object-fit: cover`).
6. **Lenis** fournit l'inertie ; ScrollTrigger lit sa valeur de scroll.
7. Les couches de texte (titre, sous-titre) apparaissent en fondu/translation à des points de progression choisis.

> **Décision clé (skill) :** séquence de frames sur `<canvas>`, **PAS** une balise `<video>`
> qu'on « seek ». C'est le seul moyen fiable de scruber de façon fluide cross-browser.

**Performance :** précharger toutes les frames avant d'activer le scrub ; loader discret
jusqu'à prêt. Cible ~120–180 frames à 1600px de large, JPG qualité ~80.

## 4. Structure de la page

| # | Section | Contenu | Fond |
|---|---------|---------|------|
| 1 | **Scroll hero** | Canvas reveal + titre « BurgerLab » + sous-titre + un seul CTA amber « Réserver » | canvas |
| 2 | **Story** | Philosophie de marque, un still d'ambiance à côté d'un court texte serif | sombre |
| 3 | **Catalog** | Cartes burger flottantes sur `--surface`, hover lift, formes circulaires subtiles en fond | `--surface` |
| 4 | **Experience** | Ambiance du lieu / mood Monaco, stills d'ambiance | ambiant |
| 5 | **Reserve** | Bloc de réservation, CTA amber, horaires + adresse fictive | — |
| 6 | **Footer** | Logo, réseaux sociaux, switch de langue (FR / EN / IT) | `--bg` |

**Langues :** FR (primaire) / EN / IT, switcher discret par initiales, contenu
structuré pour une traduction propre.

## 5. Structure de projet cible (au build)

```
burgerlab/
├─ public/
│  ├─ sequence/          # frames scroll : frame_0001.jpg … frame_0180.jpg
│  ├─ video/             # vidéos source + encodées
│  └─ img/               # stills catalogue + sections
├─ src/
│  ├─ components/
│  │  ├─ ScrollHero.tsx  # canvas + séquence de frames + ScrollTrigger
│  │  ├─ Catalog.tsx     # cartes burger
│  │  ├─ Story.tsx
│  │  ├─ Experience.tsx  # (mood venue / Monaco)
│  │  ├─ Reserve.tsx
│  │  └─ Footer.tsx
│  ├─ lib/
│  │  ├─ lenis.ts        # init smooth scroll
│  │  └─ preload.ts      # préchargeur de frames
│  ├─ styles/tokens.css  # brand tokens
│  ├─ App.tsx
│  └─ main.tsx
├─ SKILL.md
└─ vite.config.ts
```

> Note : l'arborescence du skill ne listait pas `Experience.tsx` alors que la page inclut
> une section Experience — ajoutée ici pour cohérence. À confirmer au moment du build.

## 6. Workflow — phases (valider chaque phase avant la suivante)

- **Phase 0** — Lire le skill, confirmer, signaler les manques. *(fait)*
- **Phase 0.5 (ce workspace)** — Créer dossiers + fichiers de planification. *(en cours)*
- **Phase 1** — Générer les stills du burger phare (GPT Image 2) : assemblé + éclaté, + catalogue + ambiance.
- **Phase 2** — Animer le reveal avec Seedance 2.0 (image → vidéo).
- **Phase 3** — Extraire la vidéo en séquence JPG avec ffmpeg.
- **Phase 4** — Construire le shell React/Vite + brand tokens + Lenis.
- **Phase 5** — Construire ScrollHero (scrubbing canvas lié au scroll).
- **Phase 6** — Construire catalogue + sections annexes.
- **Phase 7** — QA : performance, préchargement, responsive, vérifier que le scrub est fluide.

**Ne jamais démarrer une phase avant validation de la précédente.**

## 7. Checklist QA (Phase 7)

- [ ] Toutes les frames préchargées avant activation du scrub ; loader affiché jusqu'à prêt.
- [ ] Scrub fluide sur desktop (pas de saut de frame, pas de jank).
- [ ] Mobile : hero dégradé proprement (image hero statique si le scrub canvas est trop lourd).
- [ ] Chaque couleur utilisée vient des tokens ; aucun texte blanc pur.
- [ ] Deux familles de fontes seulement.
- [ ] CTA en `--amber` ; états hover définis.
- [ ] Images optimisées ; poids total de la séquence raisonnable.
- [ ] Parité de contenu FR / EN / IT.
- [ ] Score Lighthouse performance acceptable sur desktop.

## 8. Points ouverts à confirmer avant Phase 1

1. **Nom** : BurgerLab retenu (le skill ne mentionne que BurgerLab).
2. **Mobile** : fallback minimal (image statique) ou design mobile complet ?
3. **Copywriting réel** : titres, sous-titres, textes Story, descriptions des 5 burgers,
   horaires + adresse fictive — à fournir ou à proposer en premier jet FR.
4. **Emplacement du build** : sous-dossier `burgerlab/` ou racine du repo ?
