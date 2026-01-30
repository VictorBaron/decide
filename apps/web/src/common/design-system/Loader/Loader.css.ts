import { createVar, keyframes, style } from "@vanilla-extract/css";

export const loaderSize = createVar();
export const loaderStroke = createVar();
export const loaderColor = createVar();

const rotate = keyframes({
  100: {
    transform: "rotate(360deg)",
  },
});

const prixClipFix = keyframes({
  "0%": {
    clipPath: "polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)",
  },
  "25%": {
    clipPath: "polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)",
  },
  "50%": {
    clipPath: "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)",
  },
  "75%": {
    clipPath: "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0, 100%)",
  },
  "100%": {
    clipPath: "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
  },
});

export const loader = style({
  width: loaderSize,
  height: loaderSize,
  borderRadius: "50%",
  position: "relative",
  animation: `${rotate} 1s linear infinite`,
  "::before": {
    content: "''",
    boxSizing: "border-box",
    position: "absolute",
    inset: 0,
    borderWidth: loaderStroke,
    borderRadius: "50%",
    borderColor: "color-mix(in srgb, " + loaderColor + ", transparent 70%)",
    borderTopColor: loaderColor,
    animation: `${prixClipFix} 2s linear infinite`,
  },
});
