import { MachineMetrics, HistoricalPoint } from "../types";

function randomVariation(value: number, variation: number) {
  const change = (Math.random() - 0.5) * variation;
  return value + change;
}

let currentMetrics: MachineMetrics = {
  temperature: 65,
  rpm: 1200,
  vibration: 0.3,
  efficiency: 92
};

export function generateMetrics(): MachineMetrics {
  currentMetrics = {
    temperature: randomVariation(currentMetrics.temperature, 2),
    rpm: randomVariation(currentMetrics.rpm, 50),
    vibration: randomVariation(currentMetrics.vibration, 0.05),
    efficiency: randomVariation(currentMetrics.efficiency, 1)
  };

  return currentMetrics;
}

export function generateHistoricalPoint(): HistoricalPoint {
  const metrics = generateMetrics();

  return {
    timestamp: Date.now(),
    temperature: metrics.temperature,
    rpm: metrics.rpm,
    efficiency: metrics.efficiency
  };
}

export function generateHistory(size = 30): HistoricalPoint[] {
  const history: HistoricalPoint[] = [];

  for (let i = 0; i < size; i++) {
    history.push(generateHistoricalPoint());
  }

  return history;
}