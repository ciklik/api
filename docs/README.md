# Ciklik API

# Bienvenue sur l'API Ciklik. Vous pouvez l'utiliser pour accéder aux ressources de votre compte, ou lancer des actions de base.
## API Endpoints
The base endpoint is https://{environment}.ciklik.co/api/v3
## Authentification
L'API s'authentifie par un jeton d'API Ciklik (jeton opaque, ce n'est pas un JWT) envoyé dans l'en-tête `Authorization: Bearer`.

Exemple :
  ```curl
  curl --location 'https://{environment}.ciklik.co/api/v3/whoiam' --header 'Authorization: Bearer <Ciklik Token>'
  ```

Une requête sans jeton ou avec un jeton invalide reçoit `401` ; un jeton valide qui n'a pas accès à la ressource reçoit `403`.
## Request Limit
Le nombre de requêtes est limité à 200 par minute, compté par adresse IP (toutes les requêtes émises depuis la même adresse IP partagent ce quota). Si la limite est atteinte, la réponse http sera `429 Too Many Requests`.
## Filtres
Certains endpoints de l'API prennent en charge le filtrage des résultats sur un ensemble spécifié de champs. Chaque endpoint qui prend en charge le filtrage énumérera les champs qui peuvent être filtrés. Plusieurs champs peuvent être combinés en utilisant un caractère esperluette &

Exemple: `/subscriptions?filter[activated]=1&filter[created_at_after]=2026-01-01&sort=-created_at`

Un filtre ou un tri qui n'est pas dans la liste de l'endpoint est refusé avec une réponse `400 Bad Request` (les endpoints qui valident eux-mêmes le paramètre `sort` répondent `422` pour un tri hors liste). Une valeur de filtre au mauvais format peut être refusée en `422`.
## Pagination
Les listes de résultats de l'API sont paginées. La pagination est fixe : 20 éléments par page, quelle que soit la valeur d'un éventuel paramètre `per_page` (ignoré). Vous pouvez obtenir les différentes pages avec la query string `page`, default value `1`.

Le nombre total d'éléments dans une liste est disponible dans le champ `meta.total`.

Exemple: `?page=2`

Base : `https://app.ciklik.co/api/v3` (environnement de démonstration : `https://demonstration.ciklik.co/api/v3`).

Authentification : en-tête `Authorization: Bearer <jeton>`, jeton fourni par Ciklik pour chaque site.

```bash
curl https://app.ciklik.co/api/v3/whoiam \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

## Ressources

- [tenant](tenant.md) : Opérations liées à l'entité "Website".
- [products](products.md) : Opérations liées aux produits
- [webhooks](webhooks.md) : Opérations liées aux webhooks
- [subscriptions](subscriptions.md) : Opérations liées aux abonnements
- [deliveries](deliveries.md) : Opérations liées aux bons de livraison
- [kpis](kpis.md) : Opérations liées aux indicateurs de performance
- [addresses](addresses.md) : Opérations liées aux adresses
- [customers](customers.md) : Opérations liées aux comptes utilisateurs
- [transactions](transactions.md) : Opérations liées aux transactions
- [rebill-errors](rebill-errors.md) : Opérations liées aux erreurs de rebill
- [orders](orders.md) : Opérations liées aux commandes
