import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Block } from "@blocknote/core";
import { useUsers } from "../../useUsers";
import { createProposal } from "../../api";
import { ROUTES } from "../../../../pages/routes";
import { RichTextEditor } from "../../../../components/RichTextEditor";
import { addDays, format, setHours } from "date-fns";
import * as styles from "./CreateProposalForm.css";
import { notInThePast } from "../../../../common/form/date";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: notInThePast,
  criticality: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  deciderId: z.string().min(1, "Decider is required"),
  team: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CRITICALITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
] as const;

export function CreateProposalFormWidget() {
  const navigate = useNavigate();
  const { users } = useUsers();
  const tomorrowAt18 = addDays(setHours(new Date(), 18), 1);

  const [context, setContext] = useState<Block[]>([]);
  const [options, setOptions] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      dueDate: format(tomorrowAt18, "yyyy-MM-dd"),
      criticality: "MEDIUM",
      deciderId: "",
      team: "",
    },
  });

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (idx: number) =>
    setOptions(options.filter((_, i) => i !== idx));
  const updateOption = (idx: number, value: string) =>
    setOptions(options.map((o, i) => (i === idx ? value : o)));

  const onSubmit = async (data: FormData) => {
    const filteredOptions = options
      .filter((o) => o.trim())
      .map((text, idx) => ({ text: text.trim(), order: idx }));

    await createProposal({
      title: data.title,
      context: context.length ? context : undefined,
      dueDate: new Date(data.dueDate),
      criticality: data.criticality,
      deciderId: data.deciderId,
      options: filteredOptions,
    });

    navigate(ROUTES.PROPOSALS);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <RichTextEditor initialContent={context} onChange={setContext} />
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
            min={new Date().toISOString().split("T")[0]}
            className={styles.input}
          />
          {errors.dueDate && (
            <span className={styles.error}>{errors.dueDate.message}</span>
          )}
        </div>
      </div>

      <div className={styles.grid2}>
        <div>
          <label className={styles.label}>Decider *</label>
          <select {...register("deciderId")} className={styles.input}>
            <option value="">Person who will make final decision</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
          {errors.deciderId && (
            <span className={styles.error}>{errors.deciderId.message}</span>
          )}
        </div>

        <div>
          <label className={styles.label}>Team</label>
          <input
            {...register("team")}
            className={styles.input}
            placeholder="e.g., Engineering, Design, Product"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Options to Choose From</label>
        {options.map((opt, idx) => (
          <div key={idx} className={styles.optionRow}>
            <input
              value={opt}
              onChange={(e) => updateOption(idx, e.target.value)}
              className={styles.optionInput}
              placeholder="Add an option..."
            />
            {options.length > 1 && (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                className={styles.iconButtonMuted}
              >
                -
              </button>
            )}
            {idx === options.length - 1 && (
              <button
                type="button"
                onClick={addOption}
                className={styles.iconButton}
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Creating..." : "Create Decision Proposal"}
      </button>
    </form>
  );
}
