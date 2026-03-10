import React from "react";
import { AlertSeverity } from "../types";

const colors = {
  LOW: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  CRITICAL: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
};

const labels: Record<AlertSeverity, string> = {
  LOW: "Baixo",
  MEDIUM: "Médio",
  HIGH: "Alto",
  CRITICAL: "Crítico"
};

interface Props {
  severity: AlertSeverity;
}

export function AlertBadge({ severity }: Props) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md ${colors[severity]}`}>
      {labels[severity]}
    </span>
  );
}