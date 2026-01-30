import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const editorWrapper = style({
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.secondary,
  minHeight: 150,
});

globalStyle(`${editorWrapper} .bn-editor`, {
  backgroundColor: "transparent",
  padding: "10px 14px",
});

globalStyle(`${editorWrapper} .bn-container`, {
  backgroundColor: "transparent",
});

globalStyle(`${editorWrapper} [data-node-type="blockContainer"]`, {
  backgroundColor: "transparent",
});
