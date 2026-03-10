import React from "react";
import { AlertSeverity } from "../types";

const colors = {
  LOW: "bg-blue-100 text-blue-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700"
};

interface Props {
  severity: AlertSeverity;
}

export function AlertBadge({ severity }: Props) {
  return (
    <span className={`px-2 py-1 text-xs rounded ${colors[severity]}`}>
      {severity}
    </span>
  );
}