export type MachineState =
  | "RUNNING"
  | "STOPPED"
  | "MAINTENANCE"
  | "ERROR";

export type MachineStatus = MachineState;

export interface MachineMetrics {
  temperature: number;
  rpm: number;
  uptime: number;
  efficiency: number;
}

export interface OEE {
  overall: number;
  availability: number;
  performance: number;
  quality: number;
}

export interface Machine {
  id: string;
  name: string;
  status: MachineState;
  metrics: MachineMetrics;
  operatingTime: number;
  lastMaintenance: string;
  oee: OEE;
}

export interface MetricHistory {
  timestamp: number;
  temperature: number;
  rpm: number;
  efficiency: number;
}

export type HistoricalPoint = MetricHistory;

export type AlertLevel = "INFO" | "WARNING" | "CRITICAL";

export interface Alert {
  id: string;
  level: AlertLevel;
  message: string;
  component: string;
  timestamp: number;
  acknowledged: boolean;
}

export type ID = string;
