import { useState, useEffect, useCallback } from "react";
import type {
  DecisionProposal,
  CreateDecisionProposalInput,
  Criticality,
} from "./types";
import {
  fetchProposals,
  createProposal as apiCreate,
  deleteProposal as apiDelete,
} from "./api";

interface UseDecisionProposalsReturn {
  proposals: DecisionProposal[];
  loading: boolean;
  error: string | null;
  createProposal: (data: CreateDecisionProposalInput) => Promise<DecisionProposal>;
  deleteProposal: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  filterByCriticality: (criticality: Criticality | null) => DecisionProposal[];
}

export function useDecisionProposals(): UseDecisionProposalsReturn {
  const [proposals, setProposals] = useState<DecisionProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProposals();
      setProposals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load proposals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createProposal = useCallback(
    async (data: CreateDecisionProposalInput) => {
      const newProposal = await apiCreate(data);
      setProposals((prev) => [...prev, newProposal]);
      return newProposal;
    },
    []
  );

  const deleteProposal = useCallback(async (id: string) => {
    await apiDelete(id);
    setProposals((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const filterByCriticality = useCallback(
    (criticality: Criticality | null) => {
      if (!criticality) return proposals;
      return proposals.filter((p) => p.criticality === criticality);
    },
    [proposals]
  );

  return {
    proposals,
    loading,
    error,
    createProposal,
    deleteProposal,
    refresh: load,
    filterByCriticality,
  };
}
