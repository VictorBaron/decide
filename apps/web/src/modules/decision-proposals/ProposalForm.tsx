import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type {
  DecisionProposal,
  Criticality,
  CreateDecisionProposalInput,
  UpdateDecisionProposalInput,
} from "./types";
import { ROUTES } from "../../pages/routes";

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

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontWeight: 500,
    fontSize: "14px",
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
          placeholder="What decision needs to be made?"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Context</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
          placeholder="Background information to help with the decision..."
        />
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            style={inputStyle}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Criticality *</label>
          <select
            value={criticality}
            onChange={(e) => setCriticality(e.target.value as Criticality)}
            style={inputStyle}
          >
            {CRITICALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Decider *</label>
        <select
          value={deciderId}
          onChange={(e) => setDeciderId(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select a decider...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email}
            </option>
          ))}
        </select>
      </div>

      {!isEditing && (
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Options</label>
          {options.map((opt, idx) => (
            <div
              key={idx}
              style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
            >
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(idx, e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                placeholder={`Option ${idx + 1}`}
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#fee2e2",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            style={{
              padding: "6px 12px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            + Add Option
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting
            ? "Saving..."
            : isEditing
              ? "Update Proposal"
              : "Create Proposal"}
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.PROPOSALS)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f3f4f6",
            color: "#374151",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
