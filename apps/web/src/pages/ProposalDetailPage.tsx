import { useParams, Link } from "react-router-dom";
import { ProposalDetail } from "../modules/decision-proposals/ProposalDetail";
import { useDecisionProposal } from "../modules/decision-proposals/useDecisionProposal";
import { useDecisionByProposal, useMakeDecision } from "../modules/decisions";
import { useAuth } from "../modules/auth/useAuth";
import { ROUTES } from "./routes";
import { containerStyles, colors, spacing } from "../styles";

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
      <div style={containerStyles}>
        <div style={{ color: colors.textSecondary }}>Loading...</div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div style={containerStyles}>
        <div style={{ color: colors.error, marginBottom: spacing.lg }}>
          {error || "Proposal not found"}
        </div>
        <Link to={ROUTES.PROPOSALS} style={{ color: colors.primary }}>
          Back to Proposals
        </Link>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
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
