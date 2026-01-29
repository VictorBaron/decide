import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Criticality } from "../../types";
import { useDecisionProposals } from "../../useDecisionProposals";
import { ROUTES } from "../../../../pages/routes";
import { ProposalListView } from "./ProposalList.view";

export function ProposalListWidget() {
  const navigate = useNavigate();
  const { proposals, loading, error } = useDecisionProposals();
  const [filter, setFilter] = useState<Criticality | "">("");

  const handleProposalClick = (proposalId: string) => {
    navigate(ROUTES.PROPOSAL_DETAIL.replace(":id", proposalId));
  };

  return (
    <ProposalListView
      proposals={proposals}
      loading={loading}
      error={error}
      filter={filter}
      onFilterChange={setFilter}
      onProposalClick={handleProposalClick}
    />
  );
}
