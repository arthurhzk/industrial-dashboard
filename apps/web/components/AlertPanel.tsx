"use client";

import { useAlerts } from "../hooks/useAlerts";
import { AlertBadge } from "@repo/ui";

export function AlertPanel() {
  const { alerts, isLoading } = useAlerts();

  if (isLoading) {
    return (
      <div className="text-gray-500 dark:text-gray-400">Carregando alertas...</div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Alertas
      </h2>

      <div className="space-y-2">
        {alerts?.map(alert => (
          <div
            key={alert.id}
            className="flex items-center justify-between border border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 rounded p-2"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {alert.message}
            </span>

            <AlertBadge severity={alert.severity} />
          </div>
        ))}
      </div>
    </div>
  );
}