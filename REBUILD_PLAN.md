# BeninPublio — Reconstruction propre

## Objectif
Reconstruire le code et les interfaces de BeninPublio autour d'un créateur visuel de boutiques et de pages de restaurants. Cette branche ne remplace pas encore la version publiée.

## Protection de l'existant
- Sauvegarde Git : `backup/before-rebuild-2026-10-14`.
- Branche de travail : `rebuild/foundation-v1`.
- La branche `main` et le déploiement en production ne sont pas modifiés par cette étape.
- Aucune table ni donnée Cloudflare D1 n'est supprimée.
- La base `beninpublio-db` doit être inspectée et sauvegardée avant toute migration destructive.
- Ne jamais connecter ce projet à `boutiko-db`.

## Produit visé

### Espaces séparés
1. **Vitrine publique** : présentation de BeninPublio, exemples, services et bouton de connexion propriétaire.
2. **Espace propriétaire** : création de pages, clients, boutiques, restaurants, modèles, accès, publication et QR codes.
3. **Espace commerçant** : gestion simple des informations de sa boutique, produits ou menu, photos, prix, disponibilité et aperçu.
4. **Pages publiques générées** : une URL unique par commerce, adaptée au téléphone, avec bouton WhatsApp et QR code partageable.

### Éditeur visuel
- Modèles de départ et page vierge.
- Sections configurables : couverture, présentation, galerie, produits, menu, horaires, coordonnées, avis et appel à l'action.
- Réglages de couleurs, typographies, espacements, images et ordre des sections.
- Aperçu téléphone/ordinateur.
- Brouillon et publication explicite.
- Un schéma de page versionné et validé côté serveur ; aucun code arbitraire exécuté depuis les pages clients.

### Connexion et WhatsApp
- Le numéro de téléphone est l'identifiant de connexion ; il ne prouve pas à lui seul l'identité.
- Conserver un mécanisme de mot de passe sécurisé ou intégrer plus tard une vérification OTP fiable.
- Ne jamais mettre le numéro administrateur ni un secret dans le JavaScript public.
- Les boutons de commande ouvrent `https://wa.me/<numéro>` avec un message prérempli. Le client confirme lui-même l'envoi.
- Séparer le numéro de connexion du numéro public de commande si le propriétaire le souhaite.

## Principes de données et sécurité
- Rôles explicites : propriétaire, commerçant.
- Chaque requête commerçant dérive son identifiant de commerce de la session authentifiée, jamais d'un identifiant envoyé par le navigateur.
- Vérification des rôles côté serveur pour chaque action.
- Suspension d'un compte distincte de suppression de données.
- Validation côté serveur de tous les champs et URLs.
- Sessions HttpOnly, Secure, SameSite ; hachage fort des mots de passe ; limitation des tentatives de connexion.
- Images : upload géré vers un stockage dédié ou URL validée ; ne pas exiger qu'un commerçant sache héberger une image.
- Journaliser les actions administratives importantes sans stocker de mots de passe, jetons ou secrets.

## Modèle de données cible (à valider avant migration)
- `users` : numéro normalisé, hash de mot de passe, rôle, statut.
- `shops` : propriétaire, nom, slug, type (boutique/restaurant), statut, numéro WhatsApp public.
- `pages` : commerce, version de configuration, brouillon/publié, date de publication.
- `templates` : nom, type, aperçu, configuration JSON validée, version.
- `products` : commerce, nom, description, prix FCFA, images, visibilité, ordre.
- `sessions` : hash du jeton, utilisateur, expiration.
- `settings` : identité visuelle et réglages de la plateforme.
- Tables supplémentaires seulement si une fonction réelle les nécessite.

Le schéma existant contient une colonne `email` technique et les tables `shops`, `users`, `products`, `sessions` et `settings`. Il ne faut pas les supprimer aveuglément : examiner les contraintes, les références et les lignes présentes avant de concevoir une migration.

## Étapes de réalisation
1. **Audit et sauvegarde** : relever toutes les routes, tables, secrets de configuration (sans afficher leurs valeurs), liaisons Cloudflare et méthode de déploiement.
2. **Fondation** : organiser le code en modules lisibles, définir les rôles, la validation, la gestion d'erreurs et le schéma cible.
3. **Interface propriétaire** : construire le tableau de bord et le parcours de création d'un commerce.
4. **Éditeur et modèles** : assembler, personnaliser, prévisualiser et publier les pages.
5. **Espace commerçant** : parcours téléphone simple, photos, produits/menu et aperçu.
6. **Livraison** : URL publique, QR code, commande WhatsApp.
7. **Tests** : parcours complet, permissions entre deux comptes, suspension, affichage mobile, validation, tests de routes et de déploiement.
8. **Migration et publication** : uniquement après sauvegarde vérifiée et tests réussis ; réinitialisation des données seulement si l'audit confirme qu'elle est nécessaire.

## Critères de validation
- Un propriétaire peut créer une boutique ou un restaurant sans écrire de code.
- Le commerçant ajoute une photo depuis son téléphone et son produit apparaît après publication.
- Un commerçant ne peut jamais lire ou modifier les données d'un autre.
- Le bouton de commande ouvre le bon numéro WhatsApp avec les informations utiles.
- Le QR code pointe vers la bonne page publique.
- Une suspension bloque l'accès privé sans effacer les données.
- L'application publiée est testée en conditions réelles avant d'être déclarée prête.
