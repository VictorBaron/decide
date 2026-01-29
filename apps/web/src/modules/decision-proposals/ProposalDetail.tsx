import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { DecisionProposal, AddOptionInput } from "./types";
import type { Decision } from "../decisions/types";
import { CriticalityBadge } from "./CriticalityBadge";
import { MakeDecisionModal } from "../decisions/MakeDecisionModal";
import { ROUTES } from "../../pages/routes";
import {
  colors,
  spacing,
  radius,
  inputStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  dangerButtonStyles,
} from "../../styles";

interface ProposalDetailProps {
  proposal: DecisionProposal;
  currentUserId: string;
  decision: Decision | null;
  onDelete: () => Promise<void>;
  onAddOption: (data: AddOptionInput) => Promise<void>;
  onRemoveOption: (optionId: string) => Promise<void>;
  onMakeDecision: (data: {
    selectedOptionId: string;
    rationale?: string;
  }) => Promise<void>;
}

export function ProposalDetail({
  proposal,
  currentUserId,
  decision,
  onDelete,
  onAddOption,
  onRemoveOption,
  onMakeDecision,
}: ProposalDetailProps) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [addingOption, setAddingOption] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [makingDecision, setMakingDecision] = useState(false);

  const isCreator = proposal.creatorId === currentUserId;
  const isDecider = proposal.deciderId === currentUserId;
  const dueDate = new Date(proposal.dueDate);
  const isOverdue = dueDate < new Date();
  const hasDecision = decision !== null;
  const canMakeDecision =
    isDecider && !hasDecision && proposal.options.length > 0;

  const selectedOption = hasDecision
    ? proposal.options.find((opt) => opt.id === decision.selectedOptionId)
    : null;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;
    setDeleting(true);
    try {
      await onDelete();
      navigate(ROUTES.PROPOSALS);
    } catch {
      setDeleting(false);
    }
  };

  const handleAddOption = async () => {
    if (!newOption.trim()) return;
    setAddingOption(true);
    try {
      await onAddOption({ text: newOption.trim() });
      setNewOption("");
    } finally {
      setAddingOption(false);
    }
  };

  const handleMakeDecision = async (data: {
    selectedOptionId: string;
    rationale?: string;
  }) => {
    setMakingDecision(true);
    try {
      await onMakeDecision(data);
      setShowDecisionModal(false);
    } finally {
      setMakingDecision(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: spacing.xl }}>
        <Link
          to={ROUTES.PROPOSALS}
          style={{ color: colors.textSecondary, fontSize: 14 }}
        >
          Back to Proposals
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: spacing.xl,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>
              {proposal.title}
            </h1>
            {hasDecision && (
              <span
                style={{
                  padding: "4px 10px",
                  backgroundColor: colors.successBg,
                  color: colors.success,
                  borderRadius: radius.sm,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Decided
              </span>
            )}
          </div>
          <CriticalityBadge criticality={proposal.criticality} />
        </div>

        <div style={{ display: "flex", gap: spacing.sm }}>
          {canMakeDecision && (
            <button
              onClick={() => setShowDecisionModal(true)}
              style={{
                ...primaryButtonStyles,
                backgroundColor: colors.success,
              }}
            >
              Make Decision
            </button>
          )}
          {isCreator && !hasDecision && (
            <>
              <Link
                to={ROUTES.PROPOSAL_EDIT.replace(":id", proposal.id)}
                style={{ textDecoration: "none" }}
              >
                <button style={secondaryButtonStyles}>Edit</button>
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={dangerButtonStyles}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>

      {hasDecision && (
        <div
          style={{
            padding: spacing.lg,
            backgroundColor: colors.successLight,
            border: `1px solid ${colors.successBorder}`,
            borderRadius: radius.lg,
            marginBottom: spacing.xl,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginBottom: spacing.md,
              color: colors.success,
            }}
          >
            Decision Made
          </h3>
          <div style={{ marginBottom: spacing.md }}>
            <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.xs }}>
              Selected Option
            </div>
            <div style={{ fontWeight: 500, fontSize: 16 }}>
              {selectedOption?.text || "Unknown option"}
            </div>
          </div>
          {decision.rationale && (
            <div style={{ marginBottom: spacing.md }}>
              <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.xs }}>
                Rationale
              </div>
              <div
                style={{
                  padding: spacing.md,
                  backgroundColor: colors.surface,
                  borderRadius: radius.md,
                  whiteSpace: "pre-wrap",
                }}
              >
                {decision.rationale}
              </div>
            </div>
          )}
          <div style={{ fontSize: 13, color: colors.textSecondary }}>
            Decided on {new Date(decision.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: colors.textSecondary }}>Due Date</div>
          <div style={{ fontWeight: 500, color: isOverdue ? colors.error : colors.textPrimary }}>
            {dueDate.toLocaleDateString()}
            {isOverdue && " (Overdue)"}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, color: colors.textSecondary }}>Decider</div>
          <div style={{ fontWeight: 500 }}>
            {proposal.decider.name || proposal.decider.email}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, color: colors.textSecondary }}>Creator</div>
          <div style={{ fontWeight: 500 }}>
            {proposal.creator.name || proposal.creator.email}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, color: colors.textSecondary }}>Created</div>
          <div style={{ fontWeight: 500 }}>
            {new Date(proposal.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {proposal.context && (
        <div style={{ marginBottom: spacing.xl }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: spacing.sm }}>
            Context
          </h3>
          <div
            style={{
              padding: spacing.lg,
              backgroundColor: colors.secondary,
              borderRadius: radius.lg,
              whiteSpace: "pre-wrap",
            }}
          >
            {proposal.context}
          </div>
        </div>
      )}

      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: spacing.md }}>
          Options ({proposal.options.length})
        </h3>

        {proposal.options.length === 0 ? (
          <div style={{ color: colors.textSecondary, fontStyle: "italic" }}>
            No options added yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {proposal.options.map((option) => (
              <div
                key={option.id}
                style={{
                  padding: spacing.md,
                  backgroundColor:
                    hasDecision && option.id === decision.selectedOptionId
                      ? colors.successLight
                      : colors.secondary,
                  borderRadius: radius.md,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight:
                      hasDecision && option.id === decision.selectedOptionId ? 600 : 400,
                  }}
                >
                  {option.text}
                  {hasDecision && option.id === decision.selectedOptionId && (
                    <span style={{ color: colors.success, marginLeft: spacing.sm }}>
                      Selected
                    </span>
                  )}
                </span>
                {isCreator && !hasDecision && (
                  <button
                    onClick={() => onRemoveOption(option.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      color: colors.error,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {isCreator && !hasDecision && (
          <div style={{ display: "flex", gap: spacing.sm, marginTop: spacing.md }}>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add a new option..."
              style={{ ...inputStyles, flex: 1 }}
              onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
            />
            <button
              onClick={handleAddOption}
              disabled={addingOption || !newOption.trim()}
              style={{
                ...primaryButtonStyles,
                opacity: addingOption || !newOption.trim() ? 0.7 : 1,
              }}
            >
              {addingOption ? "Adding..." : "Add"}
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: spacing["2xl"], display: "flex", gap: spacing.lg }}>
        <Link
          to={ROUTES.PROPOSALS}
          style={{ color: colors.primary, textDecoration: "none", fontSize: 14 }}
        >
          Back to Proposals
        </Link>
        <Link
          to={ROUTES.DECISIONS}
          style={{ color: colors.textSecondary, textDecoration: "none", fontSize: 14 }}
        >
          View Decisions Backlog
        </Link>
      </div>

      {showDecisionModal && (
        <MakeDecisionModal
          proposalTitle={proposal.title}
          options={proposal.options}
          onSubmit={handleMakeDecision}
          onClose={() => setShowDecisionModal(false)}
          loading={makingDecision}
        />
      )}
    </div>
  );
}
