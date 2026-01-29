import { Link } from "react-router-dom";
import { ProposalListWidget } from "../modules/decision-proposals";
import { LogoutButtonWidget, useAuth } from "../modules/auth";
import { ROUTES } from "./routes";
import * as styles from "./ProposalsPage.css";

export function ProposalsPage() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Decision Tracker</h1>
            <p className={styles.subtitle}>
              Materialize and track decisions across your organization
            </p>
          </div>
          <div className={styles.userSection}>
            <span className={styles.userName}>{user?.name || user?.email}</span>
            <LogoutButtonWidget />
          </div>
        </div>
      </div>

      <div className={styles.tabsWrapper}>
        <div className={styles.tabContainer}>
          <div className={styles.tabActive}>
            <span>Proposals</span>
          </div>
          <Link to={ROUTES.DECISIONS} className={styles.tab}>
            <span>Backlog</span>
          </Link>
        </div>
      </div>

      <ProposalListWidget />
    </div>
  );
}
