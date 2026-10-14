# État de BeninPublio — 14 octobre 2026

## Version du dépôt
- Dépôt principal : https://github.com/Ernestdav2005/beninpublio
- Sauvegarde avant reconstruction : `backup/before-rebuild-2026-10-14`.
- La reconstruction et les limites des trois formules sont fusionnées dans `main`.
- Le propriétaire indique avoir créé un secret Cloudflare pour le projet Boutiko. Cela ne prouve pas que le secret est configuré dans le dépôt BeninPublio.
- Le journal GitHub Actions du 14 octobre 2026 montre que `CLOUDFLARE_API_TOKEN` est transmis comme valeur vide au workflow BeninPublio. Le déploiement a donc échoué avant l'application des migrations. Ne pas déclarer la version publiée avant vérification.

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
- `.github/workflows/deploy.yml` vérifie le Worker, applique les migrations D1, puis publie le Worker.
- Un contrôle automatique de syntaxe ne remplace pas les tests de navigation et de permissions avec des comptes réels.

## Améliorations prévues
1. Corriger l'accès du workflow au secret Cloudflare du dépôt BeninPublio, puis confirmer migration et déploiement.
2. Vérifier les routes publiques après publication.
3. Ajouter des rôles à permissions limitées pour les partenaires créateurs de modèles.
4. Créer un outil d'import depuis URL qui analyse une boutique publique et génère une structure éditable inspirée de sa mise en page. Ne pas copier automatiquement du code, des textes, des photos, logos ou éléments propriétaires sans autorisation ; permettre l'utilisation des contenus fournis par le client.
5. Ajouter un éditeur de sections, typographies, liens, produits populaires et packs.
6. Ajouter le téléversement direct des photos depuis le téléphone.

## État de publication
Le dernier déploiement Cloudflare confirmé est daté du 13 octobre 2026. Le workflow de déploiement du 14 octobre a échoué car `CLOUDFLARE_API_TOKEN` était vide dans l'environnement. La version actuelle du dépôt n'est pas confirmée en production. Ne pas supprimer la version actuellement servie avant une publication réussie et un contrôle du site.
