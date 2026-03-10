interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

export function MetricCard({ title, value, unit }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 border border-gray-200 dark:border-gray-700 transition-shadow duration-200 hover:shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <div className="flex items-end gap-0.5 mt-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
        {unit && <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>}
      </div>
    </div>
  );
}