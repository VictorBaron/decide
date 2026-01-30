import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";
import type {
  DecisionProposal,
  UpdateDecisionProposalInput,
  AddOptionInput,
} from "./types";
import { queryKeys } from "../../common/queryClient";
import {
  fetchProposal,
  updateProposal as apiUpdate,
  deleteProposal as apiDelete,
  addOption as apiAddOption,
  removeOption as apiRemoveOption,
} from "./api";

interface UseDecisionProposalReturn {
  proposal: DecisionProposal | null;
  loading: boolean;
  error: string | null;
  updateProposal: (data: UpdateDecisionProposalInput) => Promise<void>;
  deleteProposal: () => Promise<void>;
  addOption: (data: AddOptionInput) => Promise<void>;
  removeOption: (optionId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useDecisionProposal(id: string): UseDecisionProposalReturn {
  const queryClient = useQueryClient();

  const {
    data: proposal,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.proposals.detail(id),
    queryFn: () => fetchProposal(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateDecisionProposalInput) => apiUpdate(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.proposals.detail(id), updated);
      queryClient.invalidateQueries({ queryKey: queryKeys.proposals.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiDelete(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.proposals.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.proposals.all });
    },
  });

  const addOptionMutation = useMutation({
    mutationFn: (data: AddOptionInput) => apiAddOption(id, data),
    onSuccess: (newOption) => {
      queryClient.setQueryData<DecisionProposal | undefined>(
        queryKeys.proposals.detail(id),
        (old) =>
          old
            ? {
                ...old,
                options: [...old.options, newOption].sort(
                  (a, b) => a.order - b.order
                ),
              }
            : undefined
      );
    },
  });

  const removeOptionMutation = useMutation({
    mutationFn: (optionId: string) => apiRemoveOption(id, optionId),
    onSuccess: (_, optionId) => {
      queryClient.setQueryData<DecisionProposal | undefined>(
        queryKeys.proposals.detail(id),
        (old) =>
          old
            ? { ...old, options: old.options.filter((o) => o.id !== optionId) }
            : undefined
      );
    },
  });

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const updateProposal = useCallback(
    async (data: UpdateDecisionProposalInput) => {
      await updateMutation.mutateAsync(data);
    },
    [updateMutation]
  );

  const deleteProposal = useCallback(async () => {
    await deleteMutation.mutateAsync();
  }, [deleteMutation]);

  const addOption = useCallback(
    async (data: AddOptionInput) => {
      await addOptionMutation.mutateAsync(data);
    },
    [addOptionMutation]
  );

  const removeOption = useCallback(
    async (optionId: string) => {
      await removeOptionMutation.mutateAsync(optionId);
    },
    [removeOptionMutation]
  );

  return useMemo(
    () => ({
      proposal: proposal ?? null,
      loading,
      error: error instanceof Error ? error.message : null,
      updateProposal,
      deleteProposal,
      addOption,
      removeOption,
      refresh,
    }),
    [
      proposal,
      loading,
      error,
      updateProposal,
      deleteProposal,
      addOption,
      removeOption,
      refresh,
    ]
  );
}
