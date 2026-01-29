import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.xl,
  padding: vars.space.xl,
  width: "100%",
  maxWidth: 500,
  maxHeight: "90vh",
  overflow: "auto",
});

export const title = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space.sm,
});

export const subtitle = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.xl,
});

export const field = style({
  marginBottom: vars.space.xl,
});

export const label = style({
  display: "block",
  marginBottom: vars.space.sm,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
});

export const optionsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const optionLabel = style({
  display: "flex",
  alignItems: "center",
  padding: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  cursor: "pointer",
  backgroundColor: vars.color.surface,
  transition: "all 0.15s ease",
});

export const optionLabelSelected = style([
  optionLabel,
  {
    border: `2px solid ${vars.color.primary}`,
    backgroundColor: vars.color.secondary,
  },
]);

export const optionRadio = style({
  marginRight: vars.space.md,
});

export const optionText = style({
  flex: 1,
});

export const textarea = style({
  width: "100%",
  padding: "10px 14px",
  borderRadius: vars.radius.md,
  border: "none",
  backgroundColor: vars.color.secondary,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
  outline: "none",
  minHeight: 100,
  resize: "vertical",
  "::placeholder": {
    color: vars.color.textMuted,
  },
});

export const errorAlert = style({
  padding: vars.space.md,
  backgroundColor: vars.color.errorBg,
  color: vars.color.error,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.lg,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.sm,
});

export const buttonSecondary = style({
  padding: "10px 20px",
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

export const buttonPrimary = style({
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
