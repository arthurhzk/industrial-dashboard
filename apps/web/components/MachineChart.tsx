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
    <div className="bg-white p-4 rounded-xl border shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Machine Metrics</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString()
            }
          />

          <YAxis />

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