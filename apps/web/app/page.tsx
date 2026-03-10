"use client";

import { useMachine } from "../hooks/useMachine";
import { MetricCard, StatusIndicator } from "@repo/ui";
import { MachineChart } from "@/components/MachineChart";
import { useHistory } from "@/hooks/useHistory";
export default function Home() {
  const { machine, isLoading } = useMachine();
  const { history } = useHistory();

  if (isLoading || !machine) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{machine.name}</h1>
        <StatusIndicator status={machine.status} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          title="Temperature"
          value={machine.metrics.temperature.toFixed(1)}
          unit="°C"
        />

        <MetricCard
          title="RPM"
          value={machine.metrics.rpm.toFixed(0)}
        />

        <MetricCard
          title="Efficiency"
          value={machine.metrics.efficiency.toFixed(1)}
          unit="%"
        />
      </div>
      {history && <MachineChart data={history} />}
    </div>
  );
}