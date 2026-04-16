type BadgeVariant =
  | "priority-high"
  | "priority-medium"
  | "priority-low"
  | "sentiment-angry"
  | "sentiment-neutral"
  | "sentiment-positive"
  | "status-replied"
  | "status-pending"
  | "category"
  | "review";

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  "priority-high":
    "bg-red-50 text-red-700 ring-1 ring-red-200",
  "priority-medium":
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  "priority-low":
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "sentiment-angry":
    "bg-red-50 text-red-700 ring-1 ring-red-200",
  "sentiment-neutral":
    "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  "sentiment-positive":
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "status-replied":
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "status-pending":
    "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
  category:
    "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  review:
    "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
};

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  );
}

/** Convenience helpers */
export function PriorityBadge({ priority }: { priority: string }) {
  const safe = priority ?? "";
  const map: Record<string, BadgeVariant> = {
    High: "priority-high",
    Medium: "priority-medium",
    Low: "priority-low",
  };
  const variant = map[safe] ?? "status-pending";
  return <Badge variant={variant} label={safe || "Unknown"} />;
}

export function SentimentBadge({ sentiment }: { sentiment: string }) {
  const lower = (sentiment ?? "").toLowerCase();
  const map: Record<string, BadgeVariant> = {
    angry: "sentiment-angry",
    neutral: "sentiment-neutral",
    positive: "sentiment-positive",
  };
  const variant = map[lower] ?? "sentiment-neutral";
  // Derive label from the null-safe `lower` string
  const label = lower ? lower.charAt(0).toUpperCase() + lower.slice(1) : "—";
  return <Badge variant={variant} label={label} />;
}

export function StatusBadge({ replied }: { replied: boolean }) {
  return (
    <Badge
      variant={replied ? "status-replied" : "status-pending"}
      label={replied ? "Replied" : "Pending"}
    />
  );
}
