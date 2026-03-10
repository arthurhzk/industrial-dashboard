"use client";

import { useMachine } from "../hooks/useMachine";
import { MetricCard, StatusIndicator } from "@repo/ui";
import { MachineChart } from "@/components/MachineChart";
import { MetricGauge } from "@/components/MetricGauge";
import { useHistory } from "@/hooks/useHistory";
import { AlertPanel } from "@/components/AlertPanel";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { ThemeToggle } from "@/components/ThemeToggle";

function formatUptime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function getTrend(
  current: number,
  previous: number | undefined
): "up" | "down" | "neutral" {
  if (previous === undefined) return "neutral";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

export default function Home() {
  const { machine, isLoading, isError } = useMachine();
  const { history } = useHistory();

  const last = history?.length ? history[history.length - 1] : null;
  const prev = history && history.length >= 2 ? history[history.length - 2] : null;

  const tempTrend = last && prev ? getTrend(last.temperature, prev.temperature) : "neutral";
  const rpmTrend = last && prev ? getTrend(last.rpm, prev.rpm) : "neutral";

  return (
    <div className="p-8 space-y-8">
      <header className="flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            D
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard de Monitoramento
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ConnectionStatus isError={!!isError} />
          <button
            type="button"
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Configurações"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
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
              trend={tempTrend}
              maxValue="85°C"
            />
            <MetricCard
              title="RPM"
              value={machine.metrics.rpm.toFixed(0)}
              trend={rpmTrend}
              maxValue="1500"
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
          <div className="grid grid-cols-2 gap-4">
            <MetricGauge
              title="Temperatura"
              value={machine.metrics.temperature}
              max={85}
              unit="°C"
            />
            <MetricGauge
              title="RPM"
              value={machine.metrics.rpm}
              max={1500}
            />
          </div>
          {history && <MachineChart data={history} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AlertPanel />
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Métricas de Eficiência
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">OEE</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {machine.oee.overall.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Disponibilidade</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {machine.oee.availability.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Performance</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {machine.oee.performance.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Qualidade</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {machine.oee.quality.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}