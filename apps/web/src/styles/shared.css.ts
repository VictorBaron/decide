import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const container = style({
  maxWidth: 1000,
  margin: "0 auto",
  padding: vars.space.xl,
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px dashed ${vars.color.borderDashed}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
});

export const cardSolid = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
});

export const pageHeader = style({
  marginBottom: vars.space.xl,
  paddingBottom: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const pageHeaderContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const pageTitle = style({
  fontSize: vars.fontSize["3xl"],
  marginBottom: vars.space.sm,
});

export const pageSubtitle = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.md,
});

// Buttons
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

export const buttonIcon = style({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.secondary,
  color: vars.color.textPrimary,
  border: "none",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontSize: 18,
});

// Form elements
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

export const textarea = style([
  input,
  {
    minHeight: 100,
    resize: "vertical",
  },
]);

export const label = style({
  display: "block",
  marginBottom: vars.space.xs,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.fontSize.base,
  color: vars.color.textPrimary,
});

// Tabs
export const tabContainer = style({
  display: "inline-flex",
  backgroundColor: vars.color.secondary,
  borderRadius: vars.radius.full,
  padding: vars.space.xs,
});

export const tab = style({
  padding: "10px 24px",
  borderRadius: vars.radius.full,
  border: "none",
  backgroundColor: "transparent",
  color: vars.color.textPrimary,
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  textDecoration: "none",
});

export const tabActive = style([
  tab,
  {
    backgroundColor: vars.color.surface,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
]);

// Layout utilities
export const flexBetween = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const flexCenter = style({
  display: "flex",
  justifyContent: "center",
});

export const flexGap = style({
  display: "flex",
  gap: vars.space.sm,
});

export const grid2 = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.lg,
});

// Text utilities
export const textSecondary = style({
  color: vars.color.textSecondary,
});

export const textMuted = style({
  color: vars.color.textMuted,
});

export const textError = style({
  color: vars.color.error,
});

export const textSuccess = style({
  color: vars.color.success,
});

export const textSm = style({
  fontSize: vars.fontSize.sm,
});

export const textBase = style({
  fontSize: vars.fontSize.base,
});

export const fontMedium = style({
  fontWeight: vars.fontWeight.medium,
});

export const fontSemibold = style({
  fontWeight: vars.fontWeight.semibold,
});

// Spacing utilities
export const mb = {
  sm: style({ marginBottom: vars.space.sm }),
  md: style({ marginBottom: vars.space.md }),
  lg: style({ marginBottom: vars.space.lg }),
  xl: style({ marginBottom: vars.space.xl }),
};

// Badges
export const badge = style({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
});

export const badgeSuccess = style([
  badge,
  {
    backgroundColor: vars.color.successBg,
    color: vars.color.success,
  },
]);

// Error alert
export const errorAlert = style({
  padding: vars.space.md,
  backgroundColor: vars.color.errorBg,
  color: vars.color.error,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.base,
});

// Success box
export const successBox = style({
  padding: vars.space.lg,
  backgroundColor: vars.color.successLight,
  border: `1px solid ${vars.color.successBorder}`,
  borderRadius: vars.radius.lg,
});

// Link styles
export const linkMuted = style({
  color: vars.color.textSecondary,
  textDecoration: "none",
  fontSize: vars.fontSize.base,
  ":hover": {
    textDecoration: "underline",
  },
});
