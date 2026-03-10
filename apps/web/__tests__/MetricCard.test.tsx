import { render, screen } from "@testing-library/react";
import { MetricCard } from "@repo/ui";

describe("MetricCard", () => {
  it("renders title and value", () => {
    render(<MetricCard title="Temperatura" value="78.5" unit="°C" />);
    expect(screen.getByText("Temperatura")).toBeInTheDocument();
    expect(screen.getByText("78.5")).toBeInTheDocument();
    expect(screen.getByText("°C")).toBeInTheDocument();
  });

  it("renders trend up", () => {
    render(<MetricCard title="RPM" value="1200" trend="up" />);
    expect(screen.getByText("▲")).toBeInTheDocument();
  });

  it("renders trend down", () => {
    render(<MetricCard title="RPM" value="1200" trend="down" />);
    expect(screen.getByText("▼")).toBeInTheDocument();
  });

  it("renders maxValue when provided", () => {
    render(<MetricCard title="Temperatura" value="78" unit="°C" maxValue="85°C" />);
    expect(screen.getByText(/Máx: 85°C/)).toBeInTheDocument();
  });
});
