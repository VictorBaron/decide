import { Link } from "react-router-dom";
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
  cardStyles,
  primaryButtonStyles,
} from "../styles";

export function HomePage() {
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
          <Link to={ROUTES.PROPOSALS} style={{ textDecoration: "none" }}>
            <div style={tabStyles(true)}>
              <span>Proposals</span>
            </div>
          </Link>
          <Link to={ROUTES.DECISIONS} style={{ textDecoration: "none" }}>
            <div style={tabStyles(false)}>
              <span>Backlog</span>
            </div>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={cardStyles}>
          <h2 style={{ fontSize: 18, marginBottom: spacing.sm }}>
            Create Decision Proposal
          </h2>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginBottom: spacing.xl,
            }}
          >
            Define a decision that needs to be made by the team
          </p>

          <div style={{ textAlign: "center" }}>
            <Link to={ROUTES.PROPOSAL_NEW} style={{ textDecoration: "none" }}>
              <button style={primaryButtonStyles}>Create New Proposal</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
