import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const textSize = createVar();
export const textWeight = createVar();
export const textLineHeight = createVar();
export const textTransform = createVar();
export const textDecoration = createVar();
export const textWhiteSpace = createVar();
export const textAlign = createVar();
export const textColor = createVar();
export const fontStyle = createVar();
export const fontFamily = createVar();
export const maxLines = createVar();

export const text = style({
  fontSize: textSize,
  fontWeight: textWeight,
  lineHeight: textLineHeight,
  textTransform: textTransform,
  textDecoration: textDecoration,
  whiteSpace: textWhiteSpace,
  textAlign: textAlign,
  color: textColor,
  margin: 0,
  fontStyle: fontStyle,
  fontFamily: fontFamily,
  vars: {
    [textSize]: "0.875rem",
    [textWeight]: "400",
    [textLineHeight]: "1.25rem",
    [textTransform]: "none",
    [textDecoration]: "none",
    [textWhiteSpace]: "normal",
    [textAlign]: "start",
    [textColor]: "inherit",
    [fontStyle]: "normal",
    [fontFamily]: "var(--font-family-primary)",
  },
});

export const variants = styleVariants({
  h1: {
    vars: {
      [textSize]: "1.5rem",
      [textWeight]: "600",
      [textLineHeight]: "2rem",
    },
  },
  h2: {
    vars: {
      [textSize]: "1.25rem",
      [textWeight]: "500",
      [textLineHeight]: "1.875rem",
    },
  },
  h3: {
    vars: {
      [textSize]: "1.125rem",
      [textWeight]: "500",
      [textLineHeight]: "1.75rem",
    },
  },
  h4: {
    vars: {
      [textSize]: "1rem",
      [textWeight]: "500",
      [textLineHeight]: "1.5rem",
    },
  },
  "body-regular": {
    vars: {
      [textSize]: "0.875rem",
      [textWeight]: "400",
      [textLineHeight]: "1.25rem",
    },
  },
  "body-medium": {
    vars: {
      [textSize]: "0.875rem",
      [textWeight]: "500",
      [textLineHeight]: "1.25rem",
    },
  },
  "body-bold": {
    vars: {
      [textSize]: "0.875rem",
      [textWeight]: "700",
      [textLineHeight]: "1.25rem",
    },
  },
  "small-medium": {
    vars: {
      [textSize]: "0.75rem",
      [textWeight]: "500",
      [textLineHeight]: "1.125rem",
    },
  },
  "small-regular": {
    vars: {
      [textSize]: "0.75rem",
      [textWeight]: "400",
      [textLineHeight]: "1.125rem",
    },
  },
  "tiny-bold": {
    vars: {
      [textSize]: "0.625rem",
      [textWeight]: "700",
      [textLineHeight]: "1rem",
    },
  },
  "tiny-medium": {
    vars: {
      [textSize]: "0.625rem",
      [textWeight]: "500",
      [textLineHeight]: "1rem",
    },
  },
  "tiny-regular": {
    vars: {
      [textSize]: "0.625rem",
      [textWeight]: "400",
      [textLineHeight]: "1rem",
    },
  },
});

export const truncate = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const maxLinesStyle = style({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: maxLines,
  lineClamp: maxLines,
});
