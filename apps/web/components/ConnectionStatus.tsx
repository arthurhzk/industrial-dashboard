"use client";

interface ConnectionStatusProps {
  isError: boolean;
}

export function ConnectionStatus({ isError }: ConnectionStatusProps) {
  if (!isError) {
    return (
      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Conectado
      </span>
    );
  }

  return (
    <span className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      Desconectado
    </span>
  );
}
