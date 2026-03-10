import useSWR from "swr";
import { Alert } from "@repo/types";
import { fetcher } from "./fetcher";

export function useAlerts() {
  const { data, error, isLoading } = useSWR<Alert[]>(
    "/api/alerts",
    fetcher,
    {
      refreshInterval: 5000
    }
  );

  return {
    alerts: data,
    isLoading,
    isError: error
  };
}