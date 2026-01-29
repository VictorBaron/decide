import { useState } from "react";
import type { DecisionOption } from "../decision-proposals/types";
import {
  colors,
  spacing,
  radius,
  inputStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../../styles";

interface MakeDecisionModalProps {
  proposalTitle: string;
  options: DecisionOption[];
  onSubmit: (data: { selectedOptionId: string; rationale?: string }) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

export function MakeDecisionModal({
  proposalTitle,
  options,
  onSubmit,
  onClose,
  loading,
}: MakeDecisionModalProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOptionId) {
      setError("Please select an option");
      return;
    }

    setError(null);
    try {
      await onSubmit({
        selectedOptionId,
        rationale: rationale.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to make decision");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          backgroundColor: colors.surface,
          borderRadius: radius.xl,
          padding: spacing.xl,
          width: "100%",
          maxWidth: 500,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: spacing.sm,
          }}
        >
          Make Decision
        </h2>
        <p style={{ color: colors.textSecondary, fontSize: 14, marginBottom: spacing.xl }}>
          {proposalTitle}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: spacing.xl }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: spacing.sm,
              }}
            >
              Select an option *
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {options.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: spacing.md,
                    border:
                      selectedOptionId === option.id
                        ? `2px solid ${colors.primary}`
                        : `1px solid ${colors.border}`,
                    borderRadius: radius.lg,
                    cursor: "pointer",
                    backgroundColor:
                      selectedOptionId === option.id ? colors.secondary : colors.surface,
                    transition: "all 0.15s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={(e) => setSelectedOptionId(e.target.value)}
                    style={{ marginRight: spacing.md }}
                  />
                  <span style={{ flex: 1 }}>{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: spacing.xl }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: spacing.sm,
              }}
            >
              Rationale (optional)
            </label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Explain why you chose this option..."
              rows={4}
              style={{
                ...inputStyles,
                resize: "vertical",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: spacing.md,
                backgroundColor: colors.errorBg,
                color: colors.error,
                borderRadius: radius.md,
                marginBottom: spacing.lg,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: spacing.md, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={secondaryButtonStyles}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedOptionId}
              style={{
                ...primaryButtonStyles,
                opacity: loading || !selectedOptionId ? 0.7 : 1,
              }}
            >
              {loading ? "Making decision..." : "Confirm Decision"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
