# BurgerLab — Journal de génération (état de reprise)

> But : permettre à une **nouvelle session** de reprendre la génération d'images
> sans re-générer ni gaspiller de crédits. Mis à jour à chaque étape.

## Réglages de génération (fixés)
- Modèle : `gpt_image_2` (GPT Image 2)
- Aspect ratio : `16:9`
- Quality : `high`
- Resolution : `2k` (coût ~7 crédits/image)
- Style : realistic cinematic food advertising
- Règles : no text, no logos, no brand marks, no people, no hands. Cohérence hero ↔ exploded.

## Cibles (7 stills — chemins exacts)
| # | Fichier | Prompt (source) | Statut | job_id |
|---|---------|-----------------|--------|--------|
| 1 | `assets/images/hero-burger.png` | image-prompts.md §1 (assemblé) | ✅ généré (à télécharger) | `9b72e3c4-85e4-4890-ae0b-df6b54cad7f3` |
| 2 | `assets/images/exploded-burger-reference.png` | §2 (éclaté) + réf. hero par job_id | ⏳ à générer | — |
| 3 | `assets/images/ingredients-detail.png` | macro ingrédients (voir image-prompts) | ⏳ | — |
| 4 | `assets/images/catalog-classic-stack.png` | base catalogue — classic stack | ⏳ | — |
| 5 | `assets/images/catalog-smoky-bacon.png` | base catalogue — smoky bacon | ⏳ | — |
| 6 | `assets/images/catalog-spicy-lab.png` | base catalogue — spicy lab | ⏳ | — |
| 7 | `assets/images/catalog-truffle-melt.png` | base catalogue — truffle melt | ⏳ | — |

## Hero déjà généré (ne pas régénérer)
- job_id : `9b72e3c4-85e4-4890-ae0b-df6b54cad7f3`
- dims : 2688×1520, 16:9, 2k, high
- Récupérer une URL fraîche via l'outil MCP `job_display(id=…)` puis `curl` vers `assets/images/hero-burger.png`.

## Crédits
- Départ : 272 · Hero : −7 · **Restant : 265**

## Blocage réseau (résolu par session neuve)
- Le CDN `d8j0ntlcm91z4.cloudfront.net` était refusé par la politique d'egress.
- L'autorisation a été ajoutée mais **n'est prise en compte que par une session démarrée après**.
- Dans une nouvelle session : tester d'abord `curl -sS -o /dev/null -w "%{http_code}" <url_hero>` ; si `200`, enchaîner les téléchargements.

## Ordre de reprise
1. Test d'accès CDN (télécharger le hero → `assets/images/hero-burger.png`).
2. Générer l'exploded en référençant le hero (`medias:[{value:"<hero job_id>", role:"image"}]`).
3. Générer les 5 restantes (ingredients-detail + 4 catalogue).
4. Enregistrer chaque image au chemin exact, puis s'arrêter pour review (Gate step 2). **Pas de vidéo.**
