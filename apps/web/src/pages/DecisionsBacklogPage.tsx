import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDecisions, DecisionsList } from "../modules/decisions";
import { useDecisionProposals } from "../modules/decision-proposals/useDecisionProposals";
import { ROUTES } from "./routes";

export function DecisionsBacklogPage() {
  const { decisions, loading: decisionsLoading, error: decisionsError } = useDecisions();
  const { proposals, loading: proposalsLoading, error: proposalsError } = useDecisionProposals();

  const proposalsMap = useMemo(() => {
    const map = new Map(proposals.map((p) => [p.id, p]));
    return map;
  }, [proposals]);

  const loading = decisionsLoading || proposalsLoading;
  const error = decisionsError || proposalsError;

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
        <h1 style={{ fontSize: "24px", fontWeight: 600 }}>Decisions Backlog</h1>
        <Link
          to={ROUTES.PROPOSALS}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          View Proposals
        </Link>
      </div>

      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        A log of all decisions you have made on proposals.
      </p>

      <DecisionsList
        decisions={decisions}
        proposals={proposalsMap}
        loading={loading}
        error={error}
      />
    </div>
  );
}
