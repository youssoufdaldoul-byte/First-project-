# BurgerLab — Plan des assets média

> Source de vérité : `SKILL.md`. Pipeline média :
> **GPT Image 2 (stills)** → **Seedance 2.0 (motion)** → **ffmpeg (frames)**.
> Aucune génération n'est lancée tant qu'elle n'est pas explicitement validée, phase par phase.

## 1. Chaîne de production

```
GPT Image 2 / Nano Banana Pro      Seedance 2.0            ffmpeg (local)
   (images fixes)          →       (image → vidéo)   →     (séquence JPG)
        │                               │                        │
   assets/images/                assets/videos/           public/sequence/
```

- **Images :** GPT Image 2 (`gpt_image_2`) en primaire · Nano Banana Pro
  (`nano_banana_2`) en fallback quand un détail précis doit être maîtrisé
  (placement des graines de sésame, ordre exact des couches, logo sur l'emballage).
- **Vidéo :** Seedance 2.0 (`seedance_2_0`), image → vidéo. Anime une image existante,
  ne construit pas une scène depuis du texte.
- **Frames :** ffmpeg local, séquence JPG `frame_%04d.jpg`.

## 2. Inventaire des assets à générer

### A. Stills du burger phare (Phase 1)
Deux états clés pour donner à Seedance des ancres propres à animer :

| ID | Description | État | Modèle | Fichier cible |
|----|-------------|------|--------|---------------|
| `hero-assembled` | Burger assemblé, cadrage hero (frame de départ du film) | Assemblé | GPT Image 2 | `assets/images/hero-assembled.jpg` |
| `hero-exploded`   | Même burger en vue éclatée verticale (état cible du reveal) | Éclaté | GPT Image 2 | `assets/images/hero-exploded.jpg` |

> Fallback Nano Banana Pro si le layering/sésame doit être exact.

### B. Stills catalogue (Phase 1) — même éclairage
| ID | Burger | Fichier cible |
|----|--------|---------------|
| `cat-prime`         | LE PRIME          | `assets/images/cat-prime.jpg` |
| `cat-truffe`        | LE TRUFFE         | `assets/images/cat-truffe.jpg` |
| `cat-royal-wagyu`   | LE ROYAL WAGYU    | `assets/images/cat-royal-wagyu.jpg` |
| `cat-mediterranee`  | LE MÉDITERRANÉE   | `assets/images/cat-mediterranee.jpg` |
| `cat-vegetal-prime` | LE VÉGÉTAL PRIME  | `assets/images/cat-vegetal-prime.jpg` |

### C. Stills d'ambiance (Phase 1) — sections Story / Experience
| ID | Usage | Fichier cible |
|----|-------|---------------|
| `amb-story`      | Section Story, visuel à côté du texte serif | `assets/images/amb-story.jpg` |
| `amb-experience` | Section Experience, mood venue / Monaco | `assets/images/amb-experience.jpg` |

### D. Film de révélation (Phase 2)
| ID | Source | Modèle | Fichier cible |
|----|--------|--------|---------------|
| `reveal` | `hero-assembled` | Seedance 2.0 | `assets/videos/reveal.mp4` |

### E. Séquence de frames (Phase 3)
| ID | Source | Outil | Cible |
|----|--------|-------|-------|
| `sequence` | `reveal.mp4` | ffmpeg | `public/sequence/frame_0001.jpg … frame_0180.jpg` |

## 3. Cibles techniques

- **Frames :** 120–180 images, largeur **1600px**, JPG qualité ~80 (`-q:v 3`), fps 30.
- Bon équilibre poids / fluidité du scrub.
- Si la vidéo produit plus de frames → échantillonner à la baisse.
  Si moins → **regénérer une vidéo plus longue** dans Seedance (baisser le fps n'aide pas).
- Précharger **toutes** les frames avant d'activer le scrub ; loader affiché jusqu'à prêt.

## 4. Organisation locale

- `assets/images/`      → stills GPT Image 2 / Nano Banana Pro (source)
- `assets/videos/`      → vidéo(s) Seedance source + encodée
- `assets/references/`  → références de direction (jamais copiées telles quelles)
- Au build, les frames extraites vivront dans `public/sequence/` du projet Vite.

## 5. Garde-fous crédits

- **Aucun crédit Higgsfield dépensé** tant que la génération n'est pas explicitement demandée.
- Générer par lots, valider chaque état avant de passer à la vidéo.
- Ne pas régénérer un asset validé sans raison.
