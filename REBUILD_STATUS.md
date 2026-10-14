# État de la reconstruction — 14 octobre 2026

## Travail réalisé sur la branche `rebuild/foundation-v1`
- Création de la sauvegarde `backup/before-rebuild-2026-10-14`.
- Création de la branche isolée `rebuild/foundation-v1`.
- Ajout de `REBUILD_PLAN.md` : objectifs, règles de sécurité, architecture cible, étapes et critères de validation.
- Première refonte de la vitrine publique dans `src/worker.js` : présentation des services, aperçu de boutique, explication du parcours, accès à la connexion, mise en page responsive et identité visuelle plus aboutie.

## Ce qui n'est PAS encore fait
- La nouvelle vitrine n'est pas publiée en production : `main` n'a pas été modifiée.
- Le nouveau tableau de bord propriétaire n'est pas encore implémenté.
- L'éditeur visuel de pages/modèles n'est pas encore implémenté.
- L'envoi de photos depuis un téléphone, le QR code et le flux de commande complet doivent encore être réalisés ou validés.
- Aucune migration ou suppression de données n'a été exécutée.
- La nouvelle interface doit passer une vérification de syntaxe, de routes et de rendu avant fusion.

## Prochaine étape technique
Examiner le worker et le schéma actuels, puis organiser les routes et les fonctions en modules lisibles sans changer le comportement d'authentification ni la structure de données avant que les dépendances aient été vérifiées. Ensuite, construire le nouvel espace propriétaire et un premier parcours de création de page de bout en bout.
