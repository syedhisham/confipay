import type { TransactionStatus, TransactionType } from "@/lib/types";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "accent";

export const TYPE_TONES: Record<TransactionType, BadgeTone> = {
  deposit: "success",
  withdraw: "warning",
  payroll: "accent",
  bridge: "neutral",
};

export const STATUS_TONES: Record<TransactionStatus, BadgeTone> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};
