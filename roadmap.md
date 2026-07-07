# Roadmap — Brigade Verte (PWA signalements terrain)

> Feuille de route de développement. Objectif : avancer fonction par fonction, valider, puis passer à la suivante — pas de gros chantier d'un coup.

---

## État actuel (v2)

- Signalement terrain : type, photo(s), GPS, commentaire
- Fonctionnement hors ligne complet (IndexedDB + Service Worker)
- Carte de vérification/ajustement de position sur le formulaire (fonds Plan CartoDB / Satellite IGN), un seul signalement affiché à la fois
- Synchronisation : export JSON envoyé par mail → flux Power Automate → liste SharePoint (texte + GPS ; photos non encore incluses)

## Vision

Que la DMD dispose, sans ressaisie manuelle, d'une vue consolidée et fiable des signalements terrain — priorisables par urgence, exploitables en cartographie.

---

## Phase 1 — Prochaine étape (priorités validées)

| Fonction | Description | Ce que ça implique techniquement |
|---|---|---|
| **Carte globale des signalements** | Un écran carte affichant *tous* les signalements enregistrés sur le téléphone (pas seulement celui en cours de saisie), avec un code couleur | Nouvel écran dans l'app : lit tous les signalements stockés localement, place un marqueur pour chacun sur la carte (mêmes fonds Plan/Satellite déjà en place). Code couleur possible par statut (en attente / synchronisé) ou par urgence — à choisir ensemble |
| **Niveau d'urgence** | Chaque signalement peut être marqué « Routine » ou « Urgent » à la saisie | Ajout d'un champ dans le formulaire (deux boutons, sur le même principe que le choix du type). Répercuté dans l'export JSON, donc dans le flux Power Automate → une colonne « Urgence » à ajouter dans la liste SharePoint |

*Notion technique : le « code couleur » veut juste dire que le repère sur la carte change d'apparence selon une valeur — par ex. rouge vif si urgent, gris si routine. Rien de plus complexe qu'une condition « si… alors ».*

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

On traite un item de la Phase 1 à la fois. Pour démarrer, il faut juste trancher :

1. **Carte globale ou niveau d'urgence en premier ?**
2. Pour la carte globale : code couleur par **statut** (en attente/synchronisé) ou par **urgence** (une fois ce champ ajouté) ?

Dès que c'est tranché, je fournis les fichiers modifiés — comme pour la carte de vérification, en ciblant uniquement ce qui change.
