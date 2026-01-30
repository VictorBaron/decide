import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Block } from "@blocknote/core";
import type {
  DecisionProposal,
  UpdateDecisionProposalInput,
} from "../../types";
import { useUsers } from "../../useUsers";
import { ROUTES } from "../../../../pages/routes";
import { RichTextEditor } from "../../../../components/RichTextEditor";
import * as styles from "./EditProposalForm.css";
import { Stack } from "../../../../common/design-system";
import { notInThePast } from "../../../../common/form/date";
import { format } from "date-fns";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  context: z.custom<Block[]>(),
  dueDate: notInThePast,
  criticality: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  deciderId: z.string().min(1, "Decider is required"),
});

type FormData = z.infer<typeof schema>;

const CRITICALITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
] as const;

interface EditProposalFormWidgetProps {
  proposal: DecisionProposal;
  onSubmit: (data: UpdateDecisionProposalInput) => Promise<unknown>;
}

export function EditProposalFormWidget({
  proposal,
  onSubmit,
}: EditProposalFormWidgetProps) {
  const navigate = useNavigate();
  const { users } = useUsers();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: proposal.title,
      context: proposal.context || [],
      dueDate: format(proposal.dueDate, "yyyy-MM-dd"),
      criticality: proposal.criticality,
      deciderId: proposal.decider.id,
    },
  });

  const context = watch("context");

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit({
      title: data.title,
      context: data.context?.length ? data.context : undefined,
      dueDate: new Date(data.dueDate),
      criticality: data.criticality,
      deciderId: data.deciderId,
    });

    navigate(ROUTES.PROPOSAL_DETAIL.replace(":id", proposal.id));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Title *</label>
        <input
          {...register("title")}
          className={styles.input}
          placeholder="e.g., Choose new design system"
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Context</label>
        <RichTextEditor
          initialContent={context}
          onChange={(value) => setValue("context", value)}
        />
      </div>

      <div className={styles.grid2}>
        <div>
          <label className={styles.label}>Criticality *</label>
          <select {...register("criticality")} className={styles.input}>
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
            {...register("dueDate")}
            className={styles.input}
          />
          {errors.dueDate && (
            <span className={styles.error}>{errors.dueDate.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Decider *</label>
        <select {...register("deciderId")} className={styles.input}>
          <option value="">Person who will make final decision</option>
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
              selected={user.id === getValues().deciderId}
            >
              {user.name || user.email}
            </option>
          ))}
        </select>
        {errors.deciderId && (
          <span className={styles.error}>{errors.deciderId.message}</span>
        )}
      </div>

      <Stack
        direction="row"
        justify="space-around"
        gap={16}
        style={{ marginTop: 24 }}
      >
        <button
          type="button"
          onClick={() => navigate(ROUTES.PROPOSALS)}
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Saving..." : "Update Proposal"}
        </button>
      </Stack>
    </form>
  );
}
