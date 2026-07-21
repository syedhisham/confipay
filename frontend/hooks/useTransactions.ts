import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TransactionsResponse, TransactionType } from "@/lib/types";

interface UseTransactionsResult {
  transactions: TransactionsResponse["transactions"];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches treasury transactions, optionally filtered by type, and re-runs
 * whenever the filter changes or `refetch()` is called.
 *
 * `loading` is derived — it's true whenever the key describing the current
 * request hasn't settled yet — so the effect only writes state after the fetch
 * resolves and never sets state synchronously (avoiding cascading renders).
 */
export function useTransactions(
  type: TransactionType | ""
): UseTransactionsResult {
  const [data, setData] = useState<TransactionsResponse>({
    transactions: [],
    total: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [settledKey, setSettledKey] = useState<string | null>(null);

  const requestKey = `${type}:${reloadKey}`;
  const loading = settledKey !== requestKey;

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    let active = true;
    const query = type ? `?type=${encodeURIComponent(type)}` : "";

    api
      .get<TransactionsResponse>(`/api/treasury/transactions${query}`)
      .then((result) => {
        if (!active) return;
        setData(result);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Something went wrong");
        setData({ transactions: [], total: 0 });
      })
      .finally(() => {
        if (active) setSettledKey(requestKey);
      });

    return () => {
      active = false;
    };
  }, [type, reloadKey, requestKey]);

  return {
    transactions: data.transactions,
    total: data.total,
    loading,
    error,
    refetch,
  };
}
