import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/hooks/useMachine", () => ({
  useMachine: () => ({
    machine: {
      id: "1",
      name: "Prensa A1",
      status: "RUNNING",
      metrics: { temperature: 78, rpm: 1200, uptime: 323, efficiency: 92 },
      operatingTime: 323,
      lastMaintenance: "2026-03-01",
      oee: { overall: 92, availability: 98, performance: 95, quality: 94 },
    },
    isLoading: false,
    isError: null,
  }),
}));

jest.mock("@/hooks/useHistory", () => ({
  useHistory: () => ({
    history: [
      { timestamp: Date.now(), temperature: 78, rpm: 1200, efficiency: 92 },
    ],
    isLoading: false,
  }),
}));

jest.mock("@/hooks/useAlerts", () => ({
  useAlerts: () => ({
    alerts: [],
    isLoading: false,
  }),
}));

jest.mock("@/components/MachineChart", () => ({
  MachineChart: () => <div data-testid="machine-chart">Chart</div>,
}));

describe("Home", () => {
  it("displays machine name and metrics when loaded", () => {
    render(<Home />);
    expect(screen.getByText("Prensa A1")).toBeInTheDocument();
    expect(screen.getByText("Dashboard de Monitoramento")).toBeInTheDocument();
  });
});
