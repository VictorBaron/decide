import { useState, type FormEvent } from "react";
import type { DecisionOption } from "../../../decision-proposals/types";
import * as styles from "./MakeDecisionModal.css";

interface MakeDecisionModalProps {
  proposalTitle: string;
  options: DecisionOption[];
  onSubmit: (data: { selectedOptionId: string; rationale?: string }) => void;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedOptionId) {
      setError("Please select an option");
      return;
    }

    setError(null);
    onSubmit({
      selectedOptionId,
      rationale: rationale.trim() || undefined,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Make Decision</h2>
        <p className={styles.subtitle}>{proposalTitle}</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Select an option *</label>
            <div className={styles.optionsList}>
              {options.map((option) => (
                <label
                  key={option.id}
                  className={
                    selectedOptionId === option.id
                      ? styles.optionLabelSelected
                      : styles.optionLabel
                  }
                >
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option.id}
                    checked={selectedOptionId === option.id}
                    onChange={(e) => setSelectedOptionId(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <span className={styles.optionText}>{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Rationale (optional)</label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Explain why you chose this option..."
              rows={4}
              className={styles.textarea}
            />
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={styles.buttonSecondary}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedOptionId}
              className={styles.buttonPrimary}
            >
              {loading ? "Making decision..." : "Confirm Decision"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
