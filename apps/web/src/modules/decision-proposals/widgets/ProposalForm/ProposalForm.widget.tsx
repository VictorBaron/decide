import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Block } from "@blocknote/core";
import type {
  DecisionProposal,
  Criticality,
  CreateDecisionProposalInput,
  UpdateDecisionProposalInput,
} from "../../types";
import { useUsers } from "../../useUsers";
import { ROUTES } from "../../../../pages/routes";
import { ProposalFormView } from "./ProposalForm.view";

interface ProposalFormWidgetProps {
  proposal?: DecisionProposal;
  onSubmit: (
    data: CreateDecisionProposalInput | UpdateDecisionProposalInput
  ) => Promise<unknown>;
  isEditing?: boolean;
}

export function ProposalFormWidget({
  proposal,
  onSubmit,
  isEditing = false,
}: ProposalFormWidgetProps) {
  const navigate = useNavigate();
  const { users } = useUsers();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(proposal?.title || "");
  const [context, setContext] = useState<Block[]>(proposal?.context || []);
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
          context: context.length ? context : undefined,
          dueDate,
          criticality,
          deciderId,
        } as UpdateDecisionProposalInput);
      } else {
        await onSubmit({
          title,
          context: context.length ? context : undefined,
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

  const handleAddOption = () => setOptions([...options, ""]);
  const handleRemoveOption = (idx: number) =>
    setOptions(options.filter((_, i) => i !== idx));
  const handleOptionChange = (idx: number, value: string) =>
    setOptions(options.map((o, i) => (i === idx ? value : o)));

  return (
    <ProposalFormView
      title={title}
      context={context}
      dueDate={dueDate}
      criticality={criticality}
      deciderId={deciderId}
      team={team}
      options={options}
      users={users}
      submitting={submitting}
      error={error}
      isEditing={isEditing}
      onTitleChange={setTitle}
      onContextChange={setContext}
      onDueDateChange={setDueDate}
      onCriticalityChange={setCriticality}
      onDeciderIdChange={setDeciderId}
      onTeamChange={setTeam}
      onOptionChange={handleOptionChange}
      onAddOption={handleAddOption}
      onRemoveOption={handleRemoveOption}
      onSubmit={handleSubmit}
    />
  );
}
