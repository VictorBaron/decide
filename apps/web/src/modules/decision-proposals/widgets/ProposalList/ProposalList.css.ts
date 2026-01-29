import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const toolbar = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: vars.space.xl,
});

export const filterGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const filterLabel = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
});

export const filterSelect = style({
  width: "auto",
  padding: "8px 12px",
  borderRadius: vars.radius.md,
  border: "none",
  backgroundColor: vars.color.secondary,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
  outline: "none",
});

export const newButton = style({
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
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const emptyState = style({
  backgroundColor: vars.color.surface,
  border: `1px dashed ${vars.color.borderDashed}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.textSecondary,
});

export const loadingState = style({
  color: vars.color.textSecondary,
  padding: vars.space.xl,
  textAlign: "center",
});

export const errorState = style({
  color: vars.color.error,
  padding: vars.space.xl,
  textAlign: "center",
});
