import { Badge } from "@/components/ui/Badge";
import type { Transaction } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { STATUS_TONES, TYPE_TONES } from "./transactionMeta";

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <>
      {/* Desktop / tablet: table */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Transaction</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Chain</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
              >
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {tx.id}
                </td>
                <td className="px-5 py-4">
                  <Badge tone={TYPE_TONES[tx.type]}>{tx.type}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge tone={STATUS_TONES[tx.status]}>{tx.status}</Badge>
                </td>
                <td className="px-5 py-4 text-foreground">{tx.chain}</td>
                <td className="px-5 py-4 text-muted-foreground">
                  {formatDate(tx.date)}
                </td>
                <td className="px-5 py-4 text-right font-mono font-medium text-foreground">
                  {formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <ul className="space-y-3 sm:hidden">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={TYPE_TONES[tx.type]}>{tx.type}</Badge>
                <Badge tone={STATUS_TONES[tx.status]}>{tx.status}</Badge>
              </div>
              <span className="font-mono text-sm font-medium text-foreground">
                {formatCurrency(tx.amount)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono">{tx.id}</span>
              <span>
                {tx.chain} • {formatDate(tx.date)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
