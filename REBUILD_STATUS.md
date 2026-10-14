# État de BeninPublio — 14 octobre 2026

## Version du dépôt
- Dépôt principal : https://github.com/Ernestdav2005/beninpublio
- Sauvegarde avant reconstruction : `backup/before-rebuild-2026-10-14`.
- La reconstruction et les limites des trois formules sont fusionnées dans `main`.
- Le secret GitHub Actions `CLOUDFLARE_API_TOKEN` a été confirmé présent par le propriétaire ; sa valeur n'est pas stockée dans ce document.

## Formules configurées côté serveur
- `formule_1` : 30 produits maximum, 1 image par produit.
- `formule_2` : 100 produits maximum, 3 images par produit.
- `formule_3` : 150 produits maximum, 3 images par produit.
- La formule 1 est appliquée par défaut.
- Les limites sont contrôlées côté API. Les créations de produits utilisent aussi une insertion SQL conditionnelle pour réduire les dépassements en cas de demandes simultanées.
- Les images sont actuellement ajoutées par liens HTTPS ; l'envoi direct depuis la galerie du téléphone reste à développer.
- Les prix, les noms commerciaux finaux et les paiements récurrents restent à définir.

## Migrations et précautions
- `migrations/0001_initial.sql` : création initiale idempotente des tables manquantes.
- `migrations/0002_beninpublio_core.sql` : champs de personnalisation des pages.
- `migrations/0003_product_plans_and_images.sql` : formule et champs d'images supplémentaires.
- Une base D1 de test séparée a été utilisée pour contrôler les colonnes et requêtes de migration.
- Les migrations de production sont exécutées par le workflow de déploiement avant la publication du Worker.
- Ne pas supprimer l'historique du Worker ni la branche de sauvegarde avant validation de la nouvelle version en production.
- Aucun script ne doit supprimer automatiquement les boutiques, les produits ou les utilisateurs.

## Contrôles automatiques
- `scripts/check-worker.mjs` contrôle la syntaxe du Worker, les scripts intégrés et la logique de formule.
- `.github/workflows/validate.yml` exécute les contrôles lors des pushs et pull requests.
- `.github/workflows/deploy.yml` vérifie le Worker, applique les migrations D1, puis publie le Worker sur Cloudflare.
- Un contrôle automatique de syntaxe ne remplace pas les tests de navigation et de permissions avec des comptes réels.

## Améliorations prévues
1. Vérifier le déploiement réel et les routes publiques après migration.
2. Ajouter des rôles à permissions limitées pour les partenaires créateurs de modèles.
3. Créer un système de duplication de structure de boutique : copier le modèle/la mise en page et les réglages autorisés, puis remplacer les données du client sans copier ses informations privées, ses identifiants ou ses commandes.
4. Ajouter un éditeur de sections, typographies, liens, produits populaires et packs.
5. Ajouter le téléversement direct des photos depuis le téléphone.

## État de publication
Le dernier déploiement Cloudflare observé est daté du 13 octobre 2026. La publication de la version actuelle du dépôt doit être confirmée par un nouveau déploiement et des vérifications post-déploiement. Ne pas déclarer la nouvelle version publiée avant ces contrôles.
