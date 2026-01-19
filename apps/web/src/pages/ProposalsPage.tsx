import { ProposalList } from "../modules/decision-proposals/ProposalList";
import { useDecisionProposals } from "../modules/decision-proposals/useDecisionProposals";
import { LogoutButton } from "../modules/auth/LogoutButton";
import { Link } from "react-router-dom";
import { ROUTES } from "./routes";

export function ProposalsPage() {
  const { proposals, loading, error } = useDecisionProposals();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 600 }}>Decision Proposals</h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to={ROUTES.HOME} style={{ color: "#3b82f6", fontSize: "14px" }}>
            Home
          </Link>
          <LogoutButton />
        </div>
      </div>

      <ProposalList proposals={proposals} loading={loading} error={error} />
    </div>
  );
}
