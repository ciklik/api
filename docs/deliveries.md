# deliveries

Opérations liées aux bons de livraison

## Liste des bons de livraison

`GET /deliveries`

Récupère la liste de tous les bons de livraison de l'application. Les filtres exacts acceptent plusieurs valeurs séparées par des virgules (`filter[order_id]=12,13`).

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[uuid]` | query | string | non | Filtrer par UUID du bon de livraison. |
| `filter[subscription_uuid]` | query | string | non | Filtrer par UUID de la souscription associée. |
| `filter[address_id]` | query | integer | non | Filtrer par ID de l'adresse. |
| `filter[phone]` | query | string | non | Filtrer par numéro de téléphone. |
| `filter[tracking_number]` | query | string | non | Filtrer par numéro de suivi. |
| `filter[customer_id]` | query | string | non | Filtrer par ID du client. |
| `filter[transporter_reference]` | query | string | non | Filtrer par référence du transporteur. |
| `filter[transporter_id]` | query | integer | non | Filtrer par ID du transporteur. |
| `filter[first_name]` | query | string | non | Filtrer par prénom. |
| `filter[last_name]` | query | string | non | Filtrer par nom de famille. |
| `filter[postcode]` | query | string | non | Filtrer par code postal. |
| `filter[address1]` | query | string | non | Filtrer par adresse ligne 1. |
| `filter[address2]` | query | string | non | Filtrer par adresse ligne 2. |
| `filter[city]` | query | string | non | Filtrer par ville. |
| `filter[country]` | query | string | non | Filtrer par pays. |
| `filter[mail]` | query | string | non | Filtrer par adresse e-mail (correspondance exacte). |
| `filter[transporter_name]` | query | string | non | Filtrer par nom du transporteur. |
| `filter[plan]` | query | string | non | Filtrer par nom du plan. |
| `filter[iso_code]` | query | string | non | Filtrer par code ISO du pays. |
| `filter[relay_id]` | query | string | non | Filtrer par ID du relais (chaîne, les identifiants de point relais ne sont pas tous numériques). |
| `filter[orderable_name]` | query | string | non | Filtrer par nom de l'élément commandable. |
| `filter[orderable_id]` | query | string | non | Filtrer par ID de l'élément commandable. |
| `filter[orderable_type]` | query | string | non | Filtrer par type de l'élément commandable. |
| `filter[order_id]` | query | integer | non | Filtrer par ID de commande. |
| `filter[tracking_url]` | query | string | non | Filtrer par URL de suivi. |
| `filter[quantity]` | query | string | non | Filtrer par quantité. |
| `filter[ref]` | query | string | non | Filtrer par référence. |
| `filter[status]` | query | string | non | Filtrer par statut du bon de livraison. |
| `filter[division]` | query | string | non | Filtrer par état/province. |
| `filter[company_name]` | query | string | non | Filtrer par nom de l'entreprise. |
| `filter[created_at_before]` | query | string | non | Filtrer par date de création antérieure. |
| `filter[created_at_after]` | query | string | non | Filtrer par date de création ultérieure. |
| `filter[updated_at_before]` | query | string | non | Filtrer par date de mise à jour antérieure. |
| `filter[updated_at_after]` | query | string | non | Filtrer par date de mise à jour ultérieure. |
| `filter[scheduled_at_before]` | query | string | non | Filtrer par date prévue antérieure. |
| `filter[scheduled_at_after]` | query | string | non | Filtrer par date prévue ultérieure. |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/deliveries" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "tenant_id": 1,
      "id": 1,
      "uuid": "string",
      "address": {
        "id": 1,
        "user_id": 1,
        "company_name": "string",
        "address": "string",
        "address1": "string",
        "postcode": "string",
        "city": "string",
        "phone": "string",
        "first_name": "string",
        "last_name": "string",
        "region_id": 1,
        "division": "string",
        "division_name": "string",
        "external_id": "string",
        "deletable": true,
        "country": {
          "id": 1,
          "name": "string",
          "alphaCode": "string"
        }
      },
      "transporter": {
        "id": 1,
        "countries": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "plan_blacklisted": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "name": "string",
        "description": "string",
        "price": 9.9,
        "gift": true,
        "active": true,
        "shipped_count": 1,
        "type": "string",
        "relayOptions": {
          "relayKey": "string",
          "driver": "MondialRelay",
          "relayOptions": {}
        }
      },
      "created_at": "2026-10-12T10:00:00+02:00",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "scheduled_at": "2026-10-12T10:00:00+02:00",
      "tracking_link": "string",
      "subscription_uuid": "string",
      "address_id": 1,
      "phone": "string",
      "status": "created",
      "tracking_number": "string",
      "customer_id": "string",
      "supply_id": "string",
      "transporter_id": 1,
      "first_name": "string",
      "last_name": "string",
      "postcode": "string",
      "address1": "string",
      "address2": "string",
      "division": "string",
      "city": "string",
      "country": "string",
      "mail": "string",
      "subscriptions_count": "string",
      "transporter_name": "string",
      "shipped_count": "string",
      "site_name": "string",
      "options": "string",
      "iso_code": "string",
      "relay": {},
      "relay_id": "string",
      "orderable_name": "string",
      "orderable_id": "string",
      "orderable_type": "App\\Product",
      "order_id": 1,
      "ref": "string",
      "customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
        }
      ],
      "extra_customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
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

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer les détails d'un bon de livraison

`GET /deliveries/{id}`

Récupère les détails d'un bon de livraison. `data` est une liste (un bon de livraison peut porter plusieurs lignes partageant le même UUID).

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID du bon de livraison (champ `uuid`, pas l'identifiant numérique `id`) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/deliveries/<id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "tenant_id": 1,
      "id": 1,
      "uuid": "string",
      "address": {
        "id": 1,
        "user_id": 1,
        "company_name": "string",
        "address": "string",
        "address1": "string",
        "postcode": "string",
        "city": "string",
        "phone": "string",
        "first_name": "string",
        "last_name": "string",
        "region_id": 1,
        "division": "string",
        "division_name": "string",
        "external_id": "string",
        "deletable": true,
        "country": {
          "id": 1,
          "name": "string",
          "alphaCode": "string"
        }
      },
      "transporter": {
        "id": 1,
        "countries": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "plan_blacklisted": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "name": "string",
        "description": "string",
        "price": 9.9,
        "gift": true,
        "active": true,
        "shipped_count": 1,
        "type": "string",
        "relayOptions": {
          "relayKey": "string",
          "driver": "MondialRelay",
          "relayOptions": {}
        }
      },
      "created_at": "2026-10-12T10:00:00+02:00",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "scheduled_at": "2026-10-12T10:00:00+02:00",
      "tracking_link": "string",
      "subscription_uuid": "string",
      "address_id": 1,
      "phone": "string",
      "status": "created",
      "tracking_number": "string",
      "customer_id": "string",
      "supply_id": "string",
      "transporter_id": 1,
      "first_name": "string",
      "last_name": "string",
      "postcode": "string",
      "address1": "string",
      "address2": "string",
      "division": "string",
      "city": "string",
      "country": "string",
      "mail": "string",
      "subscriptions_count": "string",
      "transporter_name": "string",
      "shipped_count": "string",
      "site_name": "string",
      "options": "string",
      "iso_code": "string",
      "relay": {},
      "relay_id": "string",
      "orderable_name": "string",
      "orderable_id": "string",
      "orderable_type": "App\\Product",
      "order_id": 1,
      "ref": "string",
      "customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
        }
      ],
      "extra_customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
        }
      ]
    }
  ]
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Aucun bon de livraison du site avec cet UUID), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Mettre à jour un bon de livraison

`POST /deliveries/{id}`

Permet de le considérer comme expédié, et associer un numéro et un lien de suivi.
Un `tracking_number` est enregistré sur le bon de livraison (et renvoyé dans `tracking_number`), le lien de suivi est construit à partir du transporteur et le statut passe à `shipped`.
La réponse renvoie les lignes du bon relues après la mise à jour, dans une liste `data`.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID du bon de livraison (champ `uuid`, pas l'identifiant numérique `id`) |

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/deliveries/<id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"tracking_number":"string","notification":false,"status":"created"}'
```

