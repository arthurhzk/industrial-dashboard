import { render, screen } from "@testing-library/react";
import { StatusIndicator } from "@repo/ui";

describe("StatusIndicator", () => {
  it("renders RUNNING state", () => {
    render(<StatusIndicator status="RUNNING" />);
    expect(screen.getByText("Ligada")).toBeInTheDocument();
  });

  it("renders STOPPED state", () => {
    render(<StatusIndicator status="STOPPED" />);
    expect(screen.getByText("Desligada")).toBeInTheDocument();
  });

  it("renders MAINTENANCE state", () => {
    render(<StatusIndicator status="MAINTENANCE" />);
    expect(screen.getByText("Manutenção")).toBeInTheDocument();
  });

  it("renders ERROR state", () => {
    render(<StatusIndicator status="ERROR" />);
    expect(screen.getByText("Erro")).toBeInTheDocument();
  });
});
