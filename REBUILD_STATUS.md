# État de la reconstruction — 14 octobre 2026

## Sécurité et environnement
- Sauvegarde du dépôt préservée : `backup/before-rebuild-2026-10-14`.
- Travail isolé sur `rebuild/foundation-v1`.
- La branche `main` et le Worker de production n'ont pas été modifiés par ces commits.
- Avant les changements de schéma, une exportation SQL de la base de production `beninpublio-db` a été demandée à Cloudflare. Le relevé de tables a confirmé 0 utilisateur, 0 boutique, 0 produit et 0 session.
- Base D1 de test séparée créée : `beninpublio-staging-20261014`. Les colonnes des migrations 0002 et 0003 ont été vérifiées sur cette base ; les essais n'ont pas touché la base de production.

## Fonctionnalités sur la branche
- Vitrine publique responsive BeninPublio.
- Création de pages boutique/restaurant, modèles, couleurs, présentation, WhatsApp de commande et photo de couverture.
- Éditeur propriétaire pour modifier les pages, changer la formule, enregistrer, publier/masquer, prévisualiser en privé et partager le lien/QR.
- Commandes WhatsApp avec message prérempli par produit.
- Trois formules gérées côté serveur :
  - `formule_1` : 30 produits maximum, 1 image par produit.
  - `formule_2` : 100 produits maximum, 3 images par produit.
  - `formule_3` : 150 produits maximum, 3 images par produit.
- La limite de produits est contrôlée dans l'API et l'insertion utilise une condition SQL pour réduire le risque de dépassement lors de créations simultanées.
- Les liens d'images de produits peuvent être fournis jusqu'à trois par produit selon la formule ; l'envoi direct depuis la galerie du téléphone n'est pas encore intégré.
- La formule 1 est la valeur par défaut. Les noms commerciaux définitifs, les prix et les paiements récurrents ne sont pas configurés faute de tarifs/choix confirmés.

## Migrations
- `migrations/0002_beninpublio_core.sql` ajoute les colonnes de personnalisation des pages.
- `migrations/0003_product_plans_and_images.sql` ajoute la formule et les deux emplacements d'image supplémentaires.
- `schema.sql` a été aligné pour une nouvelle installation.
- Les deux migrations ont été appliquées à la base de test séparée et les colonnes vérifiées.
- Aucune migration n'a encore été appliquée à la base de production.

## Contrôles et prévention des régressions
- Le Worker JavaScript passe le contrôle de syntaxe.
- Les quatre scripts intégrés aux interfaces passent le contrôle de syntaxe.
- Le fichier `scripts/check-worker.mjs` et le workflow GitHub Actions `.github/workflows/validate.yml` ont été ajoutés pour relancer ces contrôles sur les pushs et pull requests.
- Les requêtes SQL de détection d'images au-delà de la formule et d'insertion conditionnelle ont été testées sur la base de test.
- Aucun test navigateur de bout en bout avec une session administrateur/commerçant n'a encore été réalisé.

## Avant publication en production
- Exécuter le workflow de validation GitHub et corriger toute erreur.
- Tester sur la base de test la création, l'édition, les limites des trois formules, le changement de formule, l'aperçu, la publication, le QR, WhatsApp et l'isolation entre deux commerçants.
- Sauvegarder la base de production immédiatement avant migration.
- Appliquer les migrations de façon additive, puis déployer le Worker avec la liaison D1 correcte.
- Vérifier `/api/health`, la page publique et les routes authentifiées après déploiement.
- Préparer un retour arrière du Worker si le contrôle post-déploiement échoue. Ne jamais restaurer ou remplacer la base sans besoin confirmé.

## État
La version n'est pas encore publiée en production. Aucun déploiement de la nouvelle version n'a été effectué.
