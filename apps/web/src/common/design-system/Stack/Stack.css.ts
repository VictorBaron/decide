import { createVar, style } from "@vanilla-extract/css";

export const stackDirection = createVar();
export const stackWrap = createVar();
export const stackAlign = createVar();
export const stackJustify = createVar();
export const stackFlex = createVar();
export const stackGap = createVar();
export const stackBackground = createVar();
export const stackBorder = createVar();

export const stack = style({
  display: "flex",
  flexFlow: `${stackDirection} ${stackWrap}`,
  alignItems: stackAlign,
  justifyContent: stackJustify,
  flex: stackFlex,
  gap: stackGap,
  background: stackBackground,
  border: stackBorder,
});
