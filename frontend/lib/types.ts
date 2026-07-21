export const TRANSACTION_TYPES = [
  "deposit",
  "withdraw",
  "payroll",
  "bridge",
] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  chain: string;
  date: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
}
