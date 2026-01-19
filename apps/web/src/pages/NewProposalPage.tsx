import { useState, useEffect } from "react";
import { ProposalForm } from "../modules/decision-proposals/ProposalForm";
import { createProposal, fetchUsers } from "../modules/decision-proposals/api";
import type { User, CreateDecisionProposalInput } from "../modules/decision-proposals/types";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";

export function NewProposalPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoadingUsers(false));
  }, []);

  if (loadingUsers) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link
          to={ROUTES.PROPOSALS}
          style={{ color: "#3b82f6", fontSize: "14px" }}
        >
          Back to Proposals
        </Link>
      </div>

      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>
        New Proposal
      </h1>

      <ProposalForm
        users={users}
        onSubmit={(data) => createProposal(data as CreateDecisionProposalInput)}
      />
    </div>
  );
}
