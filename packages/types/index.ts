export type MachineStatus =
  | "RUNNING"
  | "STOPPED"
  | "MAINTENANCE"
  | "ERROR";

export interface MachineMetrics {
  temperature: number;
  rpm: number;
  vibration: number;
  efficiency: number;
}

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  metrics: MachineMetrics;
  operatingTime: number;
  lastMaintenance: string;
}

export interface HistoricalPoint {
  timestamp: number;
  temperature: number;
  rpm: number;
  efficiency: number;
}

export type AlertSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface Alert {
  id: string;
  machineId: string;
  message: string;
  severity: AlertSeverity;
  timestamp: number;
  resolved: boolean;
}

export interface OEE {
  availability: number;
  performance: number;
  quality: number;
  total: number;
}

export type ID = string;