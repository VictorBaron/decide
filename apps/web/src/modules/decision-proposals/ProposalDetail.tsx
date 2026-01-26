import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { DecisionProposal, AddOptionInput } from "./types";
import type { Decision } from "../decisions/types";
import { CriticalityBadge } from "./CriticalityBadge";
import { MakeDecisionModal } from "../decisions/MakeDecisionModal";
import { ROUTES } from "../../pages/routes";

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
              {proposal.title}
            </h1>
            {hasDecision && (
              <span
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#d1fae5",
                  color: "#047857",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Decided
              </span>
            )}
          </div>
          <CriticalityBadge criticality={proposal.criticality} />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {canMakeDecision && (
            <button
              onClick={() => setShowDecisionModal(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Make Decision
            </button>
          )}
          {isCreator && !hasDecision && (
            <>
              <Link
                to={ROUTES.PROPOSAL_EDIT.replace(":id", proposal.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: "6px",
                  cursor: deleting ? "not-allowed" : "pointer",
                  fontSize: "14px",
                }}
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
            padding: "16px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "#047857",
            }}
          >
            Decision Made
          </h3>
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
              Selected Option
            </div>
            <div style={{ fontWeight: 500, fontSize: "16px" }}>
              {selectedOption?.text || "Unknown option"}
            </div>
          </div>
          {decision.rationale && (
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}
              >
                Rationale
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {decision.rationale}
              </div>
            </div>
          )}
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Decided on {new Date(decision.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Due Date</div>
          <div
            style={{ fontWeight: 500, color: isOverdue ? "#dc2626" : "#1f2937" }}
          >
            {dueDate.toLocaleDateString()}
            {isOverdue && " (Overdue)"}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Decider</div>
          <div style={{ fontWeight: 500 }}>
            {proposal.decider.name || proposal.decider.email}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Creator</div>
          <div style={{ fontWeight: 500 }}>
            {proposal.creator.name || proposal.creator.email}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>Created</div>
          <div style={{ fontWeight: 500 }}>
            {new Date(proposal.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {proposal.context && (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
            Context
          </h3>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
            }}
          >
            {proposal.context}
          </div>
        </div>
      )}

      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>
          Options ({proposal.options.length})
        </h3>

        {proposal.options.length === 0 ? (
          <div style={{ color: "#6b7280", fontStyle: "italic" }}>
            No options added yet.
          </div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {proposal.options.map((option) => (
              <li
                key={option.id}
                style={{
                  padding: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor:
                    hasDecision && option.id === decision.selectedOptionId
                      ? "#f0fdf4"
                      : "transparent",
                  marginLeft: "-8px",
                  paddingLeft: "8px",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontWeight:
                      hasDecision && option.id === decision.selectedOptionId
                        ? 600
                        : 400,
                  }}
                >
                  {option.text}
                  {hasDecision && option.id === decision.selectedOptionId && (
                    <span style={{ color: "#047857", marginLeft: "8px" }}>
                      ✓ Selected
                    </span>
                  )}
                </span>
                {isCreator && !hasDecision && (
                  <button
                    onClick={() => onRemoveOption(option.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "transparent",
                      color: "#dc2626",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {isCreator && !hasDecision && (
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add a new option..."
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
            />
            <button
              onClick={handleAddOption}
              disabled={addingOption || !newOption.trim()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor:
                  addingOption || !newOption.trim() ? "not-allowed" : "pointer",
                opacity: addingOption || !newOption.trim() ? 0.7 : 1,
              }}
            >
              {addingOption ? "Adding..." : "Add"}
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
        <Link
          to={ROUTES.PROPOSALS}
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Back to Proposals
        </Link>
        <Link
          to={ROUTES.DECISIONS}
          style={{
            color: "#6b7280",
            textDecoration: "none",
            fontSize: "14px",
          }}
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
