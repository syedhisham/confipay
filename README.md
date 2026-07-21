# ConFiPay — Treasury Transaction Filtering

Filter treasury transactions by type (`deposit`, `withdraw`, `payroll`, `bridge`)
end-to-end: an Express API exposes a single filtered endpoint, and the Next.js
Treasury page consumes it with a dropdown filter plus loading, empty, and error
states.

## Project structure

```
backend/                     Express API
  controllers/treasuryController.js   getTransactions (filter + validation)
  routes/index.js                     route registration (auth-protected)
  middleware/requireAuth.js           bearer-token guard
  middleware/errorHandler.js          404 + error envelope
  models/mockData.js                  8 seed transactions
  utils/apiResponse.js                consistent { success, data|error } envelope
  config/index.js                     env-driven config

frontend/                    Next.js 16 (App Router, Tailwind v4)
  app/treasury/page.tsx               Treasury page (filter + states)
  hooks/useTransactions.ts            data-fetching hook
  lib/api.ts                          fetch wrapper (base URL + auth + envelope)
  lib/types.ts, lib/utils.ts          shared types + formatters
  components/ui/                       Select, Button, Badge (reusable)
  components/treasury/                 TransactionsTable + state views
```

## Getting started

**1. Backend** (http://localhost:4000)

```bash
cd backend
npm install
npm start
```

**2. Frontend** (http://localhost:3000)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 — the root redirects to `/treasury`.

Environment defaults live in `backend/.env.example` and `frontend/.env.local`
(both already have working demo values, including the shared demo auth token).

## API

`GET /api/treasury/transactions` — requires `Authorization: Bearer <token>`.

| Query  | Description                                              |
| ------ | ------------------------------------------------------- |
| `type` | optional — `deposit` \| `withdraw` \| `payroll` \| `bridge` |

Success:

```json
{ "success": true, "data": { "transactions": [ ... ], "total": 4 } }
```

Invalid `type` returns `400`; missing/invalid token returns `401`.

## Example requests

```bash
TOKEN=confipay-demo-token

# 1. All transactions -> total 8
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:4000/api/treasury/transactions"

# 2. Only payroll -> total 2
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:4000/api/treasury/transactions?type=payroll"

# 3. Invalid type -> 400
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:4000/api/treasury/transactions?type=foo"
```

## What was tested

- All four type filters return only matching transactions with an accurate `total`.
- No filter returns all 8 transactions.
- Invalid `type` returns `400`; missing/invalid token returns `401`.
- CORS allows the frontend origin; the dropdown refetches without a page reload.
- Loading, empty, and error states render; the layout is responsive (table on
  desktop, stacked cards on mobile).
- `npm run lint`, `tsc --noEmit`, and `npm run build` all pass.

## Notes & decisions

- **Auth**: the endpoint is protected by a small bearer-token middleware (the
  demo token is shared via env for easy testing). In production this would verify
  a signed session/JWT.
- **Loading is derived** in `useTransactions` (request-key vs. settled-key) rather
  than set synchronously in the effect, which keeps the fetch effect free of
  cascading-render lint violations while still showing a spinner on every change.
- The frontend calls the Express API directly with CORS. A same-origin BFF proxy
  would hide the token entirely, but that was intentionally left out to avoid
  overengineering the assessment scope.
