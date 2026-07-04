# BurgerLab — Prompts d'image (GPT Image 2 / Nano Banana Pro)

> Source de vérité : `SKILL.md`. Ces prompts ne sont **pas** encore exécutés.
> Primaire : **GPT Image 2** (`gpt_image_2`). Fallback détail précis : **Nano Banana Pro** (`nano_banana_2`).
> Direction constante : deep charcoal near-black background, warm cinematic lighting,
> macro detail, luxury steakhouse mood, **no text**.

## 1. Burger phare — état assemblé (`hero-assembled`)
Frame de départ du film. Ancre principale pour Seedance.

```
Ultra-premium food photography of a gourmet gastronomic burger, toasted golden
brioche bun with sesame seeds, thick aged beef patty cooked medium, melting cheese,
caramelised onions, glossy sauce drips, centered composition on a deep charcoal
near-black background, warm cinematic side lighting, faint smoke, macro detail,
luxury steakhouse mood, no text.
```

## 2. Burger phare — état éclaté (`hero-exploded`)
État cible de la révélation. Même burger, désassemblé verticalement.

```
The same gourmet burger separated into a vertical exploded view, each ingredient
floating with even spacing — top bun, sauce, cheese, patty, onions, lettuce,
base bun — deep charcoal background, warm amber lighting, sharp macro detail,
premium product presentation, no text.
```

> **Fallback Nano Banana Pro** recommandé ici si l'espacement des couches ou le
> placement du sésame doit être contrôlé précisément.

## 3. Stills catalogue — même éclairage
Base commune à réutiliser, en remplaçant `{DESCRIPTION}` pour chaque burger.

```
Ultra-premium food photography of {DESCRIPTION}, centered composition on a deep
charcoal near-black background, warm cinematic side lighting, faint smoke, macro
detail, luxury steakhouse mood, no text.
```

| Fichier | `{DESCRIPTION}` |
|---------|-----------------|
| `cat-prime`         | a signature gourmet beef burger, toasted brioche bun with sesame seeds, thick aged beef patty, melting cheese, glossy sauce — the house classic |
| `cat-truffe`        | a luxury truffle burger, black truffle shavings, creamy truffle sauce, aged beef patty, brioche bun, earthy premium presentation |
| `cat-royal-wagyu`   | a wagyu beef burger, marbled wagyu patty, seared golden crust, melted cheese, brioche bun, opulent presentation |
| `cat-mediterranee`  | a Mediterranean burger, grilled vegetables, feta, olive tapenade, herbs, beef patty, brioche bun, fresh and warm mood |
| `cat-vegetal-prime` | a premium plant-based burger, grilled vegetal patty, fresh greens, roasted vegetables, artisan bun, elegant vegetal presentation |

## 4. Stills d'ambiance
Pour les sections Story et Experience — décor, pas de burger en gros plan.

`amb-story`
```
Cinematic ambient still for a luxury burger brand story, dark graphite kitchen /
plating scene, warm amber light, faint smoke, shallow depth of field, premium
editorial mood, no burger centered, no text.
```

`amb-experience`
```
Cinematic ambient still of an upscale dark dining venue, Monaco luxury mood,
warm amber accent lighting, deep charcoal tones, elegant and moody atmosphere,
no people foregrounded, no text.
```

## 5. Contraintes transverses (toutes les images)
- Fond : deep charcoal / near-black (`#10100F` mood).
- Lumière : warm cinematic side lighting, faint smoke.
- Détail : macro, haute netteté sur la nourriture.
- **Jamais de texte incrusté** (le texte est géré en HTML/CSS au build).
- Cadrage centré pour les produits ; ambiance décentrée pour Story/Experience.
- Cohérence d'éclairage entre TOUS les stills (même univers).
