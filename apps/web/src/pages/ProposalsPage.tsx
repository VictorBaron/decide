import { Link } from "react-router-dom";
import { ProposalList } from "../modules/decision-proposals/ProposalList";
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

export function ProposalsPage() {
  const { proposals, loading, error } = useDecisionProposals();
  const { user } = useAuth();

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
          <div style={tabStyles(true)}>
            <span>Proposals ({proposals.length})</span>
          </div>
          <Link to={ROUTES.DECISIONS} style={{ textDecoration: "none" }}>
            <div style={tabStyles(false)}>
              <span>Backlog</span>
            </div>
          </Link>
        </div>
      </div>

      <ProposalList proposals={proposals} loading={loading} error={error} />
    </div>
  );
}
