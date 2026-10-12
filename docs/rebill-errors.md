# rebill-errors

Opérations liées aux erreurs de rebill

## Récupérer la liste des erreurs de rebill

`GET /rebill-errors`

Permet de récupérer la liste des erreurs de rebill avec différents filtres.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[type]` | query | string | non | Filtrer par type d'erreur |
| `filter[by_subscription_uuid]` | query | string | non | Filtrer par UUID de l'abonnement |
| `filter[order_id]` | query | integer | non | Filtrer par ID de la commande |
| `filter[error_code]` | query | integer | non | Filtrer par code d'erreur |
| `filter[created_at_before]` | query | string | non | Filtrer par date de création avant |
| `filter[created_at_after]` | query | string | non | Filtrer par date de création après |
| `sort` | query | string | non | Trier les résultats (prefix - pour ordre décroissant) |
| `page` | query | integer | non | Numéro de la page pour la pagination |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/rebill-errors" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "id": 1,
      "type": "api",
      "created_at": "2026-01-15 08:30:00",
      "subscription_id": "string",
      "order_id": 1,
      "error_code": 1,
      "error_message": "string",
      "status": "string",
      "subscription_url": "string",
      "order_url": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "address1": "string",
      "postcode": "string",
      "city": "string",
      "country": "string",
      "first_name": "string",
      "last_name": "string"
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

## Récupérer le détail d'une erreur de rebill

`GET /rebill-errors/{id}`

Permet de récupérer les détails d'une erreur de rebill spécifique.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | ID de l'erreur de rebill |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/rebill-errors/1" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "type": "api",
    "created_at": "2026-01-15 08:30:00",
    "subscription_id": "string",
    "order_id": 1,
    "error_code": 1,
    "error_message": "string",
    "status": "string",
    "subscription_url": "string",
    "order_url": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "address1": "string",
    "postcode": "string",
    "city": "string",
    "country": "string",
    "first_name": "string",
    "last_name": "string"
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (L'erreur de rebill n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
