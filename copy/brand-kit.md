# BurgerLab — Brand Kit

> Source de vérité : `SKILL.md` (BurgerLab scroll-driven motion website).
> Ce fichier traduit la direction du skill en tokens exploitables pour le build.

## 1. Positionnement de marque

**BurgerLab** est une marque fictive de burgers de **luxe « dark »**.
Le site doit ressentir comme une **campagne produit premium**, pas comme un template
de restaurant générique. Univers : steakhouse de luxe, mood Monaco, food-commerce
sombre et cinématique.

- **Idée maîtresse unique :** *le scroll contrôle un film de révélation de burger.*
- **Ton :** premium, sobre, sensoriel, confiant. Peu de mots, beaucoup d'air.
- **Ce qui est banni :** glassmorphism global, blanc pur, template resto générique,
  toute section qui ne sert ni la révélation scroll ni la marque.

## 2. Direction visuelle

Style : **dark food-commerce UI**. Traduction concrète :

- Fond graphite profond, presque noir.
- Cartes burger « flottantes » sur surface sombre.
- Formes circulaires subtiles en arrière-plan.
- Accents amber chaleureux (braise).
- Panneaux produit surélevés, conteneurs arrondis.
- Hiérarchie typographique claire, imagerie food haute en contraste.
- Traitement « glass » **uniquement** là où il ajoute de la profondeur (ex. nav flottante),
  jamais comme thème global.

## 3. Palette — Brand tokens

À reporter tel quel dans `src/styles/tokens.css` au moment du build.

```css
:root {
  /* Surfaces */
  --bg:        #10100F; /* Deep Charcoal   — fond de page (domine) */
  --bg-2:      #181816; /* Smoked Graphite — sections alternées */
  --surface:   #20201D; /* Card Black      — cartes, panneaux */

  /* Accents */
  --amber:     #C9772E; /* Braise           — accent principal, TOUS les CTA */
  --amber-2:   #E0A458; /* Caramel          — hover, détails */
  --gold:      #B8974A; /* Patina Gold      — logo, lignes premium */
  --meat:      #6E2A24; /* Braised Bordeaux — accent rare uniquement */

  /* Texte */
  --text:      #F2EAD9; /* Sesame Cream — texte principal */
  --text-dim:  #A89C88; /* Grey Beige   — légendes, secondaire */

  /* Système */
  --radius:    18px;
  --radius-sm: 12px;
  --maxw:      1200px;
  --ease:      cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Règles d'usage couleur (strictes)
- `--bg` **domine** toute la page.
- `--amber` pilote **tous les CTA et états actifs**.
- `--gold` signe les **moments premium** (logo, lignes fines).
- `--meat` s'utilise **avec parcimonie**, en accent rare seulement.
- Le texte est **toujours** `--text` sur fond sombre. **Jamais de blanc pur `#FFF`.**

## 4. Typographie

**Deux familles maximum.** Serif display pour les titres, sans propre pour le corps.

```css
--font-display: "Playfair Display", "Cormorant", serif;   /* titres */
--font-body:    "Inter", "Satoshi", sans-serif;           /* corps */

--fs-hero:    clamp(48px, 8vw, 104px);  /* titre hero, display */
--fs-h2:      clamp(32px, 4vw, 56px);   /* titres de section, display */
--fs-h3:      clamp(22px, 2.4vw, 28px);
--fs-body:    clamp(16px, 1.2vw, 18px);
--fs-caption: 14px;
```

Line-height généreux, beaucoup de whitespace — **le luxe respire.**

## 5. Langues

- **FR** (primaire) / **EN** / **IT**.
- Switcher discret par initiales (FR · EN · IT).
- Contenu structuré pour une traduction propre.
- **Parité de contenu** FR / EN / IT exigée (checklist QA).

## 6. Le catalogue (5 burgers)

Noms fixés par le skill, à conserver tels quels :

1. **LE PRIME**
2. **LE TRUFFE**
3. **LE ROYAL WAGYU**
4. **LE MÉDITERRANÉE**
5. **LE VÉGÉTAL PRIME**

Le **burger phare** de la révélation scroll est un seul burger BurgerLab
(cadré comme « l'assemblé hero »). Les 5 ci-dessus vivent dans les cartes catalogue.
