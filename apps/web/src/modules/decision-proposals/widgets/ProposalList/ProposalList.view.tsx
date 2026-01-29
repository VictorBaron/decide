import { Link } from "react-router-dom";
import type { DecisionProposal, Criticality } from "../../types";
import { ProposalCard } from "../../components";
import { ROUTES } from "../../../../pages/routes";
import * as styles from "./ProposalList.css";

const CRITICALITY_OPTIONS: { value: Criticality | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "CRITICAL", label: "Critical" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

interface ProposalListViewProps {
  proposals: DecisionProposal[];
  loading: boolean;
  error: string | null;
  filter: Criticality | "";
  onFilterChange: (value: Criticality | "") => void;
  onProposalClick: (proposalId: string) => void;
}

export function ProposalListView({
  proposals,
  loading,
  error,
  filter,
  onFilterChange,
  onProposalClick,
}: ProposalListViewProps) {
  if (loading) {
    return <div className={styles.loadingState}>Loading proposals...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>Error: {error}</div>;
  }

  const filtered = filter
    ? proposals.filter((p) => p.criticality === filter)
    : proposals;

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as Criticality | "")}
            className={styles.filterSelect}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Link to={ROUTES.PROPOSAL_NEW} style={{ textDecoration: "none" }}>
          <button className={styles.newButton}>New Proposal</button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          {proposals.length === 0
            ? "No pending decisions. Create one above to get started!"
            : "No proposals match the selected filter."}
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              detailUrl={ROUTES.PROPOSAL_DETAIL.replace(":id", proposal.id)}
              onClick={() => onProposalClick(proposal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
