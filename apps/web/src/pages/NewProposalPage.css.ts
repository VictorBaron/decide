import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const container = style({
  maxWidth: 1000,
  margin: "0 auto",
  padding: vars.space.xl,
});

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

export const formWrapper = style({
  maxWidth: 700,
  margin: "0 auto",
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px dashed ${vars.color.borderDashed}`,
  borderRadius: vars.radius.lg,
  padding: vars.space.xl,
});

export const title = style({
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space.sm,
});

export const subtitle = style({
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.base,
  marginBottom: vars.space.xl,
});

export const loadingState = style({
  color: vars.color.textSecondary,
});
