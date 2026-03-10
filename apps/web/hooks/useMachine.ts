import useSWR from "swr";
import { Machine } from "@repo/types";
import { fetcher } from "./fetcher";

export function useMachine() {
  const { data, error, isLoading } = useSWR<Machine>(
    "/api/machine",
    fetcher,
    {
      refreshInterval: 2000
    }
  );

  return {
    machine: data,
    isLoading,
    isError: error
  };
}