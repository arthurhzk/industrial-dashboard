import { MachineMetrics, HistoricalPoint, OEE } from "../types";

function randomVariation(value: number, variation: number) {
  const change = (Math.random() - 0.5) * variation;
  return value + change;
}

let currentMetrics: MachineMetrics = {
  temperature: 65,
  rpm: 1200,
  uptime: 323,
  efficiency: 92
};

export function generateMetrics(): MachineMetrics {
  currentMetrics = {
    temperature: randomVariation(currentMetrics.temperature, 2),
    rpm: randomVariation(currentMetrics.rpm, 50),
    uptime: currentMetrics.uptime + 0.5,
    efficiency: randomVariation(currentMetrics.efficiency, 1)
  };

  return currentMetrics;
}

let currentOEE: OEE = {
  overall: 92,
  availability: 98,
  performance: 95,
  quality: 94
};

export function generateOEE(): OEE {
  currentOEE = {
    overall: randomVariation(currentOEE.overall, 1),
    availability: randomVariation(currentOEE.availability, 0.5),
    performance: randomVariation(currentOEE.performance, 0.5),
    quality: randomVariation(currentOEE.quality, 0.5)
  };
  return currentOEE;
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