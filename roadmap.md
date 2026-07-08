# Roadmap — Brigade Verte (PWA signalements terrain)

> Feuille de route de développement. Objectif : avancer fonction par fonction, valider, puis passer à la suivante — pas de gros chantier d'un coup.

---

## État actuel (v4)

- Signalement terrain : type, photo(s), GPS, commentaire
- Niveau d'urgence (Routine / Urgent) à la saisie, répercuté dans l'export JSON
- Fonctionnement hors ligne complet (IndexedDB + Service Worker)
- Carte de vérification/ajustement de position sur le formulaire (fonds Plan CartoDB / Satellite IGN), un seul signalement affiché à la fois
- Carte globale de tous les signalements du téléphone, code couleur par urgence (rouge = urgent, vert = routine)
- Consultation du détail d'un signalement (photos, commentaire, position) et **suppression individuelle** avec annulation immédiate (undo)
- Synchronisation : export JSON envoyé par mail → flux Power Automate → liste SharePoint (texte + GPS ; photos non encore incluses)

## Vision

Que la DMD dispose, sans ressaisie manuelle, d'une vue consolidée et fiable des signalements terrain — priorisables par urgence, exploitables en cartographie.

---

## Livré depuis (anciennes priorités Phase 1)

- ✅ **Carte globale des signalements** — écran carte affichant tous les signalements du téléphone, code couleur par urgence.
- ✅ **Niveau d'urgence** — champ « Routine / Urgent » à la saisie, répercuté dans l'export JSON *(reste à ajouter une colonne « Urgence » dans la liste SharePoint côté flux Power Automate)*.
- ✅ **Suppression d'un signalement** — via l'écran détail, avec annulation immédiate.

## Phase 1 — Prochaine étape (priorités validées)

| Fonction | Description | Ce que ça implique techniquement |
|---|---|---|
| **Modifier un signalement** | Corriger un signalement déjà enregistré (type, urgence, lieu, commentaire, voire position/photos) sans le recréer | Réutilise l'écran détail déjà en place : un mode édition qui pré-remplit les champs puis réenregistre l'objet dans IndexedDB avec le même `id`. Attention : repasser le statut à « attente » pour qu'une correction soit resynchronisée |
| **Recherche / filtres de l'historique** | Filtrer la liste d'accueil par type, urgence ou statut (en attente / envoyé) | Filtrage côté page sur les signalements déjà chargés — utile surtout quand le nombre de signalements sur un téléphone devient important |

---

## Phase 2 — À prévoir ensuite (utile, pas urgent)

| Fonction | Description |
|---|---|
| **Photos dans le flux Power Automate** | Actuellement, les photos ne remontent vers la DMD que par export manuel. Objectif : les transférer automatiquement vers une bibliothèque de documents SharePoint, liée à chaque ligne de la liste. Plus technique que le flux texte (décodage des photos), fera l'objet d'un guide dédié le moment venu |

---

## En réserve — idées évoquées, non retenues pour l'instant

| Fonction | Pourquoi la garder de côté pour l'instant |
|---|---|
| Filtrer/rechercher dans l'historique local | Utile surtout si le nombre de signalements sur un téléphone devient important |
| Lier un signalement à un PDR/PAV existant (liste déroulante plutôt que texte libre) | Suppose d'abord de disposer d'une liste de référence propre des sites (VIACOL ou export PDR) à embarquer dans l'app |
| Gestion des doublons de synchronisation | Pertinent si un agent renvoie deux fois le même export par erreur |
| Alerte de stockage saturé sur le téléphone | Utile seulement si beaucoup de photos s'accumulent sans synchronisation pendant longtemps |

---

## Comment avancer

On traite un item de la Phase 1 à la fois. Prochain arbitrage :

1. **Modifier un signalement ou recherche/filtres en premier ?**

Dès que c'est tranché, je fournis les fichiers modifiés — en ciblant uniquement ce qui change.
