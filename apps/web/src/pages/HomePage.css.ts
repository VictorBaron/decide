import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const container = style({
  maxWidth: 1000,
  margin: "0 auto",
  padding: vars.space.xl,
});

export const header = style({
  marginBottom: vars.space.xl,
  paddingBottom: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const headerContent = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const title = style({
  fontSize: vars.fontSize["3xl"],
  marginBottom: vars.space.sm,
});

export const subtitle = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.md,
});

export const userSection = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const userName = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
});

export const tabsWrapper = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: vars.space.xl,
});

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

export const cardWrapper = style({
  maxWidth: 700,
  margin: "0 auto",
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px dashed ${vars.color.borderDashed}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
});

export const cardTitle = style({
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space.sm,
});

export const cardSubtitle = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.xl,
});

export const cardAction = style({
  textAlign: "center",
});

export const button = style({
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
