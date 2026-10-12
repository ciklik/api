# orders

Opérations liées aux commandes

## Récupérer la liste des commandes

`GET /orders`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[user_id]` | query | integer | non | Filtrer par ID de l'utilisateur |
| `filter[address_id]` | query | integer | non | Filtrer par ID de l'adresse |
| `filter[invoice_address_id]` | query | integer | non | Filtrer par ID de l'adresse de facturation |
| `filter[transporter_id]` | query | integer | non | Filtrer par ID du transporteur |
| `filter[status]` | query | string | non | Filtrer par statut de la commande |
| `filter[subscription_uuid]` | query | string | non | Filtrer par UUID de l'abonnement |
| `filter[invoice_id]` | query | integer | non | Filtrer par ID de la facture |
| `filter[total_paid]` | query | number | non | Filtrer par montant total payé |
| `filter[next_try]` | query | string | non | Filtrer par prochaine tentative |
| `filter[created_at_before]` | query | string | non | Filtrer par date de création avant |
| `filter[created_at_after]` | query | string | non | Filtrer par date de création après |
| `filter[updated_at_before]` | query | string | non | Filtrer par date de mise à jour avant |
| `filter[updated_at_after]` | query | string | non | Filtrer par date de mise à jour après |
| `filter[next_try_before]` | query | string | non | Filtrer par prochaine tentative avant |
| `filter[next_try_after]` | query | string | non | Filtrer par prochaine tentative après |
| `filter[by_customer_uuid]` | query | string | non | Filtrer par UUID du client |
| `filter[source]` | query | string | non | Filtrer par source de la commande |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant) |
| `filter[prestashop_order_id]` | query | integer | non | Filtrer par correspondance commande PrestaShop |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/orders" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "order_id": 1,
      "user_id": 1,
      "user_uuid": "3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f",
      "first_name": "string",
      "last_name": "string",
      "phone": "string",
      "email": "string",
      "status": "string",
      "created": "2026-10-12T10:00:00+02:00",
      "items": [
        {
          "id": 1,
          "price": "12,50",
          "tax": "string",
          "quantity": 1,
          "name": "string",
          "type": "string",
          "external_id": "string",
          "ref": "string"
        }
      ],
      "shipping": "string",
      "count": 1,
      "total_tax_paid": "2,08",
      "total_discount_inc": "0,00",
      "total_paid": "12,50",
      "total_shipping_paid": "4,90",
      "created_at": "2026-10-12T10:00:00+02:00",
      "coupon": {},
      "subscription_uuid": "string",
      "next_try": "2026-10-12T10:00:00+02:00",
      "retry_link": "string",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "paid_transaction_id": "string",
      "paid_class_key": "string",
      "prestashop_order_id": 1,
      "prestashop_cart_id": 1,
      "payment_status": "paid",
      "payment_class_key": "string"
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

## Récupérer le détail d'une commande

`GET /orders/{id}`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `id` | path | integer | oui | ID de la commande à récupérer |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/orders/1" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "order_id": 1,
    "user_id": 1,
    "user_uuid": "3f2b8c1e-5d4a-4b7e-9c2f-1a2b3c4d5e6f",
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "email": "string",
    "status": "string",
    "created": "2026-10-12T10:00:00+02:00",
    "items": [
      {
        "id": 1,
        "price": "12,50",
        "tax": "string",
        "quantity": 1,
        "name": "string",
        "type": "string",
        "external_id": "string",
        "ref": "string"
      }
    ],
    "shipping": "string",
    "count": 1,
    "total_tax_paid": "2,08",
    "total_discount_inc": "0,00",
    "total_paid": "12,50",
    "total_shipping_paid": "4,90",
    "created_at": "2026-10-12T10:00:00+02:00",
    "coupon": {},
    "subscription_uuid": "string",
    "next_try": "2026-10-12T10:00:00+02:00",
    "retry_link": "string",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "paid_transaction_id": "string",
    "paid_class_key": "string",
    "prestashop_order_id": 1,
    "prestashop_cart_id": 1,
    "payment_status": "paid",
    "payment_class_key": "string"
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (La commande n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
