import { Link } from "react-router-dom";
import { ProposalFormWidget } from "../modules/decision-proposals";
import { createProposal } from "../modules/decision-proposals/api";
import type { CreateDecisionProposalInput } from "../modules/decision-proposals/types";
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

          <ProposalFormWidget
            onSubmit={(data) => createProposal(data as CreateDecisionProposalInput)}
          />
        </div>
      </div>
    </div>
  );
}
