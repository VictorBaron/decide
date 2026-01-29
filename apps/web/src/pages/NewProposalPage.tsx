import { Link } from "react-router-dom";
import { ProposalForm } from "../modules/decision-proposals/ProposalForm";
import { createProposal } from "../modules/decision-proposals/api";
import { useUsers } from "../modules/decision-proposals/useUsers";
import type { CreateDecisionProposalInput } from "../modules/decision-proposals/types";
import { ROUTES } from "./routes";
import { containerStyles, colors, spacing, cardStyles } from "../styles";

export function NewProposalPage() {
  const { users, loading: loadingUsers } = useUsers();

  if (loadingUsers) {
    return (
      <div style={containerStyles}>
        <div style={{ color: colors.textSecondary }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={{ marginBottom: spacing.xl }}>
        <Link
          to={ROUTES.PROPOSALS}
          style={{ color: colors.textSecondary, fontSize: 14 }}
        >
          Back to Proposals
        </Link>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={cardStyles}>
          <h1 style={{ fontSize: 18, marginBottom: spacing.sm }}>
            Create Decision Proposal
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginBottom: spacing.xl,
            }}
          >
            Define a decision that needs to be made by the team
          </p>

          <ProposalForm
            users={users}
            onSubmit={(data) => createProposal(data as CreateDecisionProposalInput)}
          />
        </div>
      </div>
    </div>
  );
}
