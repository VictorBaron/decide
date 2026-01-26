import { useParams } from "react-router-dom";
import { ProposalDetail } from "../modules/decision-proposals/ProposalDetail";
import { useDecisionProposal } from "../modules/decision-proposals/useDecisionProposal";
import { useDecisionByProposal, useMakeDecision } from "../modules/decisions";
import { useAuth } from "../modules/auth/useAuth";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";

export function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    proposal,
    loading: proposalLoading,
    error: proposalError,
    deleteProposal,
    addOption,
    removeOption,
  } = useDecisionProposal(id!);
  const { decision, refresh: refreshDecision } = useDecisionByProposal(id!);
  const { makeDecision } = useMakeDecision();

  const loading = proposalLoading;
  const error = proposalError;

  const handleMakeDecision = async (data: {
    selectedOptionId: string;
    rationale?: string;
  }) => {
    await makeDecision({
      proposalId: id!,
      selectedOptionId: data.selectedOptionId,
      rationale: data.rationale,
    });
    await refreshDecision();
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
        Loading...
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
        <div style={{ color: "#dc2626", marginBottom: "16px" }}>
          {error || "Proposal not found"}
        </div>
        <Link to={ROUTES.PROPOSALS} style={{ color: "#3b82f6" }}>
          Back to Proposals
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <ProposalDetail
        proposal={proposal}
        currentUserId={user?.id || ""}
        decision={decision}
        onDelete={deleteProposal}
        onAddOption={addOption}
        onRemoveOption={removeOption}
        onMakeDecision={handleMakeDecision}
      />
    </div>
  );
}
