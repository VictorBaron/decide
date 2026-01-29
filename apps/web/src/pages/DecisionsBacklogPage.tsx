import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDecisions, DecisionsList } from "../modules/decisions";
import { useDecisionProposals } from "../modules/decision-proposals/useDecisionProposals";
import { LogoutButton } from "../modules/auth/LogoutButton";
import { useAuth } from "../modules/auth/useAuth";
import { ROUTES } from "./routes";
import {
  containerStyles,
  pageHeaderStyles,
  colors,
  spacing,
  tabContainerStyles,
  tabStyles,
} from "../styles";

export function DecisionsBacklogPage() {
  const { decisions, loading: decisionsLoading, error: decisionsError } = useDecisions();
  const { proposals, loading: proposalsLoading, error: proposalsError } = useDecisionProposals();
  const { user } = useAuth();

  const proposalsMap = useMemo(() => {
    const map = new Map(proposals.map((p) => [p.id, p]));
    return map;
  }, [proposals]);

  const loading = decisionsLoading || proposalsLoading;
  const error = decisionsError || proposalsError;

  return (
    <div style={containerStyles}>
      <div style={pageHeaderStyles}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1 style={{ fontSize: 28, marginBottom: spacing.sm }}>
              Decision Tracker
            </h1>
            <p style={{ color: colors.textSecondary, fontSize: 15 }}>
              Materialize and track decisions across your organization
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
            <span style={{ color: colors.textSecondary, fontSize: 14 }}>
              {user?.name || user?.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: spacing.xl }}>
        <div style={tabContainerStyles}>
          <Link to={ROUTES.PROPOSALS} style={{ textDecoration: "none" }}>
            <div style={tabStyles(false)}>
              <span>Proposals</span>
            </div>
          </Link>
          <div style={tabStyles(true)}>
            <span>Backlog ({decisions.length})</span>
          </div>
        </div>
      </div>

      <p style={{ color: colors.textSecondary, marginBottom: spacing.xl, textAlign: "center" }}>
        A log of all decisions that have been made on proposals.
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
