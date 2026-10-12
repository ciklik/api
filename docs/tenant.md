# tenant

Opérations liées à l'entité "Website".

## Récupérer les données de l'entité "Website"

`GET /whoiam`

Renvoie le site du jeton, enveloppé dans `data`. Le champ `metadata` contient toutes les clés de métadonnées du site, y compris celles qui n'ont pas été posées par l'API.

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/whoiam" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
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
        "class_key": "string",
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

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Mettre à jour les métadonnées d'un site web (WebsiteEntity)

`PUT /whoiam`

Permet de mettre à jour les métadonnées d'un site web (WebsiteEntity) en modifiant ou ajoutant des clés/valeurs au champ "metadata". Les clés envoyées sont fusionnées avec les métadonnées existantes ; les clés absentes du corps sont conservées (elles ne sont pas effacées). La réponse renvoie le site complet, enveloppé dans `data`.

Exemple de requête :

```bash
curl -X PUT "https://app.ciklik.co/api/v3/whoiam" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"metadata":{"key1":"value1","key2":"value2","ciklik_encrypted_key2":"value-encrypted"}}'
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
        "class_key": "string",
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

## Récupérer l'état d'installation de l'espace

`GET /installation`

Route destinée au back-office du module PrestaShop : elle renvoie l'état d'installation de l'espace du jeton (espace de test ou de production, étapes franchies, ce qui reste à faire et adresse de la page de suivi d'installation).
Les libellés sont traduits dans la langue de la requête. L'état est lu tel qu'il a été relevé lors des dernières vérifications : aucune vérification n'est lancée pendant la requête.

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/installation" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "space": {
      "id": 1,
      "name": "string",
      "domain": "string",
      "kind": "sandbox"
    },
    "complete": true,
    "stalled": true,
    "collision": {
      "normalized_host": "string",
      "current_tenant_id": 1,
      "current_is_sandbox": true,
      "other_tenant_id": 1,
      "other_tenant_name": "string",
      "other_tenant_domain": "string",
      "other_is_sandbox": true
    },
    "counts": {
      "done": 1,
      "broken": 1,
      "upcoming": 1
    },
    "summary": "string",
    "last_probed_at": "2026-10-12T10:00:00+02:00",
    "steps": [
      {
        "key": "string",
        "group": "site",
        "label": "string",
        "state": "verified",
        "state_label": "string",
        "is_blocking": true,
        "observed_at": "2026-10-12T10:00:00+02:00"
      }
    ],
    "remaining": [
      "string"
    ],
    "tracking_url": "string",
    "tracking_url_valid_until": "2026-10-12T10:00:00+02:00"
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
