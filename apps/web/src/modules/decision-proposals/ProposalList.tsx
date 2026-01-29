import { useState } from "react";
import { Link } from "react-router-dom";
import type { DecisionProposal, Criticality } from "./types";
import { ProposalCard } from "./ProposalCard";
import { ROUTES } from "../../pages/routes";
import {
  colors,
  spacing,
  inputStyles,
  primaryButtonStyles,
  cardStyles,
} from "../../styles";

interface ProposalListProps {
  proposals: DecisionProposal[];
  loading: boolean;
  error: string | null;
}

const CRITICALITY_OPTIONS: { value: Criticality | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "CRITICAL", label: "Critical" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

export function ProposalList({ proposals, loading, error }: ProposalListProps) {
  const [filter, setFilter] = useState<Criticality | "">("");

  const filtered = filter
    ? proposals.filter((p) => p.criticality === filter)
    : proposals;

  if (loading) {
    return (
      <div style={{ padding: spacing.xl, color: colors.textSecondary, textAlign: "center" }}>
        Loading proposals...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: spacing.xl, color: colors.error, textAlign: "center" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.xl,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <label style={{ fontSize: 14, color: colors.textSecondary }}>
            Filter:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Criticality | "")}
            style={{
              ...inputStyles,
              width: "auto",
              padding: "8px 12px",
            }}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Link to={ROUTES.PROPOSAL_NEW} style={{ textDecoration: "none" }}>
          <button style={primaryButtonStyles}>New Proposal</button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            ...cardStyles,
            textAlign: "center",
            color: colors.textSecondary,
          }}
        >
          {proposals.length === 0
            ? "No pending decisions. Create one above to get started!"
            : "No proposals match the selected filter."}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {filtered.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      )}
    </div>
  );
}
