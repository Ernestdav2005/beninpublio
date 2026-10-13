# BeninPublio

**Vos activités en ligne, simplement.**

BeninPublio est une application indépendante de Boutiko pour créer des vitrines en ligne pour les commerces, restaurants et petites entreprises.

## Fonctionnalités déployées
- Accueil public et connexion.
- Première configuration protégée pour créer un compte administrateur.
- Espace administrateur : créer une boutique, un compte commerçant et un mot de passe provisoire.
- Espace commerçant adapté au téléphone : ajouter, modifier, masquer, publier et supprimer ses produits.
- Boutique publique à l'adresse `/boutique/<adresse-courte>`, actualisée directement depuis la base de données.
- Prix en FCFA, description et URL d'image publique facultative.
- Connexion avec le numéro WhatsApp et mot de passe.
- Sessions en cookie HttpOnly, Secure et SameSite=Strict ; mots de passe hachés avec PBKDF2 ; sessions stockées sous forme de hash.
- Isolation par boutique côté serveur : les opérations produit sont limitées à l'identifiant de boutique tiré de la session authentifiée.

## Adresses
- Accueil : `/`
- Première configuration administrateur : `/setup` (à faire une seule fois)
- Connexion : `/login`
- Espace administrateur : `/admin`
- Espace commerçant : `/espace`
- Boutique publique : `/boutique/<slug>`
- Vérification technique : `/api/health`

## Base de données
La base Cloudflare D1 `beninpublio-db` est réservée à ce projet. Le schéma se trouve dans `schema.sql`. **Ne pas utiliser la base `boutiko-db`**.

## Première configuration
1. Ouvrir `/setup` sur le domaine de BeninPublio.
2. Saisir le code de configuration transmis séparément.
3. Choisir le numéro WhatsApp administrateur et un mot de passe unique d'au moins 12 caractères.
4. Se connecter sur `/login`, puis créer les boutiques et fournir le numéro WhatsApp et le mot de passe provisoire aux commerçants.
5. Conseiller aux commerçants de changer leur mot de passe provisoire après leur première connexion.

## Limites connues à cette étape
- Les photos de produits se saisissent actuellement via un lien HTTPS public ; l'envoi direct de photos depuis le téléphone et le partage automatique des identifiants par e-mail/WhatsApp ne sont pas encore intégrés.
- L'application a été publiée sur Cloudflare Workers. Le test HTTP direct depuis l'environnement de développement n'a pas pu être exécuté, car celui-ci n'a pas d'accès DNS sortant ; une vérification finale dans le navigateur est donc encore nécessaire avant de confier des comptes à des clients.

## Sécurité
Ne jamais placer de secret dans le dépôt GitHub ni dans le navigateur. Ne pas réutiliser ou modifier les ressources de Boutiko. Les tests de sécurité multi-comptes et le parcours réel de bout en bout doivent être effectués avant une utilisation commerciale à grande échelle.
