# subscriptions

Opérations liées aux abonnements

## Obtenir les détails d'un abonnement

`GET /subscriptions/{id}`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/subscriptions/<id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "uuid": "string",
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "end_date": "2026-10-12T10:00:00+02:00",
    "engaged_date": "2026-10-12T10:00:00+02:00",
    "auto_pause_at": "2026-10-12T10:00:00+02:00",
    "start_date": "2026-10-12T10:00:00+02:00",
    "active": true,
    "paused": true,
    "next_billing": "2026-10-12T10:00:00+02:00",
    "update_transporter_at": "2026-10-12T10:00:00+02:00",
    "relay": {},
    "graceMonths": 1,
    "retry_link": "string",
    "pending_payment": {
      "order_id": 1,
      "amount": 9.9,
      "currency": "string",
      "retry_link": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "next_try": "2026-10-12T10:00:00+02:00"
    },
    "interval": "string",
    "interval_count": 1,
    "switch_plan_uuid": "string",
    "switch_plan_date": "2026-10-12T10:00:00+02:00",
    "referrer": "string",
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
    "user_uuid": "string",
    "user_id": 1,
    "email": "string",
    "display_interval": "string",
    "display_content": "string",
    "external_fingerprint": "string",
    "content": [
      {
        "external_id": "string",
        "external_id_with_customizations": "string",
        "quantity": 1,
        "product_id": 1,
        "subscription_id": 1,
        "customizations": [
          null
        ]
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Abonnement introuvable), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Mettre à jour un abonnement

`PUT /subscriptions/{id}`

Permet de mettre à jour un abonnement, le résilier, le mettre en pause pour 1, 2 ou 3 mois, ou le relancer.
L'adresse (`address_id`), le transporteur (`transporter`) et la déclinaison (`declinaison_id`) sont contrôlés avant toute écriture : une référence inconnue ou qui n'appartient pas au site répond 404 et l'abonnement n'est pas modifié.
Les autres refus (422 sur `content` ou `next_billing`, par exemple) peuvent intervenir après l'application des changements qui les précèdent : n'envoyez qu'un changement par requête si vous avez besoin d'un résultat tout ou rien.
La réponse renvoie l'abonnement relu après les modifications, enveloppé dans `data`.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement à mettre à jour |

Exemple de requête :

```bash
curl -X PUT "https://app.ciklik.co/api/v3/subscriptions/<id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"active":true,"metadata":{"key1":"value1","key2":"value2","ciklik_encrypted_key2":"value-encrypted"}}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "uuid": "string",
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "end_date": "2026-10-12T10:00:00+02:00",
    "engaged_date": "2026-10-12T10:00:00+02:00",
    "auto_pause_at": "2026-10-12T10:00:00+02:00",
    "start_date": "2026-10-12T10:00:00+02:00",
    "active": true,
    "paused": true,
    "next_billing": "2026-10-12T10:00:00+02:00",
    "update_transporter_at": "2026-10-12T10:00:00+02:00",
    "relay": {},
    "graceMonths": 1,
    "retry_link": "string",
    "pending_payment": {
      "order_id": 1,
      "amount": 9.9,
      "currency": "string",
      "retry_link": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "next_try": "2026-10-12T10:00:00+02:00"
    },
    "interval": "string",
    "interval_count": 1,
    "switch_plan_uuid": "string",
    "switch_plan_date": "2026-10-12T10:00:00+02:00",
    "referrer": "string",
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
    "user_uuid": "string",
    "user_id": 1,
    "email": "string",
    "display_interval": "string",
    "display_content": "string",
    "external_fingerprint": "string",
    "content": [
      {
        "external_id": "string",
        "external_id_with_customizations": "string",
        "quantity": 1,
        "product_id": 1,
        "subscription_id": 1,
        "customizations": [
          null
        ]
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Abonnement introuvable, ou adresse, transporteur ou déclinaison qui n'appartient pas au site.), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Supprimer un abonnement

`DELETE /subscriptions/{id}`

Supprime un abonnement (soft delete). L'abonnement doit être inactif (active = false) et appartenir au tenant authentifié pour pouvoir être supprimé.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement à supprimer. |

Exemple de requête :

```bash
curl -X DELETE "https://app.ciklik.co/api/v3/subscriptions/<id>" \
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

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Non trouvé - Abonnement introuvable ou n'appartenant pas au tenant authentifié.), 422 (Erreur de validation - L'abonnement est encore actif.), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Modifier la quantité d'un produit dans un abonnement

`PATCH /subscriptions/{id}/products/{external_id}`

Met à jour la quantité d'un produit spécifique déjà rattaché à l'abonnement. Les produits avec personnalisation (customization hash) ne sont pas modifiables.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement |
| `external_id` | path | string | oui | Identifiant externe du produit (exodus_id) |

Exemple de requête :

