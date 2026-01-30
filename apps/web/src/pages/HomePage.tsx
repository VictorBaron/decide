import { Link } from "react-router-dom";
import { LogoutButtonWidget, useAuth } from "../modules/identity";
import { ROUTES } from "./routes";
import * as styles from "./HomePage.css";

export function HomePage() {
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
          <Link to={ROUTES.PROPOSALS} className={styles.tabActive}>
            <span>Proposals</span>
          </Link>
          <Link to={ROUTES.DECISIONS} className={styles.tab}>
            <span>Backlog</span>
          </Link>
        </div>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Decision Proposal</h2>
          <p className={styles.cardSubtitle}>
            Define a decision that needs to be made by the team
          </p>

          <div className={styles.cardAction}>
            <Link to={ROUTES.PROPOSAL_NEW} style={{ textDecoration: "none" }}>
              <button className={styles.button}>Create New Proposal</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