Réponse 200 :

```json
{
  "data": [
    {
      "tenant_id": 1,
      "id": 1,
      "uuid": "string",
      "address": {
        "id": 1,
        "user_id": 1,
        "company_name": "string",
        "address": "string",
        "address1": "string",
        "postcode": "string",
        "city": "string",
        "phone": "string",
        "first_name": "string",
        "last_name": "string",
        "region_id": 1,
        "division": "string",
        "division_name": "string",
        "external_id": "string",
        "deletable": true,
        "country": {
          "id": 1,
          "name": "string",
          "alphaCode": "string"
        }
      },
      "transporter": {
        "id": 1,
        "countries": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "plan_blacklisted": [
          {
            "id": 1,
            "name": "string"
          }
        ],
        "name": "string",
        "description": "string",
        "price": 9.9,
        "gift": true,
        "active": true,
        "shipped_count": 1,
        "type": "string",
        "relayOptions": {
          "relayKey": "string",
          "driver": "MondialRelay",
          "relayOptions": {}
        }
      },
      "created_at": "2026-10-12T10:00:00+02:00",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "scheduled_at": "2026-10-12T10:00:00+02:00",
      "tracking_link": "string",
      "subscription_uuid": "string",
      "address_id": 1,
      "phone": "string",
      "status": "created",
      "tracking_number": "string",
      "customer_id": "string",
      "supply_id": "string",
      "transporter_id": 1,
      "first_name": "string",
      "last_name": "string",
      "postcode": "string",
      "address1": "string",
      "address2": "string",
      "division": "string",
      "city": "string",
      "country": "string",
      "mail": "string",
      "subscriptions_count": "string",
      "transporter_name": "string",
      "shipped_count": "string",
      "site_name": "string",
      "options": "string",
      "iso_code": "string",
      "relay": {},
      "relay_id": "string",
      "orderable_name": "string",
      "orderable_id": "string",
      "orderable_type": "App\\Product",
      "order_id": 1,
      "ref": "string",
      "customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
        }
      ],
      "extra_customization_products": [
        {
          "customizationId": 1,
          "productId": 1,
          "quantity": 1,
          "ref": "string"
        }
      ]
    }
  ]
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Aucun bon de livraison du site avec cet UUID), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Supprimer un élément d'un bon de livraison

`DELETE /deliveries/{id}`

Supprime un élément du bon de livraison en utilisant son identifiant numérique `id` (et non l'UUID utilisé par GET et POST).

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | Identifiant numérique (`id`) de l'élément du bon de livraison à supprimer |

Exemple de requête :

```bash
curl -X DELETE "https://app.ciklik.co/api/v3/deliveries/1" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "success": true
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Élément du bon de livraison non trouvé, ou appartenant à un autre site), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
