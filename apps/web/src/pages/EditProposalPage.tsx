import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProposalForm } from "../modules/decision-proposals/ProposalForm";
import { useDecisionProposal } from "../modules/decision-proposals/useDecisionProposal";
import { fetchUsers } from "../modules/decision-proposals/api";
import type { User } from "../modules/decision-proposals/types";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";

export function EditProposalPage() {
  const { id } = useParams<{ id: string }>();
  const { proposal, loading, error, updateProposal } = useDecisionProposal(id!);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoadingUsers(false));
  }, []);

  if (loading || loadingUsers) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
        Loading...
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
        <div style={{ color: "#dc2626", marginBottom: "16px" }}>
          {error || "Proposal not found"}
        </div>
        <Link to={ROUTES.PROPOSALS} style={{ color: "#3b82f6" }}>
          Back to Proposals
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link
          to={ROUTES.PROPOSAL_DETAIL.replace(":id", id!)}
          style={{ color: "#3b82f6", fontSize: "14px" }}
        >
          Back to Proposal
        </Link>
      </div>

      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>
        Edit Proposal
      </h1>

      <ProposalForm
        proposal={proposal}
        users={users}
        onSubmit={updateProposal}
        isEditing
      />
    </div>
  );
}
