"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { HistoricalPoint } from "@repo/types";

interface Props {
  data: HistoricalPoint[];
}

export function MachineChart({ data }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow h-[300px] transition-shadow duration-200 hover:shadow-md text-gray-800 dark:text-gray-300">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-5">Machine Metrics</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.3} />

          <XAxis
            dataKey="timestamp"
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString()
            }
          />

          <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />

          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleTimeString()
            }
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="rpm"
            stroke="#3b82f6"
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#10b981"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}