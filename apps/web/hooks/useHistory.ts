import useSWR from "swr";
import { HistoricalPoint } from "@repo/types";
import { fetcher } from "./fetcher";

export function useHistory() {
  const { data, error, isLoading } = useSWR<HistoricalPoint[]>(
    "/api/history",
    fetcher,
    {
      refreshInterval: 2000
    }
  );

  return {
    history: data,
    isLoading,
    isError: error
  };
}