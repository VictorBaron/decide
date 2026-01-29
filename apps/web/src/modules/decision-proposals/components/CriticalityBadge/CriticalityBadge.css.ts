import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../styles/theme.css";

export const base = style({
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
});

export const variants = styleVariants({
  LOW: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  MEDIUM: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
  },
  HIGH: {
    backgroundColor: "#fed7aa",
    color: "#c2410c",
  },
  CRITICAL: {
    backgroundColor: "#fecaca",
    color: "#dc2626",
  },
});
