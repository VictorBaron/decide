import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type {
  DecisionProposal,
  Criticality,
  CreateDecisionProposalInput,
  UpdateDecisionProposalInput,
} from "./types";
import { ROUTES } from "../../pages/routes";
import {
  colors,
  spacing,
  radius,
  inputStyles,
  labelStyles,
  primaryButtonStyles,
} from "../../styles";

interface ProposalFormProps {
  proposal?: DecisionProposal;
  users: { id: string; email: string; name?: string }[];
  onSubmit: (
    data: CreateDecisionProposalInput | UpdateDecisionProposalInput
  ) => Promise<unknown>;
  isEditing?: boolean;
}

const CRITICALITY_OPTIONS: { value: Criticality; label: string }[] = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

export function ProposalForm({
  proposal,
  users,
  onSubmit,
  isEditing = false,
}: ProposalFormProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(proposal?.title || "");
  const [context, setContext] = useState(proposal?.context || "");
  const [dueDate, setDueDate] = useState(
    proposal?.dueDate ? proposal.dueDate.split("T")[0] : ""
  );
  const [criticality, setCriticality] = useState<Criticality>(
    proposal?.criticality || "MEDIUM"
  );
  const [deciderId, setDeciderId] = useState(proposal?.deciderId || "");
  const [team, setTeam] = useState("");
  const [options, setOptions] = useState<string[]>(
    proposal?.options.map((o) => o.text) || [""]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const filteredOptions = options.filter((o) => o.trim());

      if (isEditing) {
        await onSubmit({
          title,
          context: context || undefined,
          dueDate,
          criticality,
          deciderId,
        } as UpdateDecisionProposalInput);
      } else {
        await onSubmit({
          title,
          context: context || undefined,
          dueDate,
          criticality,
          deciderId,
          options: filteredOptions.map((text, idx) => ({ text, order: idx })),
        } as CreateDecisionProposalInput);
      }

      navigate(ROUTES.PROPOSALS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save proposal");
    } finally {
      setSubmitting(false);
    }
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (idx: number) =>
    setOptions(options.filter((_, i) => i !== idx));
  const updateOption = (idx: number, value: string) =>
    setOptions(options.map((o, i) => (i === idx ? value : o)));

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            padding: spacing.md,
            marginBottom: spacing.lg,
            backgroundColor: colors.errorBg,
            color: colors.error,
            borderRadius: radius.md,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: spacing.lg }}>
        <label style={labelStyles}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyles}
          placeholder="e.g., Choose new design system"
        />
      </div>

      <div style={{ marginBottom: spacing.lg }}>
        <label style={labelStyles}>Context *</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{
            ...inputStyles,
            minHeight: 100,
            resize: "vertical",
          }}
          placeholder="Provide background and context for this decision..."
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg, marginBottom: spacing.lg }}>
        <div>
          <label style={labelStyles}>Criticality *</label>
          <select
            value={criticality}
            onChange={(e) => setCriticality(e.target.value as Criticality)}
            style={inputStyles}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyles}>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            style={inputStyles}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg, marginBottom: spacing.lg }}>
        <div>
          <label style={labelStyles}>Decider *</label>
          <select
            value={deciderId}
            onChange={(e) => setDeciderId(e.target.value)}
            required
            style={inputStyles}
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
          <label style={labelStyles}>Team *</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            style={inputStyles}
            placeholder="e.g., Engineering, Design, Product"
          />
        </div>
      </div>

      {!isEditing && (
        <div style={{ marginBottom: spacing.lg }}>
          <label style={labelStyles}>Options to Choose From</label>
          {options.map((opt, idx) => (
            <div
              key={idx}
              style={{ display: "flex", gap: spacing.sm, marginBottom: spacing.sm }}
            >
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(idx, e.target.value)}
                style={{ ...inputStyles, flex: 1 }}
                placeholder="Add an option..."
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.secondary,
                    color: colors.textSecondary,
                    border: "none",
                    borderRadius: radius.md,
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  -
                </button>
              )}
              {idx === options.length - 1 && (
                <button
                  type="button"
                  onClick={addOption}
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.secondary,
                    color: colors.textPrimary,
                    border: "none",
                    borderRadius: radius.md,
                    cursor: "pointer",
                    fontSize: 18,
                  }}
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
        style={{
          ...primaryButtonStyles,
          width: "100%",
          opacity: submitting ? 0.7 : 1,
        }}
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
