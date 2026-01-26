import { useState } from "react";
import type { DecisionOption } from "../decision-proposals/types";

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
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Make Decision
        </h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
          {proposalTitle}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "8px",
              }}
            >
              Select an option *
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {options.map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    border:
                      selectedOptionId === option.id
                        ? "2px solid #3b82f6"
                        : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedOptionId === option.id ? "#eff6ff" : "#fff",
                    transition: "all 0.15s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={(e) => setSelectedOptionId(e.target.value)}
                    style={{ marginRight: "12px" }}
                  />
                  <span style={{ flex: 1 }}>{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "8px",
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
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                borderRadius: "6px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedOptionId}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: loading || !selectedOptionId ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: 500,
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
