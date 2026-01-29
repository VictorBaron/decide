import type { Decision } from "./types";
import type { DecisionProposal } from "../decision-proposals/types";
import { DecisionCard } from "./DecisionCard";
import { colors, spacing, radius, cardStyles } from "../../styles";

interface DecisionsListProps {
  decisions: Decision[];
  proposals: Map<string, DecisionProposal>;
  loading: boolean;
  error: string | null;
}

export function DecisionsList({
  decisions,
  proposals,
  loading,
  error,
}: DecisionsListProps) {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: spacing["2xl"], color: colors.textSecondary }}>
        Loading decisions...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: spacing["2xl"],
          color: colors.error,
          backgroundColor: colors.errorBg,
          borderRadius: radius.lg,
        }}
      >
        {error}
      </div>
    );
  }

  if (decisions.length === 0) {
    return (
      <div
        style={{
          ...cardStyles,
          textAlign: "center",
          color: colors.textSecondary,
        }}
      >
        <div style={{ fontSize: 16, marginBottom: spacing.sm }}>
          No decisions yet
        </div>
        <div style={{ fontSize: 14 }}>
          Decisions you make on proposals will appear here.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          proposal={proposals.get(decision.proposalId)}
        />
      ))}
    </div>
  );
}
