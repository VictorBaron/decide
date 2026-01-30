import { Link } from "react-router-dom";
import { DecisionsListWidget } from "../modules/decisions";
import { LogoutButtonWidget, useAuth } from "../modules/identity";
import { ROUTES } from "./routes";
import * as styles from "./DecisionsBacklogPage.css";

export function DecisionsBacklogPage() {
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
          <Link to={ROUTES.PROPOSALS} className={styles.tab}>
            <span>Proposals</span>
          </Link>
          <div className={styles.tabActive}>
            <span>Backlog</span>
          </div>
        </div>
      </div>

      <p className={styles.description}>
        A log of all decisions that have been made on proposals.
      </p>

      <DecisionsListWidget />
    </div>
  );
}
