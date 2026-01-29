import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: vars.space.md,
});

export const headerLeft = style({});

export const title = style({
  fontWeight: vars.fontWeight.semibold,
  fontSize: vars.fontSize.lg,
  color: vars.color.textPrimary,
  textDecoration: "none",
});

export const date = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
  marginTop: vars.space.xs,
});

export const decidedBadge = style({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  backgroundColor: vars.color.successBg,
  color: vars.color.success,
});

export const section = style({
  marginBottom: vars.space.md,
});

export const sectionLabel = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space.xs,
});

export const selectedOptionBox = style({
  fontWeight: vars.fontWeight.medium,
  padding: vars.space.md,
  backgroundColor: vars.color.successLight,
  border: `1px solid ${vars.color.successBorder}`,
  borderRadius: vars.radius.md,
});

export const rationaleBox = style({
  padding: vars.space.md,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
  whiteSpace: "pre-wrap",
});
