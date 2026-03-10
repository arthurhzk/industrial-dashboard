import React from "react";
import { MachineStatus } from "../types";

const colors = {
  RUNNING: "bg-green-500",
  STOPPED: "bg-gray-400",
  MAINTENANCE: "bg-yellow-500",
  ERROR: "bg-red-500"
};

interface Props {
  status: MachineStatus;
}

export function StatusIndicator({ status }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5">
      <div
        className={`w-3 h-3 rounded-full ${colors[status]} ${status === "RUNNING" ? "animate-pulse" : ""}`}
      />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{status}</span>
    </div>
  );
}