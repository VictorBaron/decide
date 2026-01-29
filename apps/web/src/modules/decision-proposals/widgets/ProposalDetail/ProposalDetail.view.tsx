import { Link } from "react-router-dom";
import type { DecisionProposal } from "../../types";
import type { Decision } from "../../../decisions/types";
import { CriticalityBadge } from "../../components";
import { MakeDecisionModal } from "../../../decisions/components";
import { ROUTES } from "../../../../pages/routes";
import * as styles from "./ProposalDetail.css";

interface ProposalDetailViewProps {
  proposal: DecisionProposal;
  currentUserId: string;
  decision: Decision | null;
  deleting: boolean;
  newOption: string;
  addingOption: boolean;
  showDecisionModal: boolean;
  makingDecision: boolean;
  onDelete: () => void;
  onNewOptionChange: (value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (optionId: string) => void;
  onShowDecisionModal: () => void;
  onCloseDecisionModal: () => void;
  onMakeDecision: (data: { selectedOptionId: string; rationale?: string }) => void;
}

export function ProposalDetailView({
  proposal,
  currentUserId,
  decision,
  deleting,
  newOption,
  addingOption,
  showDecisionModal,
  makingDecision,
  onDelete,
  onNewOptionChange,
  onAddOption,
  onRemoveOption,
  onShowDecisionModal,
  onCloseDecisionModal,
  onMakeDecision,
}: ProposalDetailViewProps) {
  const isCreator = proposal.creatorId === currentUserId;
  const isDecider = proposal.deciderId === currentUserId;
  const dueDate = new Date(proposal.dueDate);
  const isOverdue = dueDate < new Date();
  const hasDecision = decision !== null;
  const canMakeDecision = isDecider && !hasDecision && proposal.options.length > 0;

  const selectedOption = hasDecision
    ? proposal.options.find((opt) => opt.id === decision.selectedOptionId)
    : null;

  return (
    <div>
      <Link to={ROUTES.PROPOSALS} className={styles.backLink}>
        Back to Proposals
      </Link>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{proposal.title}</h1>
            {hasDecision && <span className={styles.decidedBadge}>Decided</span>}
          </div>
          <CriticalityBadge criticality={proposal.criticality} />
        </div>

        <div className={styles.actions}>
          {canMakeDecision && (
            <button onClick={onShowDecisionModal} className={styles.buttonSuccess}>
              Make Decision
            </button>
          )}
          {isCreator && !hasDecision && (
            <>
              <Link
                to={ROUTES.PROPOSAL_EDIT.replace(":id", proposal.id)}
                style={{ textDecoration: "none" }}
              >
                <button className={styles.buttonSecondary}>Edit</button>
              </Link>
              <button
                onClick={onDelete}
                disabled={deleting}
                className={styles.buttonDanger}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>

      {hasDecision && (
        <div className={styles.decisionBox}>
          <h3 className={styles.decisionTitle}>Decision Made</h3>
          <div className={styles.decisionSection}>
            <div className={styles.sectionLabel}>Selected Option</div>
            <div className={styles.selectedOptionText}>
              {selectedOption?.text || "Unknown option"}
            </div>
          </div>
          {decision.rationale && (
            <div className={styles.decisionSection}>
              <div className={styles.sectionLabel}>Rationale</div>
              <div className={styles.rationaleBox}>{decision.rationale}</div>
            </div>
          )}
          <div className={styles.decisionDate}>
            Decided on {new Date(decision.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}

      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Due Date</div>
          <div className={isOverdue ? styles.metaValueError : styles.metaValue}>
            {dueDate.toLocaleDateString()}
            {isOverdue && " (Overdue)"}
          </div>
        </div>

        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Decider</div>
          <div className={styles.metaValue}>
            {proposal.decider.name || proposal.decider.email}
          </div>
        </div>

        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Creator</div>
          <div className={styles.metaValue}>
            {proposal.creator.name || proposal.creator.email}
          </div>
        </div>

        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Created</div>
          <div className={styles.metaValue}>
            {new Date(proposal.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {proposal.context && (
        <div className={styles.contextSection}>
          <h3 className={styles.sectionTitle}>Context</h3>
          <div className={styles.contextBox}>{proposal.context}</div>
        </div>
      )}

      <div className={styles.optionsSection}>
        <h3 className={styles.sectionTitle}>Options ({proposal.options.length})</h3>

        {proposal.options.length === 0 ? (
          <div className={styles.emptyOptions}>No options added yet.</div>
        ) : (
          <div className={styles.optionsList}>
            {proposal.options.map((option) => {
              const isSelected = hasDecision && option.id === decision.selectedOptionId;
              return (
                <div
                  key={option.id}
                  className={isSelected ? styles.optionItemSelected : styles.optionItem}
                >
                  <span className={isSelected ? styles.optionTextSelected : styles.optionText}>
                    {option.text}
                    {isSelected && <span className={styles.selectedLabel}>Selected</span>}
                  </span>
                  {isCreator && !hasDecision && (
                    <button
                      onClick={() => onRemoveOption(option.id)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {isCreator && !hasDecision && (
          <div className={styles.addOptionRow}>
            <input
              type="text"
              value={newOption}
              onChange={(e) => onNewOptionChange(e.target.value)}
              placeholder="Add a new option..."
              className={styles.addOptionInput}
              onKeyDown={(e) => e.key === "Enter" && onAddOption()}
            />
            <button
              onClick={onAddOption}
              disabled={addingOption || !newOption.trim()}
              className={styles.buttonPrimary}
            >
              {addingOption ? "Adding..." : "Add"}
            </button>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Link to={ROUTES.PROPOSALS} className={styles.footerLink}>
          Back to Proposals
        </Link>
        <Link to={ROUTES.DECISIONS} className={styles.footerLinkMuted}>
          View Decisions Backlog
        </Link>
      </div>

      {showDecisionModal && (
        <MakeDecisionModal
          proposalTitle={proposal.title}
          options={proposal.options}
          onSubmit={onMakeDecision}
          onClose={onCloseDecisionModal}
          loading={makingDecision}
        />
      )}
    </div>
  );
}
