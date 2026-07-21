"use client";

import { useMemo, useState } from "react";
import { Select, type SelectOption } from "@/components/ui/Select";
import { TransactionsTable } from "@/components/treasury/TransactionsTable";
import {
  EmptyState,
  ErrorState,
  TableSkeleton,
} from "@/components/treasury/TransactionStates";
import { useTransactions } from "@/hooks/useTransactions";
import { TRANSACTION_TYPES, type TransactionType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "All Types" },
  ...TRANSACTION_TYPES.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  })),
];

export default function TreasuryPage() {
  const [selectedType, setSelectedType] = useState<TransactionType | "">("");
  const { transactions, total, loading, error, refetch } =
    useTransactions(selectedType);

  const totalVolume = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const activeLabel =
    FILTER_OPTIONS.find((option) => option.value === selectedType)?.label ??
    "All Types";

  return (
    <div className="min-h-full bg-background">
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            ConFiPay
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Treasury
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and filter treasury transactions across every chain.
          </p>
        </header>

        {/* Toolbar */}
        <section className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
          <div className="flex w-full flex-col gap-1.5 sm:max-w-xs">
            <label
              htmlFor="type-filter"
              className="text-sm font-medium text-foreground"
            >
              Filter by type
            </label>
            <Select
              id="type-filter"
              value={selectedType}
              options={FILTER_OPTIONS}
              disabled={loading && !error}
              onChange={(e) =>
                setSelectedType(e.target.value as TransactionType | "")
              }
            />
          </div>

          <dl className="flex items-center gap-6 sm:gap-8">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Transactions
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-foreground">
                {loading ? "—" : total}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                Volume
              </dt>
              <dd className="mt-0.5 text-xl font-semibold text-foreground">
                {loading ? "—" : formatCurrency(totalVolume)}
              </dd>
            </div>
          </dl>
        </section>

        {/* Results */}
        <section className="mt-6">
          {loading ? (
            <TableSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : transactions.length === 0 ? (
            <EmptyState label={`${activeLabel.toLowerCase()} transactions`} />
          ) : (
            <>
              <p className="mb-3 text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{total}</span>{" "}
                {activeLabel === "All Types"
                  ? "transaction(s)"
                  : `${activeLabel.toLowerCase()} transaction(s)`}
              </p>
              <TransactionsTable transactions={transactions} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
