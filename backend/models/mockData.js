/**
 * In-memory transaction store for the ConFiPay treasury.
 *
 * Each transaction exposes the shape consumed by the API:
 *   id      - short on-chain reference hash
 *   type    - one of: deposit | withdraw | payroll | bridge
 *   amount  - value in USD
 *   status  - completed | pending | failed
 *   chain   - settlement network
 *   date    - ISO-8601 timestamp
 */
const transactions = [
  {
    id: "0x7f3e8a",
    type: "payroll",
    amount: 45230,
    status: "completed",
    chain: "BNB",
    date: "2024-05-01T09:00:00Z",
  },
  {
    id: "0x2b91c4",
    type: "deposit",
    amount: 120000,
    status: "completed",
    chain: "Ethereum",
    date: "2024-05-03T14:22:00Z",
  },
  {
    id: "0x9d47f1",
    type: "withdraw",
    amount: 32500,
    status: "pending",
    chain: "Polygon",
    date: "2024-05-04T11:45:00Z",
  },
  {
    id: "0x5a6e2d",
    type: "bridge",
    amount: 78900,
    status: "completed",
    chain: "Arbitrum",
    date: "2024-05-06T16:10:00Z",
  },
  {
    id: "0xc0f83b",
    type: "payroll",
    amount: 51840,
    status: "completed",
    chain: "BNB",
    date: "2024-05-08T09:00:00Z",
  },
  {
    id: "0x1e74a9",
    type: "deposit",
    amount: 64000,
    status: "pending",
    chain: "Ethereum",
    date: "2024-05-10T08:30:00Z",
  },
  {
    id: "0x8f20d6",
    type: "withdraw",
    amount: 15750,
    status: "failed",
    chain: "BNB",
    date: "2024-05-12T13:05:00Z",
  },
  {
    id: "0x4b39e7",
    type: "bridge",
    amount: 23400,
    status: "completed",
    chain: "Polygon",
    date: "2024-05-14T10:18:00Z",
  },
];

module.exports = { transactions };
