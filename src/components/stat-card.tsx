export function StatCard({
  label,
  value,
  delta,
  positive = true,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
}) {
  return (
    <div className="card p-5">
      <div className="text-sm text-[var(--muted)]">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        {delta && (
          <span
            className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}
          >
            {positive ? "▲" : "▼"} {delta}
          </span>
        )}
      </div>
    </div>
  );
}

export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-[var(--primary)]/40 to-[var(--primary)] transition-all"
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.value}`}
            />
          </div>
          <span className="text-xs text-[var(--muted)]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
