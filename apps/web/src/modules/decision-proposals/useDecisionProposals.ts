import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";
import type {
  DecisionProposal,
  CreateDecisionProposalInput,
  Criticality,
} from "./types";
import { queryKeys } from "../../common/queryClient";
import {
  fetchProposals,
  createProposal as apiCreate,
  deleteProposal as apiDelete,
} from "./api";

interface UseDecisionProposalsReturn {
  proposals: DecisionProposal[];
  loading: boolean;
  error: string | null;
  createProposal: (
    data: CreateDecisionProposalInput
  ) => Promise<DecisionProposal>;
  deleteProposal: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  filterByCriticality: (criticality: Criticality | null) => DecisionProposal[];
}

export function useDecisionProposals(): UseDecisionProposalsReturn {
  const queryClient = useQueryClient();

  const {
    data: proposals = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.proposals.all,
    queryFn: fetchProposals,
  });

  const createMutation = useMutation({
    mutationFn: apiCreate,
    onSuccess: (newProposal) => {
      queryClient.setQueryData<DecisionProposal[]>(
        queryKeys.proposals.all,
        (old) => (old ? [...old, newProposal] : [newProposal])
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: apiDelete,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<DecisionProposal[]>(
        queryKeys.proposals.all,
        (old) => (old ? old.filter((p) => p.id !== deletedId) : [])
      );
    },
  });

  const filterByCriticality = useCallback(
    (criticality: Criticality | null) => {
      if (!criticality) return proposals;
      return proposals.filter((p) => p.criticality === criticality);
    },
    [proposals]
  );

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return useMemo(
    () => ({
      proposals,
      loading,
      error: error instanceof Error ? error.message : null,
      createProposal: createMutation.mutateAsync,
      deleteProposal: deleteMutation.mutateAsync,
      refresh,
      filterByCriticality,
    }),
    [
      proposals,
      loading,
      error,
      createMutation.mutateAsync,
      deleteMutation.mutateAsync,
      refresh,
      filterByCriticality,
    ]
  );
}
