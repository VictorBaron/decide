import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { Decision } from "./types";
import { queryKeys } from "../../lib/queryClient";
import { fetchDecisions } from "./api";

interface UseDecisionsReturn {
  decisions: Decision[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useDecisions(): UseDecisionsReturn {
  const {
    data: decisions = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.decisions.all,
    queryFn: fetchDecisions,
  });

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return useMemo(
    () => ({
      decisions,
      loading,
      error: error instanceof Error ? error.message : null,
      refresh,
    }),
    [decisions, loading, error, refresh]
  );
}
