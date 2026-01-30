import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { Decision } from "./types";
import { queryKeys } from "../../common/queryClient";
import { fetchDecisionByProposal } from "./api";

interface UseDecisionByProposalReturn {
  decision: Decision | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useDecisionByProposal(
  proposalId: string
): UseDecisionByProposalReturn {
  const {
    data: decision,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.decisions.byProposal(proposalId),
    queryFn: () => fetchDecisionByProposal(proposalId),
    enabled: !!proposalId,
  });

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return useMemo(
    () => ({
      decision: decision ?? null,
      loading,
      error: error instanceof Error ? error.message : null,
      refresh,
    }),
    [decision, loading, error, refresh]
  );
}
