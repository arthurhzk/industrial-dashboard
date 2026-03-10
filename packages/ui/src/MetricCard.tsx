interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

export function MetricCard({ title, value, unit }: MetricCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 border">
      <p className="text-sm text-gray-500">{title}</p>

      <div className="flex items-end gap-1 mt-2">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}