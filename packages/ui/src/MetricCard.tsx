export type TrendDirection = "up" | "down" | "neutral";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: TrendDirection;
  maxValue?: string | number;
}

export function MetricCard({ title, value, unit, trend = "neutral", maxValue }: MetricCardProps) {
  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : null;
  const trendColor =
    trend === "up"
      ? "text-red-500"
      : trend === "down"
        ? "text-green-500"
        : "text-gray-400 dark:text-gray-500";

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 border border-gray-200 dark:border-gray-700 transition-shadow duration-200 hover:shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <div className="flex items-end gap-1.5 mt-2 flex-wrap">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
        {unit && <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>}
        {trendSymbol && <span className={`text-sm font-medium ${trendColor}`}>{trendSymbol}</span>}
      </div>
      {maxValue !== undefined && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Máx: {maxValue}</p>
      )}
    </div>
  );
}