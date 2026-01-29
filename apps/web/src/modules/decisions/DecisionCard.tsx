import { Link } from "react-router-dom";
import type { Decision } from "./types";
import type { DecisionProposal } from "../decision-proposals/types";
import { ROUTES } from "../../pages/routes";
import { colors, spacing, radius } from "../../styles";

interface DecisionCardProps {
  decision: Decision;
  proposal?: DecisionProposal;
}

export function DecisionCard({ decision, proposal }: DecisionCardProps) {
  const createdDate = new Date(decision.createdAt);
  const selectedOption = proposal?.options.find(
    (opt) => opt.id === decision.selectedOptionId
  );

  return (
    <div
      style={{
        padding: spacing.lg,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: spacing.md,
        }}
      >
        <div>
          <Link
            to={ROUTES.PROPOSAL_DETAIL.replace(":id", decision.proposalId)}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colors.textPrimary,
              textDecoration: "none",
            }}
          >
            {proposal?.title || "Proposal"}
          </Link>
          <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: spacing.xs }}>
            Decided on {createdDate.toLocaleDateString()}
          </div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            backgroundColor: colors.successBg,
            color: colors.success,
            borderRadius: radius.sm,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Decided
        </div>
      </div>

      <div style={{ marginBottom: spacing.md }}>
        <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.xs }}>
          Selected Option
        </div>
        <div
          style={{
            padding: spacing.md,
            backgroundColor: colors.successLight,
            border: `1px solid ${colors.successBorder}`,
            borderRadius: radius.md,
            fontWeight: 500,
          }}
        >
          {selectedOption?.text || decision.selectedOptionId}
        </div>
      </div>

      {decision.rationale && (
        <div>
          <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.xs }}>
            Rationale
          </div>
          <div
            style={{
              padding: spacing.md,
              backgroundColor: colors.secondary,
              borderRadius: radius.md,
              fontSize: 14,
              whiteSpace: "pre-wrap",
            }}
          >
            {decision.rationale}
          </div>
        </div>
      )}
    </div>
  );
}
