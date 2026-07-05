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
| 2 | `assets/images/exploded-burger-reference.png` | §2 (éclaté) + réf. hero par job_id | ✅ généré (à télécharger) | `e220371d-bce9-41da-8bec-38782921e619` |
| 3 | `assets/images/ingredients-detail.png` | ingrédients éclatés verticaux (régénéré) | ✅ généré (à télécharger) | `d9351e66-21f0-4781-9f1d-b9767d758844` |
| 4 | `assets/images/catalog-classic-stack.png` | base catalogue — classic stack | ✅ généré (à télécharger) | `f2b7f484-b6b7-48f3-b445-edb2512a81a4` |
| 5 | `assets/images/catalog-smoky-bacon.png` | base catalogue — smoky bacon | ✅ généré (à télécharger) | `7b61dd37-97db-4d27-8a95-60dc18cefbb5` |
| 6 | `assets/images/catalog-spicy-lab.png` | base catalogue — spicy lab | ✅ généré (à télécharger) | `f43406f1-8743-4961-8f9a-78e0f57c9bce` |
| 7 | `assets/images/catalog-truffle-melt.png` | base catalogue — truffle melt | ✅ généré (à télécharger) | `813a2588-2999-45bd-a9e3-d85fcad55395` |

## Hero déjà généré (ne pas régénérer)
- job_id : `9b72e3c4-85e4-4890-ae0b-df6b54cad7f3`
- dims : 2688×1520, 16:9, 2k, high
- Récupérer une URL fraîche via l'outil MCP `job_display(id=…)` puis `curl` vers `assets/images/hero-burger.png`.

## Catalogue + macro déjà générés — 2026-07-05 (ne pas régénérer)
- 5 stills en `gpt_image_2`, 16:9, quality high, 2k, dims 2688×1520.
- Descriptions selon brief utilisateur (burgers distincts), base visuelle commune (charcoal, warm side light, faint smoke, macro, no text/no people/no hands).
- Récupérer une URL fraîche via `job_display(id=…)` puis `curl` vers le chemin exact (CDN à débloquer d'abord — voir section réseau).
- Reste à générer : #2 exploded (`exploded-burger-reference.png`), à référencer le hero par job_id.
- `ingredients-detail` régénéré en vue éclatée verticale (ingrédients séparés empilés avec espace),
  nouveau job_id `d9351e66-21f0-4781-9f1d-b9767d758844`. Ancien tirage macro à plat abandonné
  (job `1aef7d17-9944-4b02-bc9c-09144a07b65a`, ne pas utiliser).

## Médias committés + renommés (2026-07-05)
- L'utilisateur a téléchargé les médias depuis Higgsfield et les a committés (branche review j5g689, noms génériques).
- Rapatriés et renommés aux chemins canoniques sur la branche de travail :
  hero-burger, lab-burger-cut (2e prise assemblée, patty tranché), catalog-classic-stack,
  catalog-smoky-bacon, catalog-spicy-lab, catalog-truffle-melt, ingredients-flat (ancien macro),
  ingredients-detail (éclaté vertical), + `assets/videos/burgerlab-scroll-background-raw.mp4`.
- `hero-burger.png` vérifié = première frame de la vidéo. `exploded-burger-reference.png`
  (e220371d) n'a pas été uploadé — non bloquant pour le site (la vidéo porte l'état éclaté).

## Phase build — Site web (2026-07-05)
- Site construit dans `website/` : Vite + React (JS), GSAP ScrollTrigger, Lenis, react-router.
- Séquence scrub : 145 frames JPG (1280w, ~15 Mo) extraites de la vidéo → `website/public/sequence/`.
- Images web optimisées (1600w + 800w JPG) → `website/public/img/`.
- Vérifié en prod (Playwright) : hero, scrub actes 1-2, catalog, 4 pages, i18n, mobile fallback.

## Gate B — Vidéo scroll-driven (2026-07-05)
- Fichier cible : `assets/videos/burgerlab-scroll-background-raw.mp4` (à télécharger + committer par l'utilisateur).
- job_id : `e47d39cf-0391-4f9d-882d-d4091770cc17` · type video.
- Modèle : **seedance_2_0_mini** (repli — `seedance_2_0` requiert plan Pro/Ultimate, 403 sur starter).
- Réglages : 12 s, 720p (1280×720), 16:9, bitrate high, audio off, genre auto.
- Références : start_image=hero `9b72e3c4…`, end_image=exploded `e220371d…`, image_references=hero `9b72e3c4…`.
- Concept : one-shot continu, Act 1 hero assemblé (push-in + orbit) → séparation verticale → Act 2 exploded, hold final.
- Ne pas re-encoder, ne pas builder le site : en attente de review.

## Crédits
- Départ : 272 · Hero : −7 · Catalogue+macro (5 × −7 = −35) · ingredients régénéré (−7) · exploded ref (−7) · vidéo Mini 12s (coût variable) · **Restant : ~216 avant coût vidéo — à confirmer**

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
