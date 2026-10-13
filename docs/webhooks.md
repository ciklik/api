# webhooks

Opérations liées aux webhooks

## Lister les derniers webhooks envoyés

`GET /webhooks`

Renvoie les trois derniers webhooks envoyés pour cet évènement, du plus récent au plus ancien. Chaque élément est la charge utile (payload) envoyée. Un `event_type` absent ou inconnu répond 404.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `event_type` | query | string | oui | Nom de l'évènement à avoir |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/webhooks?event_type=created_subscription" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {}
  ]
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (Paramètre `event_type` absent ou nom d'évènement inconnu), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Ajouter un webhook

`POST /webhooks`

Enregistre l'adresse appelée pour un type d'évènement. Il n'y a qu'une adresse par type d'évènement : un nouvel enregistrement remplace l'adresse précédente pour ce type, y compris celle posée par le module PrestaShop.
La réponse renvoie le site, enveloppé dans `data`, avec la liste des webhooks actifs.

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/webhooks" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"event_type":"created_subscription","hook_url":"https://example.com"}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "host": "string",
    "paymentMethods": [
      {
        "id": 1,
        "name": {
          "fr": "string"
        },
        "description": {
          "fr": "string"
        },
        "class_key": "MollieCreditCard",
        "gateway_id": 1,
        "created_at": "string",
        "updated_at": "string",
        "deleted_at": "string",
        "checkout_manager": "string",
        "need_payable": true,
        "pivot": {
          "tenant_id": 1,
          "payment_method_id": 1,
          "created_at": "string",
          "updated_at": "string"
        }
      }
    ],
    "webhooks": {},
    "metadata": {}
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 422 (Erreur de validation (`event_type` inconnu, `hook_url` absente, mal formée ou non publique)), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Supprimer un webhook

`DELETE /webhooks`

Retire l'adresse enregistrée pour ce type d'évènement. La réponse renvoie le site, enveloppé dans `data`.

Exemple de requête :

```bash
curl -X DELETE "https://app.ciklik.co/api/v3/webhooks" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"event_type":"created_subscription"}'
```

Réponse 200 :

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "host": "string",
    "paymentMethods": [
      {
        "id": 1,
        "name": {
          "fr": "string"
        },
        "description": {
          "fr": "string"
        },
        "class_key": "MollieCreditCard",
        "gateway_id": 1,
        "created_at": "string",
        "updated_at": "string",
        "deleted_at": "string",
        "checkout_manager": "string",
        "need_payable": true,
        "pivot": {
          "tenant_id": 1,
          "payment_method_id": 1,
          "created_at": "string",
          "updated_at": "string"
        }
      }
    ],
    "webhooks": {},
    "metadata": {}
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
