import type { Decision } from "../../types";
import type { DecisionProposal } from "../../../decision-proposals/types";
import { DecisionCard } from "../../components";
import * as styles from "./DecisionsList.css";

interface DecisionsListViewProps {
  decisions: Decision[];
  proposals: Map<string, DecisionProposal>;
  loading: boolean;
  error: string | null;
}

export function DecisionsListView({
  decisions,
  proposals,
  loading,
  error,
}: DecisionsListViewProps) {
  if (loading) {
    return <div className={styles.loadingState}>Loading decisions...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  if (decisions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyTitle}>No decisions yet</div>
        <div className={styles.emptyDescription}>
          Decisions you make on proposals will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          proposal={proposals.get(decision.proposalId)}
        />
      ))}
    </div>
  );
}
