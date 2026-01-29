import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const container = style({
  maxWidth: 1000,
  margin: "0 auto",
  padding: vars.space.xl,
});
