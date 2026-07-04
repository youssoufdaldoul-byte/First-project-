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

## Blocage réseau (TOUJOURS bloqué — 2026-07-04)
- Le CDN `d8j0ntlcm91z4.cloudfront.net` est refusé par la politique d'egress.
- Hypothèse précédente (« une session neuve prendra l'autorisation en compte ») **infirmée** :
  testé dans cette session neuve → toujours refusé.
- Test effectué : `curl -sS -o /dev/null -w "%{http_code}" <url_hero fraîche>`
  → `curl: (56) CONNECT tunnel failed, response 403` (HTTP 000, 0 octet).
- Diagnostic proxy (`$HTTPS_PROXY/__agentproxy/status`) :
  `connect_rejected` — `gateway answered 403 to CONNECT (policy denial or upstream failure)`
  pour `d8j0ntlcm91z4.cloudfront.net:443`.
- Conclusion : refus de **politique d'egress de l'organisation**, pas un problème TLS/CA.
  Ne pas réessayer ni contourner (règle du proxy : 403/407 = signaler l'hôte, pas de retry).
- **Action requise (hors session)** : ajouter `d8j0ntlcm91z4.cloudfront.net` (ou `*.cloudfront.net`)
  à la liste d'autorisation d'egress de l'environnement, puis relancer une session.
- Une fois débloqué : `curl … → 200`, puis enchaîner les téléchargements.

## Ordre de reprise
1. Test d'accès CDN (télécharger le hero → `assets/images/hero-burger.png`).
2. Générer l'exploded en référençant le hero (`medias:[{value:"<hero job_id>", role:"image"}]`).
3. Générer les 5 restantes (ingredients-detail + 4 catalogue).
4. Enregistrer chaque image au chemin exact, puis s'arrêter pour review (Gate step 2). **Pas de vidéo.**
