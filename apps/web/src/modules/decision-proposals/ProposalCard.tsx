import { Link } from "react-router-dom";
import type { DecisionProposal } from "./types";
import { CriticalityBadge } from "./CriticalityBadge";
import { ROUTES } from "../../pages/routes";

interface ProposalCardProps {
  proposal: DecisionProposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const dueDate = new Date(proposal.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <Link
          to={ROUTES.PROPOSAL_DETAIL.replace(":id", proposal.id)}
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1f2937",
            textDecoration: "none",
          }}
        >
          {proposal.title}
        </Link>
        <CriticalityBadge criticality={proposal.criticality} />
      </div>

      <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
        <span>Decider: {proposal.decider.name || proposal.decider.email}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          color: isOverdue ? "#dc2626" : "#6b7280",
        }}
      >
        <span>
          Due: {dueDate.toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </span>
        <span>{proposal.options.length} option(s)</span>
      </div>
    </div>
  );
}
