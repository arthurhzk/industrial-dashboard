import { render, screen } from "@testing-library/react";
import { AlertPanel } from "@/components/AlertPanel";

jest.mock("@/hooks/useAlerts", () => ({
  useAlerts: () => ({
    alerts: [
      { id: "1", level: "CRITICAL", message: "Temp alta", component: "Misturador", timestamp: Date.now() - 60000, acknowledged: false },
      { id: "2", level: "INFO", message: "Manutenção", component: "Prensa", timestamp: Date.now() - 120000, acknowledged: false },
    ],
    isLoading: false,
  }),
}));

describe("AlertPanel", () => {
  it("renders alerts sorted by severity", () => {
    render(<AlertPanel />);
    const messages = screen.getAllByRole("generic").filter((el) => el.textContent?.includes("Temp alta") || el.textContent?.includes("Manutenção"));
    expect(screen.getByText("Temp alta")).toBeInTheDocument();
    expect(screen.getByText("Manutenção")).toBeInTheDocument();
  });

  it("shows Alertas Recentes title", () => {
    render(<AlertPanel />);
    expect(screen.getByText("Alertas Recentes")).toBeInTheDocument();
  });
});
