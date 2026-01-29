import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  cursor: "pointer",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: vars.space.sm,
});

export const title = style({
  fontWeight: vars.fontWeight.semibold,
  fontSize: vars.fontSize.lg,
  color: vars.color.textPrimary,
  textDecoration: "none",
});

export const decider = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.sm,
});

export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.fontSize.sm,
});

export const dueDate = style({
  color: vars.color.textSecondary,
});

export const dueDateOverdue = style({
  color: vars.color.error,
});

export const optionsCount = style({
  color: vars.color.textMuted,
});
