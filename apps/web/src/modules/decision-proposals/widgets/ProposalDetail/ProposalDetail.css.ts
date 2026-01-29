import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const backLink = style({
  color: vars.color.textSecondary,
  textDecoration: "none",
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.xl,
  display: "inline-block",
  ":hover": {
    textDecoration: "underline",
  },
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: vars.space.xl,
});

export const headerLeft = style({});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginBottom: vars.space.sm,
});

export const title = style({
  fontSize: vars.fontSize["2xl"],
  fontWeight: vars.fontWeight.semibold,
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

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
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

export const buttonSuccess = style([
  buttonPrimary,
  {
    backgroundColor: vars.color.success,
    ":hover": {
      backgroundColor: "#059669",
    },
  },
]);

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
});

export const buttonDanger = style({
  padding: "10px 16px",
  backgroundColor: vars.color.errorBg,
  color: vars.color.error,
  border: "none",
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
  cursor: "pointer",
});

export const decisionBox = style({
  padding: vars.space.lg,
  backgroundColor: vars.color.successLight,
  border: `1px solid ${vars.color.successBorder}`,
  borderRadius: vars.radius.lg,
  marginBottom: vars.space.xl,
});

export const decisionTitle = style({
  color: vars.color.success,
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space.md,
});

export const decisionSection = style({
  marginBottom: vars.space.md,
});

export const sectionLabel = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space.xs,
});

export const selectedOptionText = style({
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize.lg,
});

export const rationaleBox = style({
  padding: vars.space.md,
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.md,
  whiteSpace: "pre-wrap",
});

export const decisionDate = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});

export const metaGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.lg,
  marginBottom: vars.space.xl,
});

export const metaItem = style({});

export const metaLabel = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});

export const metaValue = style({
  fontWeight: vars.fontWeight.medium,
});

export const metaValueError = style([
  metaValue,
  {
    color: vars.color.error,
  },
]);

export const contextSection = style({
  marginBottom: vars.space.xl,
});

export const sectionTitle = style({
  fontWeight: vars.fontWeight.semibold,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space.sm,
});

export const contextBox = style({
  padding: vars.space.lg,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.lg,
  whiteSpace: "pre-wrap",
});

export const optionsSection = style({});

export const optionsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const optionItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: vars.space.md,
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.md,
});

export const optionItemSelected = style([
  optionItem,
  {
    backgroundColor: vars.color.successLight,
  },
]);

export const optionText = style({});

export const optionTextSelected = style({
  fontWeight: vars.fontWeight.semibold,
});

export const selectedLabel = style({
  color: vars.color.success,
  marginLeft: vars.space.sm,
});

export const removeButton = style({
  padding: "4px 8px",
  backgroundColor: "transparent",
  color: vars.color.error,
  border: "none",
  cursor: "pointer",
  fontSize: vars.fontSize.xs,
});

export const emptyOptions = style({
  color: vars.color.textSecondary,
  fontStyle: "italic",
});

export const addOptionRow = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space.md,
});

export const addOptionInput = style({
  flex: 1,
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

export const footer = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space["2xl"],
});

export const footerLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontSize: vars.fontSize.base,
});

export const footerLinkMuted = style({
  color: vars.color.textSecondary,
  textDecoration: "none",
  fontSize: vars.fontSize.base,
  ":hover": {
    textDecoration: "underline",
  },
});

export const loadingState = style({
  color: vars.color.textSecondary,
  padding: vars.space.xl,
  textAlign: "center",
});

export const errorState = style({
  padding: vars.space.md,
  backgroundColor: vars.color.errorBg,
  color: vars.color.error,
  borderRadius: vars.radius.md,
  textAlign: "center",
});
