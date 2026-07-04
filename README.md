# BurgerLab — Site web animé (scroll-driven)

Landing page single-page, **scroll-driven** et cinématique pour **BurgerLab**, marque
fictive de burgers de luxe « dark ». Une seule idée porte le site :

> **Le scroll contrôle un film de révélation de burger.**

Le burger phare se désassemble en vue éclatée verticale puis se réassemble, scrubé
image par image (Lenis + GSAP ScrollTrigger) sur un `<canvas>` plein écran.

## Statut

**Phase 0.5 — Workspace initial.** Dossiers et fichiers de planification créés.
Aucun média généré, aucun crédit dépensé, site non construit.

## Structure du workspace

```
.
├─ assets/
│  ├─ images/       # stills GPT Image 2 / Nano Banana Pro (à venir)
│  ├─ videos/       # vidéo(s) Seedance source + encodées (à venir)
│  └─ references/   # références de direction visuelle
├─ copy/
│  ├─ brand-kit.md      # identité, palette, typo, langues, catalogue
│  ├─ asset-plan.md     # inventaire média + pipeline de production
│  ├─ image-prompts.md  # prompts GPT Image 2 / Nano Banana Pro
│  ├─ video-prompt.md   # concept vidéo Seedance 2.0
│  └─ website-brief.md  # structure des sections + mécanisme scroll + workflow
├─ scripts/         # scripts d'encodage/extraction ffmpeg (à venir)
└─ README.md
```

## Stack (au build)

Vite + React (TypeScript) · Lenis · GSAP + ScrollTrigger · Higgsfield MCP
(GPT Image 2 → Seedance 2.0) · ffmpeg.

## Pipeline média

```
GPT Image 2 (stills) → Seedance 2.0 (motion) → ffmpeg (séquence JPG) → canvas scrub
```

## Workflow par phases

| Phase | Objet | Statut |
|-------|-------|--------|
| 0 | Lire le skill, confirmer, signaler les manques | ✅ fait |
| 0.5 | Workspace : dossiers + fichiers de planification | ✅ ce commit |
| 1 | Stills burger phare + catalogue + ambiance (GPT Image 2) | ⏳ en attente de validation |
| 2 | Film de révélation (Seedance 2.0) | ⏳ |
| 3 | Extraction en séquence JPG (ffmpeg) | ⏳ |
| 4 | Shell React/Vite + tokens + Lenis | ⏳ |
| 5 | ScrollHero (scrubbing canvas) | ⏳ |
| 6 | Catalogue + sections annexes | ⏳ |
| 7 | QA : perf, préchargement, responsive, fluidité | ⏳ |

**Règle :** ne jamais démarrer une phase avant validation de la précédente.

## Source de vérité

Le skill **BurgerLab** (document de référence du projet). Les fichiers de `copy/`
en sont la traduction opérationnelle. En cas de doute, le skill prime.
