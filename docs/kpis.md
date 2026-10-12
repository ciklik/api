# kpis

Opérations liées aux indicateurs de performance

## Récupérer les indicateurs de performance

`GET /kpis`

Permet de récupérer les indicateurs de performance avec différents filtres.

| Paramètre | Où | Type | Obligatoire | Description |
|---|---|---|---|---|
| `filter[created_at_before]` | query | string | non | Filtre les KPIs créés avant cette date |
| `filter[created_at_after]` | query | string | non | Filtre les KPIs créés après cette date |
| `sort` | query | string | non | Tri des résultats (prefix - pour ordre décroissant) |

Exemple de requête :

```bash
curl -X GET "https://app.ciklik.co/api/v3/kpis" \
  -H "Authorization: Bearer $CIKLIK_API_TOKEN" \
  -H "Accept: application/json"
```

Réponse 200 :

```json
{
  "data": [
    {
      "users_subscribed": 1,
      "subscriptions": 1,
      "sum_subscriptions": 1,
      "purchases": 1,
      "sum_purchases": 1,
      "subscriptions_paused": 1,
      "subscriptions_restarted": 1,
      "subscription_grace_total": 1,
      "subscription_grace_ending": 1,
      "lives": 1,
      "active_expired": 1,
      "source_updated_count": 1,
      "voided_unsub_voucher_count": 1,
      "voided_unsub_postpone_count": 1,
      "amount_utm": 1,
      "amount_referral": 1,
      "amount_regain": 1,
      "amount_retry": 1,
      "amount_renew": 1,
      "amount_backend": 1,
      "amount_unsub_voucher": 1,
      "amount_unsub_postpone": 1,
      "amount_reactivation_offer": 1,
      "count_utm": 1,
      "count_referral": 1,
      "count_regain": 1,
      "count_retry": 1,
      "count_renew": 1,
      "count_backend": 1,
      "count_unsub_voucher": 1,
      "count_unsub_postpone": 1,
      "count_reactivation_offer": 1,
      "count_followup": 1,
      "amount_followup": 1,
      "amount_renew_failed": 1,
      "count_renew_failed": 1,
      "created_at": "2026-10-12T10:00:00+02:00"
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
