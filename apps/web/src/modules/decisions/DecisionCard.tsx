import { Link } from "react-router-dom";
import type { Decision } from "./types";
import type { DecisionProposal } from "../decision-proposals/types";
import { ROUTES } from "../../pages/routes";

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
        padding: "16px",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          <Link
            to={ROUTES.PROPOSAL_DETAIL.replace(":id", decision.proposalId)}
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1f2937",
              textDecoration: "none",
            }}
          >
            {proposal?.title || "Proposal"}
          </Link>
          <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
            Decided on {createdDate.toLocaleDateString()}
          </div>
        </div>
        <div
          style={{
            padding: "4px 8px",
            backgroundColor: "#d1fae5",
            color: "#047857",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Decided
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
          Selected Option
        </div>
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          {selectedOption?.text || decision.selectedOptionId}
        </div>
      </div>

      {decision.rationale && (
        <div>
          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
            Rationale
          </div>
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
              fontSize: "14px",
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
