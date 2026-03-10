"use client";

import { useRef, useEffect } from "react";
import { useAlerts } from "../hooks/useAlerts";
import { AlertBadge } from "@repo/ui";
import { Alert, AlertLevel } from "@repo/types";

const SEVERITY_ORDER: Record<AlertLevel, number> = {
  CRITICAL: 0,
  WARNING: 1,
  INFO: 2
};

function sortAlerts(alerts: Alert[]): Alert[] {
  return [...alerts].sort((a, b) => {
    const levelDiff = SEVERITY_ORDER[a.level] - SEVERITY_ORDER[b.level];
    if (levelDiff !== 0) return levelDiff;
    return b.timestamp - a.timestamp;
  });
}

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}min`;
  return `${hours}h`;
}

export function AlertPanel() {
  const { alerts, isLoading } = useAlerts();
  const hasPlayedCritical = useRef(false);

  const sortedAlerts = alerts ? sortAlerts(alerts) : [];
  const hasCritical = sortedAlerts.some((a) => a.level === "CRITICAL");

  useEffect(() => {
    if (hasCritical && !hasPlayedCritical.current) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        osc.type = "sine";
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
        hasPlayedCritical.current = true;
      } catch {}
    }
    if (!hasCritical) hasPlayedCritical.current = false;
  }, [hasCritical]);

  if (isLoading) {
    return (
      <div className="text-gray-500 dark:text-gray-400">Carregando alertas...</div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Alertas Recentes
      </h2>

      <div className="space-y-2">
        {sortedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between gap-2 rounded p-2 border ${
              alert.level === "CRITICAL"
                ? "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-600 animate-pulse"
                : "border-gray-200 dark:border-gray-600 dark:bg-gray-700/50"
            }`}
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-700 dark:text-gray-300 block truncate">
                {alert.message}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatRelativeTime(alert.timestamp)}
              </span>
            </div>
            <AlertBadge level={alert.level} />
          </div>
        ))}
      </div>
    </div>
  );
}
