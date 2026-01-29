import { useParams, Link } from "react-router-dom";
import { ProposalFormWidget, useDecisionProposal } from "../modules/decision-proposals";
import { ROUTES } from "./routes";
import * as styles from "./EditProposalPage.css";

export function EditProposalPage() {
  const { id } = useParams<{ id: string }>();
  const { proposal, loading, error, updateProposal } = useDecisionProposal(id!);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Loading...</div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>{error || "Proposal not found"}</div>
        <Link to={ROUTES.PROPOSALS} className={styles.errorLink}>
          Back to Proposals
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link
        to={ROUTES.PROPOSAL_DETAIL.replace(":id", id!)}
        className={styles.backLink}
      >
        Back to Proposal
      </Link>

      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Edit Proposal</h1>
          <p className={styles.subtitle}>Update the decision proposal details</p>

          <ProposalFormWidget
            proposal={proposal}
            onSubmit={updateProposal}
            isEditing
          />
        </div>
      </div>
    </div>
  );
}
