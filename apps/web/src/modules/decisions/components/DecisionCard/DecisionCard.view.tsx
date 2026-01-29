import { Link } from "react-router-dom";
import type { Decision } from "../../types";
import type { DecisionProposal } from "../../../decision-proposals/types";
import { ROUTES } from "../../../../pages/routes";
import * as styles from "./DecisionCard.css";

interface DecisionCardProps {
  decision: Decision;
  proposal?: DecisionProposal;
}

export function DecisionCard({ decision, proposal }: DecisionCardProps) {
  const createdDate = new Date(decision.createdAt);
  const selectedOption = proposal?.options.find(
    (opt) => opt.id === decision.selectedOptionId
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link
            to={ROUTES.PROPOSAL_DETAIL.replace(":id", decision.proposalId)}
            className={styles.title}
          >
            {proposal?.title || "Proposal"}
          </Link>
          <div className={styles.date}>
            Decided on {createdDate.toLocaleDateString()}
          </div>
        </div>
        <span className={styles.decidedBadge}>Decided</span>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Selected Option</div>
        <div className={styles.selectedOptionBox}>
          {selectedOption?.text || decision.selectedOptionId}
        </div>
      </div>

      {decision.rationale && (
        <div>
          <div className={styles.sectionLabel}>Rationale</div>
          <div className={styles.rationaleBox}>{decision.rationale}</div>
        </div>
      )}
    </div>
  );
}
