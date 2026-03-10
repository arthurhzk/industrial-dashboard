"use client";

interface MetricGaugeProps {
  title: string;
  value: number;
  max: number;
  unit?: string;
}

export function MetricGauge({ title, value, max, unit = "" }: MetricGaugeProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDasharray = `${percentage} ${100 - percentage}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4 flex flex-col items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
      <div className="relative w-32 h-20">
        <svg viewBox="0 0 120 60" className="w-full h-full">
          <path
            d="M 10 50 A 50 50 0 0 1 110 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-gray-200 dark:text-gray-600"
          />
          <path
            d="M 10 50 A 50 50 0 0 1 110 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className="text-blue-500 dark:text-blue-400 transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {value.toFixed(value % 1 === 0 ? 0 : 1)}
            {unit}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Máx: {max}
        {unit}
      </p>
    </div>
  );
}
