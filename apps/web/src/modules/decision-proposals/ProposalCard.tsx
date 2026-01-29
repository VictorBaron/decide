import { Link } from "react-router-dom";
import type { DecisionProposal } from "./types";
import { CriticalityBadge } from "./CriticalityBadge";
import { ROUTES } from "../../pages/routes";
import { colors, spacing, radius } from "../../styles";

interface ProposalCardProps {
  proposal: DecisionProposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const dueDate = new Date(proposal.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.lg,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: spacing.sm,
        }}
      >
        <Link
          to={ROUTES.PROPOSAL_DETAIL.replace(":id", proposal.id)}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.textPrimary,
            textDecoration: "none",
          }}
        >
          {proposal.title}
        </Link>
        <CriticalityBadge criticality={proposal.criticality} />
      </div>

      <div style={{ fontSize: 14, color: colors.textSecondary, marginBottom: spacing.sm }}>
        Decider: {proposal.decider.name || proposal.decider.email}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: isOverdue ? colors.error : colors.textSecondary,
        }}
      >
        <span>
          Due: {dueDate.toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </span>
        <span style={{ color: colors.textMuted }}>
          {proposal.options.length} option(s)
        </span>
      </div>
    </div>
  );
}
