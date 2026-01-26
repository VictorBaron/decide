import type { Decision } from "./types";
import type { DecisionProposal } from "../decision-proposals/types";
import { DecisionCard } from "./DecisionCard";

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
      <div style={{ textAlign: "center", padding: "32px", color: "#6b7280" }}>
        Loading decisions...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "32px",
          color: "#dc2626",
          backgroundColor: "#fef2f2",
          borderRadius: "8px",
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
          textAlign: "center",
          padding: "48px",
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          color: "#6b7280",
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "8px" }}>
          No decisions yet
        </div>
        <div style={{ fontSize: "14px" }}>
          Decisions you make on proposals will appear here.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
