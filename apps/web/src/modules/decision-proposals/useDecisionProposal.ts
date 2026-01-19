import { useState, useEffect, useCallback } from "react";
import type {
  DecisionProposal,
  UpdateDecisionProposalInput,
  AddOptionInput,
} from "./types";
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
  const [proposal, setProposal] = useState<DecisionProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProposal(id);
      setProposal(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load proposal");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const updateProposal = useCallback(
    async (data: UpdateDecisionProposalInput) => {
      const updated = await apiUpdate(id, data);
      setProposal(updated);
    },
    [id]
  );

  const deleteProposal = useCallback(async () => {
    await apiDelete(id);
    setProposal(null);
  }, [id]);

  const addOption = useCallback(
    async (data: AddOptionInput) => {
      const newOption = await apiAddOption(id, data);
      setProposal((prev) =>
        prev
          ? {
              ...prev,
              options: [...prev.options, newOption].sort(
                (a, b) => a.order - b.order
              ),
            }
          : null
      );
    },
    [id]
  );

  const removeOption = useCallback(
    async (optionId: string) => {
      await apiRemoveOption(id, optionId);
      setProposal((prev) =>
        prev
          ? { ...prev, options: prev.options.filter((o) => o.id !== optionId) }
          : null
      );
    },
    [id]
  );

  return {
    proposal,
    loading,
    error,
    updateProposal,
    deleteProposal,
    addOption,
    removeOption,
    refresh: load,
  };
}
