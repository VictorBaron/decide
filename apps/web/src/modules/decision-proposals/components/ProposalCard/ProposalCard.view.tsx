import { Link } from "react-router-dom";
import type { DecisionProposal } from "../../types";
import { CriticalityBadge } from "../CriticalityBadge";
import * as styles from "./ProposalCard.css";

interface ProposalCardProps {
  proposal: DecisionProposal;
  detailUrl: string;
  onClick: () => void;
}

export function ProposalCard({ proposal, detailUrl, onClick }: ProposalCardProps) {
  const dueDate = new Date(proposal.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <Link
          to={detailUrl}
          className={styles.title}
          onClick={(e) => e.stopPropagation()}
        >
          {proposal.title}
        </Link>
        <CriticalityBadge criticality={proposal.criticality} />
      </div>

      <div className={styles.decider}>
        Decider: {proposal.decider.name || proposal.decider.email}
      </div>

      <div className={styles.footer}>
        <span className={isOverdue ? styles.dueDateOverdue : styles.dueDate}>
          Due: {dueDate.toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </span>
        <span className={styles.optionsCount}>
          {proposal.options.length} option(s)
        </span>
      </div>
    </div>
  );
}
