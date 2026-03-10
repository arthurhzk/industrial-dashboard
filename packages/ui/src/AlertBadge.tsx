import React from "react";
import { AlertLevel } from "@repo/types";

const colors: Record<AlertLevel, string> = {
  INFO: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  WARNING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  CRITICAL: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
};

const labels: Record<AlertLevel, string> = {
  INFO: "Info",
  WARNING: "Aviso",
  CRITICAL: "Crítico"
};

interface Props {
  level: AlertLevel;
}

export function AlertBadge({ level }: Props) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md ${colors[level]}`}>
      {labels[level]}
    </span>
  );
}