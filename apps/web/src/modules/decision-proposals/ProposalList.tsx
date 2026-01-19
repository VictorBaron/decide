import { useState } from "react";
import { Link } from "react-router-dom";
import type { DecisionProposal, Criticality } from "./types";
import { ProposalCard } from "./ProposalCard";
import { ROUTES } from "../../pages/routes";

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
    return <div style={{ padding: "20px" }}>Loading proposals...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "#dc2626" }}>Error: {error}</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <label style={{ marginRight: "8px", fontSize: "14px" }}>
            Filter by criticality:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Criticality | "")}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Link
          to={ROUTES.PROPOSAL_NEW}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          New Proposal
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
          {proposals.length === 0
            ? "No proposals yet. Create your first one!"
            : "No proposals match the selected filter."}
        </div>
      ) : (
        filtered.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))
      )}
    </div>
  );
}
