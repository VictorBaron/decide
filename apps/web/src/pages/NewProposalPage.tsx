import { Link } from "react-router-dom";
import { CreateProposalFormWidget } from "../modules/decision-proposals";
import { ROUTES } from "./routes";
import * as styles from "./NewProposalPage.css";

export function NewProposalPage() {
  return (
    <div className={styles.container}>
      <Link to={ROUTES.PROPOSALS} className={styles.backLink}>
        Back to Proposals
      </Link>

      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Decision Proposal</h1>
          <p className={styles.subtitle}>
            Define a decision that needs to be made by the team
          </p>

          <CreateProposalFormWidget />
        </div>
      </div>
    </div>
  );
}
