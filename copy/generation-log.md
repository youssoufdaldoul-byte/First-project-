# BurgerLab — Journal de génération (état de reprise Gate A)

> But : permettre à une **nouvelle session** (démarrée APRÈS déblocage de l'egress)
> de reprendre la génération d'images **sans re-générer le hero** ni gaspiller de crédits.
> Source de vérité : skill BurgerLab + `copy/image-prompts.md`.

## ⛔ Blocage actif — CDN Higgsfield refusé par la politique d'egress

- Host refusé : **`d8j0ntlcm91z4.cloudfront.net`** (403 CONNECT, policy denial).
- Conséquence : impossible de `curl` les images générées vers `assets/images/`.
- **Ne pas contourner** (règle du proxy). Correctif = allowlister le host dans la
  politique réseau de l'environnement (idéalement `*.cloudfront.net`), puis démarrer
  une **nouvelle session**.
- Vérifier avant de reprendre :
  `curl -sS -o /dev/null -w "%{http_code}" "<rawUrl_du_hero>"` → attendu `200`.

## Réglages de génération (fixés)
- Modèle : `gpt_image_2` (GPT Image 2)
- aspect_ratio : `16:9` · quality : `high` · resolution : `2k` (coût **7 crédits/image**)
- Style : realistic cinematic food advertising
- Règles image : **no text, no logos, no brand marks, no people, no hands**. Cohérence hero ↔ exploded.

## Crédits
- Départ session : 265 · Hero généré : −7 · **Restant : 258**
- Budget restant pour les 6 images : 6 × 7 = 42 crédits → solde projeté ~216.

## ✅ Hero DÉJÀ généré — NE PAS régénérer
- Fichier cible : `assets/images/hero-burger.png`
- **job_id : `3dd3dbb5-8ee2-4dbb-a1ef-32309d2190e8`**
- dims : 2688×1520 · 16:9 · high · 2k
- rawUrl (à re-récupérer frais via `job_display(id=…)` — les URLs peuvent expirer) :
  `https://d8j0ntlcm91z4.cloudfront.net/user_3FzneIW6DeCzXNNc7KNNfmQuLKf/hf_20260704_234118_3dd3dbb5-8ee2-4dbb-a1ef-32309d2190e8.png`
- Reprise : `job_display(id=3dd3dbb5-…)` → `curl` la rawUrl fraîche vers le chemin cible.

## Cibles restantes (6 images — chemins + prompts exacts)

Prompt suffixe commun à ajouter à chaque prompt ci-dessous :
`, realistic cinematic food advertising, no text, no logos, no brand marks, no people, no hands.`

| # | Fichier | Prompt (base) | Réf. | Statut |
|---|---------|---------------|------|--------|
| 2 | `assets/images/exploded-burger-reference.png` | The same gourmet burger separated into a vertical exploded view, each ingredient floating with even spacing — top bun, sauce, cheese, patty, onions, lettuce, base bun — deep charcoal background, warm amber lighting, sharp macro detail, premium product presentation | **medias:[{value:"3dd3dbb5-8ee2-4dbb-a1ef-32309d2190e8", role:"image"}]** (le hero) | ⏳ |
| 3 | `assets/images/ingredients-detail.png` | Ultra-premium macro food photography of gourmet burger ingredients arranged separately — sesame brioche bun, aged beef patty, melting cheese, caramelised onions, fresh lettuce, glossy sauce — deep charcoal near-black background, warm cinematic side lighting, faint smoke, sharp macro detail, luxury steakhouse mood | — | ⏳ |
| 4 | `assets/images/catalog-classic-stack.png` | Ultra-premium food photography of a signature gourmet beef burger, toasted brioche bun with sesame seeds, thick aged beef patty, melting cheese, glossy sauce — the house classic, centered composition on a deep charcoal near-black background, warm cinematic side lighting, faint smoke, macro detail, luxury steakhouse mood | — | ⏳ |
| 5 | `assets/images/catalog-smoky-bacon.png` | Ultra-premium food photography of a smoky bacon gourmet burger, crispy bacon strips, aged beef patty, melting cheese, caramelised onions, smoky glazed brioche bun, centered composition on a deep charcoal near-black background, warm cinematic side lighting, faint smoke, macro detail, luxury steakhouse mood | — | ⏳ |
| 6 | `assets/images/catalog-spicy-lab.png` | Ultra-premium food photography of a spicy signature burger, jalapeños, chili glaze, pepper jack cheese, aged beef patty, toasted brioche bun, fiery warm tones, centered composition on a deep charcoal near-black background, warm cinematic side lighting, faint smoke, macro detail, luxury steakhouse mood | — | ⏳ |
| 7 | `assets/images/catalog-truffle-melt.png` | Ultra-premium food photography of a luxury truffle melt burger, black truffle shavings, creamy truffle sauce, aged beef patty, melting cheese, brioche bun, earthy premium presentation, centered composition on a deep charcoal near-black background, warm cinematic side lighting, faint smoke, macro detail, luxury steakhouse mood | — | ⏳ |

## Ordre de reprise (après egress débloqué + nouvelle session)
1. Test CDN : `curl` la rawUrl du hero → si `200`, télécharger vers `assets/images/hero-burger.png`.
2. Générer #2 (exploded) en **référençant le hero par job_id** → télécharger.
3. Générer #3 à #7 → télécharger chacune à son chemin exact.
4. S'arrêter pour review (Gate A → review). **Aucune vidéo** (Gate B séparé).

## Garde-fous
- Ne pas générer de variations supplémentaires.
- Ne pas lancer Seedance / la vidéo (Gate B distinct, sur approbation).
- Ne pas construire le site.
