import { useMemo } from "react";
import { useDecisions } from "../../useDecisions";
import { useDecisionProposals } from "../../../decision-proposals/useDecisionProposals";
import { DecisionsListView } from "./DecisionsList.view";

export function DecisionsListWidget() {
  const { decisions, loading: decisionsLoading, error: decisionsError } = useDecisions();
  const { proposals, loading: proposalsLoading, error: proposalsError } = useDecisionProposals();

  const proposalsMap = useMemo(() => {
    const map = new Map<string, (typeof proposals)[number]>();
    proposals.forEach((p) => map.set(p.id, p));
    return map;
  }, [proposals]);

  const loading = decisionsLoading || proposalsLoading;
  const error = decisionsError || proposalsError;

  return (
    <DecisionsListView
      decisions={decisions}
      proposals={proposalsMap}
      loading={loading}
      error={error}
    />
  );
}
