import { render, screen } from "@testing-library/react";
import { ConnectionStatus } from "@/components/ConnectionStatus";

describe("ConnectionStatus", () => {
  it("shows connected when not error", () => {
    render(<ConnectionStatus isError={false} />);
    expect(screen.getByText("Conectado")).toBeInTheDocument();
  });

  it("shows disconnected when error", () => {
    render(<ConnectionStatus isError={true} />);
    expect(screen.getByText("Desconectado")).toBeInTheDocument();
  });
});
