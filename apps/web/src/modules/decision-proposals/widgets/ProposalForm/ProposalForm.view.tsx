import type { FormEvent } from "react";
import type { Criticality, User } from "../../types";
import * as styles from "./ProposalForm.css";

const CRITICALITY_OPTIONS: { value: Criticality; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

interface ProposalFormViewProps {
  title: string;
  context: string;
  dueDate: string;
  criticality: Criticality;
  deciderId: string;
  team: string;
  options: string[];
  users: User[];
  submitting: boolean;
  error: string | null;
  isEditing: boolean;
  onTitleChange: (value: string) => void;
  onContextChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onCriticalityChange: (value: Criticality) => void;
  onDeciderIdChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onOptionChange: (index: number, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
}

export function ProposalFormView({
  title,
  context,
  dueDate,
  criticality,
  deciderId,
  team,
  options,
  users,
  submitting,
  error,
  isEditing,
  onTitleChange,
  onContextChange,
  onDueDateChange,
  onCriticalityChange,
  onDeciderIdChange,
  onTeamChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onSubmit,
}: ProposalFormViewProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {error && <div className={styles.errorAlert}>{error}</div>}

      <div className={styles.field}>
        <label className={styles.label}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className={styles.input}
          placeholder="e.g., Choose new design system"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Context *</label>
        <textarea
          value={context}
          onChange={(e) => onContextChange(e.target.value)}
          className={styles.textarea}
          placeholder="Provide background and context for this decision..."
        />
      </div>

      <div className={styles.grid2}>
        <div>
          <label className={styles.label}>Criticality *</label>
          <select
            value={criticality}
            onChange={(e) => onCriticalityChange(e.target.value as Criticality)}
            className={styles.input}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.grid2}>
        <div>
          <label className={styles.label}>Decider *</label>
          <select
            value={deciderId}
            onChange={(e) => onDeciderIdChange(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Person who will make final decision</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>Team *</label>
          <input
            type="text"
            value={team}
            onChange={(e) => onTeamChange(e.target.value)}
            className={styles.input}
            placeholder="e.g., Engineering, Design, Product"
          />
        </div>
      </div>

      {!isEditing && (
        <div className={styles.field}>
          <label className={styles.label}>Options to Choose From</label>
          {options.map((opt, idx) => (
            <div key={idx} className={styles.optionRow}>
              <input
                type="text"
                value={opt}
                onChange={(e) => onOptionChange(idx, e.target.value)}
                className={styles.optionInput}
                placeholder="Add an option..."
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveOption(idx)}
                  className={styles.iconButtonMuted}
                >
                  -
                </button>
              )}
              {idx === options.length - 1 && (
                <button
                  type="button"
                  onClick={onAddOption}
                  className={styles.iconButton}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={styles.submitButton}
      >
        {submitting
          ? "Saving..."
          : isEditing
            ? "Update Proposal"
            : "Create Decision Proposal"}
      </button>
    </form>
  );
}
