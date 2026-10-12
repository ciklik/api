# addresses

Opérations liées aux adresses

## Liste des adresses

`GET /addresses`

Cette route permet de lister des adresses.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[created_at_before]` | query | string | non | Date de création avant laquelle filtrer. |
| `filter[created_at_after]` | query | string | non | Date de création après laquelle filtrer. |
| `filter[updated_at_before]` | query | string | non | Date de mise à jour avant laquelle filtrer. |
| `filter[updated_at_after]` | query | string | non | Date de mise à jour après laquelle filtrer. |
| `filter[by_customer_uuid]` | query | string | non | Filtrer par UUID du client. |
| `filter[region_id]` | query | integer | non | Filtrer par ID de la région. |
| `filter[user_id]` | query | integer | non | Filtrer par ID de l'utilisateur. |
| `filter[address]` | query | string | non | Filtrer par adresse. |
| `filter[address1]` | query | string | non | Filtrer par adresse 1. |
| `filter[postcode]` | query | string | non | Filtrer par code postal. |
| `filter[city]` | query | string | non | Filtrer par ville. |
| `filter[first_name]` | query | string | non | Filtrer par prénom. |
| `filter[last_name]` | query | string | non | Filtrer par nom. |
| `filter[company_name]` | query | string | non | Filtrer par nom de la société. |
| `filter[division]` | query | string | non | Filtrer par état. |
| `filter[phone]` | query | string | non | Filtrer par numéro de téléphone. |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/addresses" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
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

## Créer une adresse

`POST /addresses`

Cette route permet de créer une adresse pour un client du site.
Le client (`user_id`) doit appartenir au site du jeton et le pays (`region_id`) doit être ouvert sur le site.
Le code postal est contrôlé selon le pays ; le téléphone doit être un mobile valide du pays si le contrôle des numéros est actif sur le site.
Pour un pays que la bibliothèque de numérotation ne connaît pas (Terres australes françaises par exemple), le téléphone n'est pas contrôlé et il est enregistré tel que saisi.
Les champs texte sont normalisés (majuscules, sans accents ni ponctuation). Tout champ non listé est ignoré.
La création déclenche le webhook `created_address`.

Exemple de requête :

```bash
curl -X POST "https://app.ciklik.co/api/v3/addresses" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"user_id":123,"region_id":1,"address":"12 rue de la Paix","address1":"Bâtiment B","postcode":"75002","city":"Paris","first_name":"Jeanne","last_name":"Martin","company_name":"Acme","phone":"0612345678","division":"NY"}'
```

Réponse 201 :

```json
{
  "data": {
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
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit (jeton qui n'est pas celui d'un site)), 404 (Le client n'a pas été trouvé (supprimé entre la validation et la création ; un client inconnu ou d'un autre site renvoie 422)), 422 (Erreur de validation (client inconnu ou d'un autre site, pays non ouvert, code postal ou téléphone invalide, champ manquant ou trop long)), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer les données d'une adresse

`GET /addresses/{id}`

Cette route permet de récupérer une adresse.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | ID de l'adresse à récupérer. |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/addresses/1" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
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
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (L'adresse n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Mettre à jour une adresse

`PUT /addresses/{id}`

Cette route permet de mettre à jour une adresse.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | ID de l'adresse à mettre à jour. |

Exemple de requête :

```bash
curl -X PUT "https://app.ciklik.co/api/v3/addresses/1" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"address":"string","address1":"string","postcode":"string","city":"string","first_name":"string","last_name":"string","company_name":"string","phone":"string","region_id":1,"division":"string"}'
```

Réponse 200 :

```json
{
  "data": {
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
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (L'adresse n'a pas été trouvée), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Supprimer une adresse

`DELETE /addresses/{id}`

Cette route permet de supprimer une adresse. Une adresse qui n'est pas supprimable (champ `deletable` à false) répond 403.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | ID de l'adresse à supprimer. |

Exemple de requête :

```bash
curl -X DELETE "https://app.ciklik.co/api/v3/addresses/1" \
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

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Adresse non supprimable (champ `deletable` à false), ou accès interdit), 404 (L'adresse n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
