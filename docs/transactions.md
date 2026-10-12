# transactions

Opérations liées aux transactions

## Récupérer la liste des transactions

`GET /transactions`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[order_id]` | query | integer | non | Filtrer par ID de la commande. |
| `filter[gateway]` | query | string | non | Filtrer par passerelle de paiement. |
| `filter[transaction_id]` | query | string | non | Filtrer par identifiant de la transaction. |
| `filter[detail]` | query | string | non | Filtrer par détail de la transaction (correspondance exacte). |
| `filter[token]` | query | string | non | Filtrer par jeton de la transaction. |
| `filter[paid]` | query | boolean | non | Filtrer par transactions payées. |
| `filter[amount]` | query | number | non | Filtrer par montant (correspondance exacte). |
| `filter[refunded]` | query | boolean | non | Filtrer par transactions remboursées. |
| `filter[user_id]` | query | integer | non | Filtrer par ID de l'utilisateur. |
| `filter[failure_code]` | query | string | non | Filtrer par code d'échec de la transaction. |
| `filter[invoice_id]` | query | integer | non | Filtrer par ID de la facture. |
| `filter[created_at_before]` | query | string | non | Filtrer par date de création avant. |
| `filter[created_at_after]` | query | string | non | Filtrer par date de création après. |
| `filter[updated_at_before]` | query | string | non | Filtrer par date de mise à jour avant. |
| `filter[updated_at_after]` | query | string | non | Filtrer par date de mise à jour après. |
| `filter[by_customer_uuid]` | query | string | non | Filtrer par UUID du client. |
| `filter[source_id]` | query | string | non | Filtrer par ID de la source. |
| `filter[amount_refunded]` | query | number | non | Filtrer par montant remboursé. |
| `filter[payment_intent_id]` | query | string | non | Filtrer par ID de l'intention de paiement. |
| `sort` | query | string | non | Trier les résultats (préfixer par - pour un tri descendant) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/transactions" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "order_id": 1,
      "order": {
        "order_id": 1,
        "status": "string",
        "items": [
          {}
        ],
        "revenue": "string",
        "refunded": "string",
        "customerRevenue": "string",
        "customerRefund": "string",
        "totalTransactionsSuccess": 1,
        "subTransactionsSuccess": 1,
        "next_billing": "2026-10-12T10:00:00+02:00",
        "countTransactions": 1,
        "choices": null
      },
      "gateway": "string",
      "transaction_id": "string",
      "detail": "string",
      "token": "string",
      "tenant_id": 1,
      "paid": true,
      "amount": "string",
      "refunded": true,
      "source_id": "string",
      "failure_message": "string",
      "failure_code": "string",
      "invoice_id": 1,
      "amount_refunded": "string",
      "statement_descriptor": "string",
      "user_id": 1,
      "created_at": "2026-10-12T10:00:00+02:00",
      "updated_at": "2026-10-12T10:00:00+02:00",
      "payment_intent_id": "string"
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

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (La ressource n'a pas été trouvée), 422 (Erreur de validation), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Récupérer une transaction par ID

`GET /transactions/{transaction_id}`

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `transaction_id` | path | string | oui | L'identifiant de la transaction à récupérer (champ `transaction_id`). |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/transactions/<transaction_id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": {
    "order_id": 1,
    "order": {
      "order_id": 1,
      "status": "string",
      "items": [
        {}
      ],
      "revenue": "string",
      "refunded": "string",
      "customerRevenue": "string",
      "customerRefund": "string",
      "totalTransactionsSuccess": 1,
      "subTransactionsSuccess": 1,
      "next_billing": "2026-10-12T10:00:00+02:00",
      "countTransactions": 1,
      "choices": null
    },
    "gateway": "string",
    "transaction_id": "string",
    "detail": "string",
    "token": "string",
    "tenant_id": 1,
    "paid": true,
    "amount": "string",
    "refunded": true,
    "source_id": "string",
    "failure_message": "string",
    "failure_code": "string",
    "invoice_id": 1,
    "amount_refunded": "string",
    "statement_descriptor": "string",
    "user_id": 1,
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "payment_intent_id": "string"
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (La ressource n'a pas été trouvée), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).

## Demander le remboursement d'une transaction par ID

`PUT /transactions/{transaction_id}`

Rembourse tout ou partie d'une transaction payée. La réponse renvoie la transaction, enveloppée dans `data`.
Un remboursement refusé (transaction échouée, montant supérieur au restant, solde insuffisant, refus de Stripe) répond 422 avec le motif dans `errors.error`. Un refus d'une autre passerelle peut répondre 500.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `transaction_id` | path | string | oui | L'identifiant de la transaction à rembourser. |

Exemple de requête :

```bash
curl -X PUT "https://app.ciklik.co/api/v3/transactions/<transaction_id>" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"amount":9.9}'
```

Réponse 200 :

```json
{
  "data": {
    "order_id": 1,
    "order": {
      "order_id": 1,
      "status": "string",
      "items": [
        {}
      ],
      "revenue": "string",
      "refunded": "string",
      "customerRevenue": "string",
      "customerRefund": "string",
      "totalTransactionsSuccess": 1,
      "subTransactionsSuccess": 1,
      "next_billing": "2026-10-12T10:00:00+02:00",
      "countTransactions": 1,
      "choices": null
    },
    "gateway": "string",
    "transaction_id": "string",
    "detail": "string",
    "token": "string",
    "tenant_id": 1,
    "paid": true,
    "amount": "string",
    "refunded": true,
    "source_id": "string",
    "failure_message": "string",
    "failure_code": "string",
    "invoice_id": 1,
    "amount_refunded": "string",
    "statement_descriptor": "string",
    "user_id": 1,
    "created_at": "2026-10-12T10:00:00+02:00",
    "updated_at": "2026-10-12T10:00:00+02:00",
    "payment_intent_id": "string"
  }
}
```

Erreurs : 401 (Authentification requise (jeton absent ou invalide)), 403 (Accès interdit), 404 (La ressource n'a pas été trouvée), 422 (Erreur de validation du montant (`errors.amount`), ou remboursement refusé (motif dans `errors.error`)), 429 (Limite de débit atteinte (200 requêtes par minute, comptées par adresse IP).).
