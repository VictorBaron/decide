import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const form = style({});

export const field = style({
  marginBottom: vars.space.lg,
});

export const label = style({
  display: "block",
  marginBottom: vars.space.xs,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
});

export const input = style({
  width: "100%",
  padding: "10px 14px",
  borderRadius: vars.radius.md,
  border: "none",
  backgroundColor: vars.color.secondary,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
  outline: "none",
  "::placeholder": {
    color: vars.color.textMuted,
  },
});

export const error = style({
  display: "block",
  marginTop: vars.space.xs,
  fontSize: vars.fontSize.sm,
  color: vars.color.error,
});

export const grid2 = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.lg,
  marginBottom: vars.space.lg,
});

export const submitButton = style({
  width: "100%",
  padding: "12px 24px",
  backgroundColor: vars.color.primary,
  color: "#fff",
  border: "none",
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  ":hover": {
    backgroundColor: vars.color.primaryHover,
  },
  ":disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
});

export const cancelButton = style({
  width: "100%",
  padding: "12px 24px",
  backgroundColor: vars.color.secondary,
  color: vars.color.textPrimary,
  border: "none",
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  ":hover": {
    backgroundColor: vars.color.secondaryHover,
  },
  ":disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
  },
});