```bash
curl -X PATCH "https://app.ciklik.co/api/v3/subscriptions/<id>/products/<external_id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"quantity":3}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "uuid": "string",
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "end_date": "2026-10-12T10:00:00+02:00",
    "engaged_date": "2026-10-12T10:00:00+02:00",
    "auto_pause_at": "2026-10-12T10:00:00+02:00",
    "start_date": "2026-10-12T10:00:00+02:00",
    "active": true,
    "paused": true,
    "next_billing": "2026-10-12T10:00:00+02:00",
    "update_transporter_at": "2026-10-12T10:00:00+02:00",
    "relay": {},
    "graceMonths": 1,
    "retry_link": "string",
    "pending_payment": {
      "order_id": 1,
      "amount": 9.9,
      "currency": "string",
      "retry_link": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "next_try": "2026-10-12T10:00:00+02:00"
    },
    "interval": "string",
    "interval_count": 1,
    "switch_plan_uuid": "string",
    "switch_plan_date": "2026-10-12T10:00:00+02:00",
    "referrer": "string",
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
    "user_uuid": "string",
    "user_id": 1,
    "email": "string",
    "display_interval": "string",
    "display_content": "string",
    "external_fingerprint": "string",
    "content": [
      {
        "external_id": "string",
        "external_id_with_customizations": "string",
        "quantity": 1,
        "product_id": 1,
        "subscription_id": 1,
        "customizations": [
          null
        ]
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Abonnement ou produit introuvable), 422 (Erreur de validation (quantité invalide, produit personnalisé, abonnement inactif). Un abonnement inactif ou un produit personnalisé répond avec un corps `{message}` sans `errors`.), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Retirer un produit d'un abonnement

`DELETE /subscriptions/{id}/products/{external_id}`

Retire un produit spécifique de l'abonnement. Impossible de retirer le dernier produit. Les produits avec personnalisation ne sont pas modifiables.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement |
| `external_id` | path | string | oui | Identifiant externe du produit (exodus_id) |

Exemple de requête :

```bash
curl -X DELETE "https://app.ciklik.co/api/v3/subscriptions/<id>/products/<external_id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "uuid": "string",
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "end_date": "2026-10-12T10:00:00+02:00",
    "engaged_date": "2026-10-12T10:00:00+02:00",
    "auto_pause_at": "2026-10-12T10:00:00+02:00",
    "start_date": "2026-10-12T10:00:00+02:00",
    "active": true,
    "paused": true,
    "next_billing": "2026-10-12T10:00:00+02:00",
    "update_transporter_at": "2026-10-12T10:00:00+02:00",
    "relay": {},
    "graceMonths": 1,
    "retry_link": "string",
    "pending_payment": {
      "order_id": 1,
      "amount": 9.9,
      "currency": "string",
      "retry_link": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "next_try": "2026-10-12T10:00:00+02:00"
    },
    "interval": "string",
    "interval_count": 1,
    "switch_plan_uuid": "string",
    "switch_plan_date": "2026-10-12T10:00:00+02:00",
    "referrer": "string",
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
    "user_uuid": "string",
    "user_id": 1,
    "email": "string",
    "display_interval": "string",
    "display_content": "string",
    "external_fingerprint": "string",
    "content": [
      {
        "external_id": "string",
        "external_id_with_customizations": "string",
        "quantity": 1,
        "product_id": 1,
        "subscription_id": 1,
        "customizations": [
          null
        ]
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Abonnement ou produit introuvable), 422 (Erreur de validation (dernier produit, produit personnalisé, abonnement inactif). Un abonnement inactif ou un produit personnalisé répond avec un corps `{message}` sans `errors`.), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Ajouter un produit à un abonnement

`POST /subscriptions/{id}/products`

Ajoute un produit à l'abonnement ou met à jour la quantité si le produit est déjà rattaché (upsert).
Si le produit existe déjà en base (via son `external_id`), il est simplement rattaché ; les champs `price` et `tax` du corps sont alors ignorés.
Si le produit n'existe pas, il est créé automatiquement : `price` devient **obligatoire**, `tax` défaut à 0 si absent.
Les produits avec personnalisation (customization hash) ne sont pas acceptés.
Retourne 201 pour un nouvel attachement (nouveau produit créé ou produit existant nouvellement rattaché), 200 pour une mise à jour de quantité sur un produit déjà rattaché.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'abonnement |

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/subscriptions/<id>/products" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"external_id":"12345","name":"Produit mensuel","quantity":2,"price":19.99,"tax":0.2}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "uuid": "string",
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "end_date": "2026-10-12T10:00:00+02:00",
    "engaged_date": "2026-10-12T10:00:00+02:00",
    "auto_pause_at": "2026-10-12T10:00:00+02:00",
    "start_date": "2026-10-12T10:00:00+02:00",
    "active": true,
    "paused": true,
    "next_billing": "2026-10-12T10:00:00+02:00",
    "update_transporter_at": "2026-10-12T10:00:00+02:00",
    "relay": {},
    "graceMonths": 1,
    "retry_link": "string",
    "pending_payment": {
      "order_id": 1,
      "amount": 9.9,
      "currency": "string",
      "retry_link": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "next_try": "2026-10-12T10:00:00+02:00"
    },
    "interval": "string",
    "interval_count": 1,
    "switch_plan_uuid": "string",
    "switch_plan_date": "2026-10-12T10:00:00+02:00",
    "referrer": "string",
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
    "user_uuid": "string",
    "user_id": 1,
    "email": "string",
    "display_interval": "string",
    "display_content": "string",
    "external_fingerprint": "string",
    "content": [
      {
        "external_id": "string",
        "external_id_with_customizations": "string",
        "quantity": 1,
        "product_id": 1,
        "subscription_id": 1,
        "customizations": [
          null
        ]
      }
    ]
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Abonnement introuvable), 422 (Erreur de validation (champs manquants, produit personnalisé, abonnement inactif, `price` manquant lors de la création d'un produit). Un abonnement inactif ou un produit personnalisé répond avec un corps `{message}` sans `errors`.), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer une liste d'abonnement

`GET /subscriptions`

Permet de récupérer une liste d'abonnements avec différents filtres et options de tri. Sans paramètre `sort`, la liste est triée par `id` croissant (plus ancien en premier).

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[activated]` | query | boolean | non | Filtre par abonnements activés. |
| `filter[canceled]` | query | boolean | non | Filtre par abonnements annulés. |
| `filter[created_at_before]` | query | string | non | Filtre par date de création avant la date spécifiée. |
| `filter[created_at_after]` | query | string | non | Filtre par date de création après la date spécifiée. |
| `filter[updated_at_before]` | query | string | non | Filtre par date de mise à jour avant la date spécifiée. |
| `filter[updated_at_after]` | query | string | non | Filtre par date de mise à jour après la date spécifiée. |
| `filter[canceled_since_before]` | query | string | non | Filtre par date d'annulation avant la date spécifiée. |
| `filter[canceled_since_after]` | query | string | non | Filtre par date d'annulation après la date spécifiée. |
| `filter[expired]` | query | boolean | non | Filtre par abonnements expirés. |
| `filter[in_grace_period]` | query | boolean | non | Filtre par abonnements en période de grâce. |
| `filter[engaged_before]` | query | string | non | Filtre par date d'engagement avant la date spécifiée. |
| `filter[engaged_after]` | query | string | non | Filtre par date d'engagement après la date spécifiée. |
| `filter[next_billing_before]` | query | string | non | Filtre par date de prochaine facturation avant la date spécifiée. |
| `filter[next_billing_after]` | query | string | non | Filtre par date de prochaine facturation après la date spécifiée. |
| `filter[end_date_before]` | query | string | non | Filtre par date de fin d'abonnement avant la date spécifiée. |
| `filter[end_date_after]` | query | string | non | Filtre par date de fin d'abonnement après la date spécifiée. |
| `filter[subscriptions_by_email]` | query | string | non | Filtre par adresse e-mail. |
| `filter[plan_id]` | query | string | non | Filtre par ID (numérique) du plan, correspondance exacte. |
| `filter[customer_id]` | query | string | non | Filtre par ID de client. |
| `filter[interval]` | query | string | non | Filtre par intervalle de facturation (correspondance partielle, insensible à la casse). |
| `filter[interval_count]` | query | integer | non | Filtre par nombre d'intervalles (correspondance exacte). |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant). Tri par défaut : `id` croissant. |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/subscriptions" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "id": 1,
      "uuid": "string",
      "created_at": "2026-10-12T10:00:00+02:00",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "end_date": "2026-10-12T10:00:00+02:00",
      "engaged_date": "2026-10-12T10:00:00+02:00",
      "auto_pause_at": "2026-10-12T10:00:00+02:00",
      "start_date": "2026-10-12T10:00:00+02:00",
      "active": true,
      "paused": true,
      "next_billing": "2026-10-12T10:00:00+02:00",
      "update_transporter_at": "2026-10-12T10:00:00+02:00",
      "relay": {},
      "graceMonths": 1,
      "retry_link": "string",
      "pending_payment": {
        "order_id": 1,
        "amount": 9.9,
        "currency": "string",
        "retry_link": "string",
        "created_at": "2026-10-12T10:00:00+02:00",
        "next_try": "2026-10-12T10:00:00+02:00"
      },
      "interval": "string",
      "interval_count": 1,
      "switch_plan_uuid": "string",
      "switch_plan_date": "2026-10-12T10:00:00+02:00",
      "referrer": "string",
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
      "user_uuid": "string",
      "user_id": 1,
      "email": "string",
      "display_interval": "string",
      "display_content": "string",
      "external_fingerprint": "string",
      "content": [
        {
          "external_id": "string",
          "external_id_with_customizations": "string",
          "quantity": 1,
          "product_id": 1,
          "subscription_id": 1,
          "customizations": [
            null
          ]
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
