import type { Machine, Alert, MetricHistory } from "@repo/types";

interface MachineRow {
  id: string;
  name: string;
  state: string;
  temperature: number;
  rpm: number;
  uptime: number;
  efficiency: number;
  operating_time: number;
  last_maintenance: string;
  oee_overall: number;
  oee_availability: number;
  oee_performance: number;
  oee_quality: number;
}

interface AlertRow {
  id: string;
  level: string;
  message: string;
  component: string;
  timestamp: number;
  acknowledged: number;
}

const machineTable: MachineRow[] = [];
const alertsTable: AlertRow[] = [];
const metricHistoryTable: MetricHistory[] = [];

let metricsSeed = {
  temperature: 65,
  rpm: 1200,
  uptime: 323,
  efficiency: 92
};

export function initDb() {
  if (machineTable.length > 0) return;
  const now = Date.now();
  machineTable.push({
    id: "machine-1",
    name: "Prensa Industrial A1",
    state: "RUNNING",
    temperature: metricsSeed.temperature,
    rpm: metricsSeed.rpm,
    uptime: metricsSeed.uptime,
    efficiency: metricsSeed.efficiency,
    operating_time: Math.floor(metricsSeed.uptime),
    last_maintenance: "2026-03-01",
    oee_overall: 92,
    oee_availability: 98,
    oee_performance: 95,
    oee_quality: 94
  });

  alertsTable.push(
    { id: "1", level: "CRITICAL", message: "Temperatura alta detectada", component: "Misturador", timestamp: now - 120000, acknowledged: 0 },
    { id: "2", level: "WARNING", message: "RPM abaixo do esperado", component: "Prensa", timestamp: now - 300000, acknowledged: 0 },
    { id: "3", level: "INFO", message: "Manutenção preventiva programada", component: "Resfriador", timestamp: now - 600000, acknowledged: 0 }
  );

  for (let i = 0; i < 30; i++) {
    const t = now - (30 - i) * 2000;
    metricsSeed = {
      temperature: metricsSeed.temperature + (Math.random() - 0.5) * 2,
      rpm: metricsSeed.rpm + (Math.random() - 0.5) * 50,
      uptime: metricsSeed.uptime + 0.5,
      efficiency: metricsSeed.efficiency + (Math.random() - 0.5) * 1
    };
    metricHistoryTable.push({
      timestamp: t,
      temperature: metricsSeed.temperature,
      rpm: metricsSeed.rpm,
      efficiency: metricsSeed.efficiency
    });
  }
}

export function getMachine(): Machine | null {
  initDb();
  const row = machineTable[0];
  if (!row) return null;

  const variation = (v: number, d: number) => v + (Math.random() - 0.5) * d;
  const temp = variation(row.temperature, 2);
  const rpm = variation(row.rpm, 50);
  const eff = variation(row.efficiency, 1);
  const uptime = row.uptime + 0.5;
  row.temperature = temp;
  row.rpm = rpm;
  row.efficiency = eff;
  row.uptime = uptime;

  return {
    id: row.id,
    name: row.name,
    status: row.state as Machine["status"],
    metrics: { temperature: temp, rpm, uptime, efficiency: eff },
    operatingTime: Math.floor(uptime),
    lastMaintenance: row.last_maintenance,
    oee: {
      overall: variation(row.oee_overall, 1),
      availability: variation(row.oee_availability, 0.5),
      performance: variation(row.oee_performance, 0.5),
      quality: variation(row.oee_quality, 0.5)
    }
  };
}

export function getAlerts(): Alert[] {
  initDb();
  return alertsTable.map((r) => ({
    id: r.id,
    level: r.level as Alert["level"],
    message: r.message,
    component: r.component,
    timestamp: r.timestamp,
    acknowledged: r.acknowledged === 1
  }));
}

export function getMetricHistory(limit = 30): MetricHistory[] {
  initDb();
  const history = [...metricHistoryTable];
  const last = history[history.length - 1];
  if (last) {
    history.push({
      timestamp: Date.now(),
      temperature: last.temperature + (Math.random() - 0.5) * 2,
      rpm: last.rpm + (Math.random() - 0.5) * 50,
      efficiency: last.efficiency + (Math.random() - 0.5) * 1
    });
  }
  return history.slice(-limit);
}
