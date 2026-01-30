import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const viewerWrapper = style({
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.secondary,
  padding: vars.space.md,
});

globalStyle(`${viewerWrapper} .bn-editor`, {
  backgroundColor: "transparent",
  padding: 0,
});

globalStyle(`${viewerWrapper} .bn-container`, {
  backgroundColor: "transparent",
});

globalStyle(`${viewerWrapper} [data-node-type="blockContainer"]`, {
  backgroundColor: "transparent",
});
