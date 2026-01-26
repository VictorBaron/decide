import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import type { Decision, MakeDecisionInput } from "./types";
import { queryKeys } from "../../lib/queryClient";
import { makeDecision as apiMakeDecision } from "./api";

interface UseMakeDecisionReturn {
  makeDecision: (data: MakeDecisionInput) => Promise<Decision>;
  loading: boolean;
  error: string | null;
}

export function useMakeDecision(): UseMakeDecisionReturn {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiMakeDecision,
    onSuccess: (decision) => {
      queryClient.setQueryData(
        queryKeys.decisions.byProposal(decision.proposalId),
        decision
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.decisions.all });
    },
  });

  return useMemo(
    () => ({
      makeDecision: mutation.mutateAsync,
      loading: mutation.isPending,
      error: mutation.error instanceof Error ? mutation.error.message : null,
    }),
    [mutation.mutateAsync, mutation.isPending, mutation.error]
  );
}
