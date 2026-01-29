import { Link } from "react-router-dom";
import { ROUTES } from "../../../../pages/routes";
import * as styles from "./Dashboard.css";

export function DashboardView() {
  return (
    <div>
      <Link to={ROUTES.PROPOSALS} style={{ textDecoration: "none" }}>
        <button className={styles.button}>View Decision Proposals</button>
      </Link>
    </div>
  );
}
