import { style, styleVariants } from "@vanilla-extract/css";

export const box = style({});

export const borders = styleVariants({
  primary: {
    border: "var(--div-border-primary)",
  },
  bold: {
    border: "2px solid var(--grey-400)",
  },
});
