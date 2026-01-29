import { style } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  maxWidth: 1000,
  margin: "0 auto",
  padding: vars.space.xl,
});

export const content = style({
  textAlign: "center",
  maxWidth: 400,
});

export const title = style({
  fontSize: vars.fontSize["4xl"],
  marginBottom: vars.space.sm,
});

export const subtitle = style({
  color: vars.color.textSecondary,
  marginBottom: vars.space["2xl"],
});

export const button = style({
  width: "100%",
  padding: "14px 24px",
  backgroundColor: vars.color.primary,
  color: "#fff",
  border: "none",
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  ":hover": {
    backgroundColor: vars.color.primaryHover,
  },
});

export const loadingText = style({
  color: vars.color.textSecondary,
});
