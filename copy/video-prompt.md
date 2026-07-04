# BurgerLab — Concept vidéo (Seedance 2.0, image → vidéo)

> Source de vérité : `SKILL.md`. Cette vidéo n'est **pas** encore générée.
> Modèle : **Seedance 2.0** (`seedance_2_0`).

## 1. Principe

Seedance **anime une image existante** ; il ne construit pas une scène à partir de texte.
On lui fournit le still **`hero-assembled`** (burger assemblé) et on décrit **uniquement le mouvement**.

- **Input image :** `assets/images/hero-assembled.jpg`
- **Output :** `assets/videos/reveal.mp4`

## 2. Prompt de mouvement

```
Slow cinematic vertical explosion of the burger: the ingredients separate smoothly
and float apart into a layered exploded view, gentle rotation, fine rising smoke,
soft warm highlights moving across the sauce, fluid and hypnotic, background unchanged.
```

## 3. Direction de réalisation

- **Caméra calme.** C'est le **scroll** qui donne le rythme, pas la vidéo.
- Le fond reste **inchangé** (deep charcoal) — seuls les ingrédients bougent.
- Mouvement **fluide et hypnotique**, séparation verticale régulière.
- Rendre une durée **assez longue pour extraire une séquence dense** ;
  quelques secondes suffisent — le scrub étirera le temps.

## 4. Continuité avec la Phase 3 (ffmpeg)

L'objectif de longueur/densité est dicté par la cible de frames :
- Viser **120–180 frames** après extraction à fps 30.
- Si l'extraction donne trop de frames → échantillonner à la baisse.
- Si trop peu → **regénérer une vidéo plus longue** dans Seedance
  (baisser le fps à l'extraction n'aide pas).

## 5. Extraction associée (rappel, exécutée en Phase 3)

```bash
ffmpeg -i assets/videos/reveal.mp4 -vf "scale=1600:-1,fps=30" \
  -q:v 3 public/sequence/frame_%04d.jpg
```
