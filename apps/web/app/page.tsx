"use client";

import { useMachine } from "../hooks/useMachine";
import { MetricCard, StatusIndicator } from "@repo/ui";
import { MachineChart } from "@/components/MachineChart";
import { useHistory } from "@/hooks/useHistory";
import { AlertPanel } from "@/components/AlertPanel";
import { ConnectionStatus } from "@/components/ConnectionStatus";

function formatUptime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function Home() {
  const { machine, isLoading, isError } = useMachine();
  const { history } = useHistory();

  return (
    <div className="p-8 space-y-8">
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard de Monitoramento
        </h1>
        <ConnectionStatus isError={!!isError} />
      </header>

      {isLoading || !machine ? (
        <div className="min-h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          Carregando...
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {machine.name}
            </h2>
            <StatusIndicator status={machine.status} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Temperatura"
              value={machine.metrics.temperature.toFixed(1)}
              unit="°C"
            />
            <MetricCard
              title="RPM"
              value={machine.metrics.rpm.toFixed(0)}
            />
            <MetricCard
              title="Eficiência"
              value={machine.metrics.efficiency.toFixed(1)}
              unit="%"
            />
            <MetricCard
              title="Tempo de Operação"
              value={formatUptime(machine.operatingTime)}
            />
          </div>
          <AlertPanel />
          {history && <MachineChart data={history} />}
        </>
      )}
    </div>
  );
}