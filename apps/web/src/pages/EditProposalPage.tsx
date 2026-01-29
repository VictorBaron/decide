import { useParams, Link } from "react-router-dom";
import { ProposalForm } from "../modules/decision-proposals/ProposalForm";
import { useDecisionProposal } from "../modules/decision-proposals/useDecisionProposal";
import { useUsers } from "../modules/decision-proposals/useUsers";
import { ROUTES } from "./routes";
import { containerStyles, colors, spacing, cardStyles } from "../styles";

export function EditProposalPage() {
  const { id } = useParams<{ id: string }>();
  const { proposal, loading, error, updateProposal } = useDecisionProposal(id!);
  const { users, loading: loadingUsers } = useUsers();

  if (loading || loadingUsers) {
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
      <div style={{ marginBottom: spacing.xl }}>
        <Link
          to={ROUTES.PROPOSAL_DETAIL.replace(":id", id!)}
          style={{ color: colors.textSecondary, fontSize: 14 }}
        >
          Back to Proposal
        </Link>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: 18, marginBottom: spacing.sm }}>
            Edit Proposal
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginBottom: spacing.xl,
            }}
          >
            Update the decision proposal details
          </p>

          <ProposalForm
            proposal={proposal}
            users={users}
            onSubmit={updateProposal}
            isEditing
          />
        </div>
      </div>
    </div>
  );
}
