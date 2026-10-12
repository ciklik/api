# products

Opérations liées aux produits

## Récupérer une liste de produits

`GET /products`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[id]` | query | integer | non | Filtrer par ID du produit |
| `filter[name]` | query | string | non | Filtrer par nom du produit |
| `filter[id_category]` | query | integer | non | Filtrer par ID de catégorie |
| `filter[quantity]` | query | integer | non | Filtrer par quantité |
| `filter[price]` | query | number | non | Filtrer par prix |
| `filter[active]` | query | boolean | non | Filtrer par état d'activité |
| `filter[slug]` | query | string | non | Filtrer par slug |
| `filter[virtual_product]` | query | boolean | non | Filtrer par produit virtuel (correspondance exacte) |
| `filter[salable]` | query | boolean | non | Filtrer par produit vendable |
| `filter[gift_card]` | query | boolean | non | Filtrer par carte cadeau |
| `filter[gift_plan]` | query | string | non | Filtrer par plan cadeau (UUID du plan, correspondance partielle) |
| `filter[disable_seo]` | query | boolean | non | Filtrer par désactivation SEO (correspondance exacte) |
| `filter[ref]` | query | string | non | Filtrer par référence |
| `filter[composable]` | query | boolean | non | Filtrer par composable |
| `sort` | query | string | non | Trier les résultats (ex: -name pour un tri descendant). Tri par défaut : `-id` (plus récent en premier). |
| `page` | query | integer | non | Numéro de la page pour la pagination |
| `per_page` | query | integer | non | Ignoré. La pagination est fixe à 20 éléments par page. |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/products" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "position": 1,
      "short_description": "string",
      "description": "string",
      "meta_title": "string",
      "meta_description": "string",
      "id_category": 1,
      "quantity": 1,
      "price": 9.9,
      "tax": 0,
      "active": true,
      "virtual_product": true,
      "salable": true,
      "gift_card": true,
      "gift_plan": "string",
      "disable_seo": true,
      "ref": "string",
      "external_id": "string",
      "offers": [
        {
          "id": 1,
          "quantity": 1,
          "percent_off": 9.9,
          "price": 9.9,
          "active": true,
          "product_id": 1,
          "deleted_at": "string",
          "tenant_id": 1
        }
      ],
      "frequencies": [
        {
          "id": 1,
          "interval": "string",
          "interval_count": 1,
          "tenant_id": 1,
          "pivot": {
            "product_id": 1,
            "composable_frequence_id": 1
          }
        }
      ]
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": "string",
        "label": "string",
        "active": true
      }
    ],
    "path": "string",
    "per_page": 1,
    "to": 1,
    "total": 1
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Créer ou mettre à jour un produit

`POST /products`

Crée le produit, ou le met à jour s'il existe déjà. Le produit est cherché par `external_id` s'il est fourni, sinon par `ref`.

Deux formes de corps sont acceptées :
- un produit seul (champs à la racine) : la réponse contient le produit dans `data`, avec le statut `201` s'il vient d'être créé et `200` s'il a été mis à jour ;
- un lot `{"products": [...]}` : chaque élément suit le schéma d'un produit seul, la réponse contient la liste des produits dans `data` avec le statut `200`.

À chaque enregistrement par cette route, le `slug` du produit est remplacé par un identifiant aléatoire (la valeur envoyée est ignorée) et `meta_title` reprend `name`.
Si `description` est absente, un produit existant garde la sienne et un nouveau produit en reçoit une vide.

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/products" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"ref":"REFABOPRODUIT","name":"Super nom produit","price":"17.50","description":"Petite description produit","tax":"0.2","frequencies":[{"interval":"month","interval_count":2}]}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "slug": "string",
    "position": 1,
    "short_description": "string",
    "description": "string",
    "meta_title": "string",
    "meta_description": "string",
    "id_category": 1,
    "quantity": 1,
    "price": 9.9,
    "tax": 0,
    "active": true,
    "virtual_product": true,
    "salable": true,
    "gift_card": true,
    "gift_plan": "string",
    "disable_seo": true,
    "ref": "string",
    "external_id": "string",
    "offers": [
      {
        "id": 1,
        "quantity": 1,
        "percent_off": 9.9,
        "price": 9.9,
        "active": true,
        "product_id": 1,
        "deleted_at": "string",
        "tenant_id": 1
      }
    ],
    "frequencies": [
      {
        "id": 1,
        "interval": "string",
        "interval_count": 1,
        "tenant_id": 1,
        "pivot": {
          "product_id": 1,
          "composable_frequence_id": 1
        }
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer un produit par référence (SKU)

`GET /products/{ref}`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `ref` | path | string | oui | Référence du produit (SKU) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/products/<ref>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "slug": "string",
    "position": 1,
    "short_description": "string",
    "description": "string",
    "meta_title": "string",
    "meta_description": "string",
    "id_category": 1,
    "quantity": 1,
    "price": 9.9,
    "tax": 0,
    "active": true,
    "virtual_product": true,
    "salable": true,
    "gift_card": true,
    "gift_plan": "string",
    "disable_seo": true,
    "ref": "string",
    "external_id": "string",
    "offers": [
      {
        "id": 1,
        "quantity": 1,
        "percent_off": 9.9,
        "price": 9.9,
        "active": true,
        "product_id": 1,
        "deleted_at": "string",
        "tenant_id": 1
      }
    ],
    "frequencies": [
      {
        "id": 1,
        "interval": "string",
        "interval_count": 1,
        "tenant_id": 1,
        "pivot": {
          "product_id": 1,
          "composable_frequence_id": 1
        }
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Produit non trouvé), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Mettre à jour un produit par référence (SKU)

`PATCH /products/{ref}`

Met à jour le produit dont la référence est dans le chemin. Si `external_id` est fourni dans le corps, le produit est cherché par `external_id` et la référence du chemin est ignorée.
`name`, `ref` et `price` sont obligatoires, même pour une mise à jour partielle.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `ref` | path | string | oui | Référence du produit (SKU) |

Exemple de requête :

```bash
curl -X PATCH "https://app.ciklik.co/api/v3/products/<ref>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"ref":"REFABOPRODUIT","name":"Super nom produit","price":"17.50","description":"Petite description produit","tax":"0.2","frequencies":[{"interval":"month","interval_count":2}]}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "slug": "string",
    "position": 1,
    "short_description": "string",
    "description": "string",
    "meta_title": "string",
    "meta_description": "string",
    "id_category": 1,
    "quantity": 1,
    "price": 9.9,
    "tax": 0,
    "active": true,
    "virtual_product": true,
    "salable": true,
    "gift_card": true,
    "gift_plan": "string",
    "disable_seo": true,
    "ref": "string",
    "external_id": "string",
    "offers": [
      {
        "id": 1,
        "quantity": 1,
        "percent_off": 9.9,
        "price": 9.9,
        "active": true,
        "product_id": 1,
        "deleted_at": "string",
        "tenant_id": 1
      }
    ],
    "frequencies": [
      {
        "id": 1,
        "interval": "string",
        "interval_count": 1,
        "tenant_id": 1,
        "pivot": {
          "product_id": 1,
          "composable_frequence_id": 1
        }
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Produit non trouvé (par référence du chemin, ou par `external_id` s'il est fourni)), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
