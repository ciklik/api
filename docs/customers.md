# customers

Opérations liées aux comptes utilisateurs

## Liste des utilisateurs

`GET /customers`

Cette route permet de récupérer une liste d'utilisateurs.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[created_at_before]` | query | string | non | Date de création avant laquelle filtrer. |
| `filter[created_at_after]` | query | string | non | Date de création après laquelle filtrer. |
| `filter[updated_at_before]` | query | string | non | Date de mise à jour avant laquelle filtrer. |
| `filter[updated_at_after]` | query | string | non | Date de mise à jour après laquelle filtrer. |
| `filter[uuid]` | query | string | non | Filtrer par UUID de l'utilisateur. |
| `filter[id]` | query | integer | non | Filtrer par ID de l'utilisateur. |
| `filter[email]` | query | string | non | Filtrer par adresse e-mail de l'utilisateur. |
| `filter[external_id]` | query | string | non | Filtrer par ID externe de l'utilisateur. |
| `filter[disabled]` | query | boolean | non | Filtrer par statut de désactivation de l'utilisateur. |
| `filter[referrer]` | query | string | non | Filtrer par référent de l'utilisateur. |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/customers" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "id": 1,
      "email": "client@example.com",
      "uuid": "3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f",
      "refp": "string",
      "has_active_subscription": true,
      "info": {},
      "external_id": "string",
      "addresses": [
        {
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
        }
      ],
      "customerRevenue": "1,234.56",
      "customerRefund": "0.00",
      "totalTransactionsSuccess": 1
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

## Créer un nouvel utilisateur

`POST /customers`

Cette route permet de créer un nouveau compte utilisateur. Si l'adresse email existe déjà sur le site, la réponse contient l'utilisateur associé (statut 200, `external_id` n'est pas modifié). Dans le cas contraire, le compte est créé et renvoyé (statut 201). Le client est enveloppé dans `data`.

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/customers" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","external_id":"some_external_id"}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "email": "client@example.com",
    "uuid": "3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f",
    "refp": "string",
    "has_active_subscription": true,
    "info": {},
    "external_id": "string",
    "addresses": [
      {
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
      }
    ],
    "customerRevenue": "1,234.56",
    "customerRefund": "0.00",
    "totalTransactionsSuccess": 1
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer les détails d'un utilisateur

`GET /customers/{id}`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | string | oui | UUID de l'utilisateur (l'identifiant numérique n'est pas accepté) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/customers/3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "email": "client@example.com",
    "uuid": "3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f",
    "refp": "string",
    "has_active_subscription": true,
    "info": {},
    "external_id": "string",
    "addresses": [
      {
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
      }
    ],
    "customerRevenue": "1,234.56",
    "customerRefund": "0.00",
    "totalTransactionsSuccess": 1
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (La ressource n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
