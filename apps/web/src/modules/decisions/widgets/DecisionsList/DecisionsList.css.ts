import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const loadingState = style({
  color: vars.color.textSecondary,
  textAlign: "center",
  padding: vars.space["2xl"],
});

export const errorState = style({
  padding: vars.space.md,
  backgroundColor: vars.color.errorBg,
  color: vars.color.error,
  borderRadius: vars.radius.md,
  textAlign: "center",
});

export const emptyState = style({
  backgroundColor: vars.color.surface,
  border: `1px dashed ${vars.color.borderDashed}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.textSecondary,
});

export const emptyTitle = style({
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space.sm,
});

export const emptyDescription = style({
  fontSize: vars.fontSize.base,
});
