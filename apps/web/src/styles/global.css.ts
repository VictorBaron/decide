import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle(":root", {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  lineHeight: 1.5,
  fontWeight: 400,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.background,
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("body", {
  margin: 0,
  minWidth: "320px",
  minHeight: "100vh",
});

globalStyle("#root", {
  minHeight: "100vh",
});

globalStyle("a", {
  color: vars.color.primary,
  textDecoration: "none",
});

globalStyle("a:hover", {
  textDecoration: "underline",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  color: vars.color.textPrimary,
  fontWeight: vars.fontWeight.semibold,
  lineHeight: 1.2,
});

globalStyle("input, textarea, select", {
  fontFamily: "inherit",
  fontSize: vars.fontSize.base,
});

globalStyle("button", {
  fontFamily: "inherit",
  cursor: "pointer",
});

globalStyle("button:disabled", {
  cursor: "not-allowed",
  opacity: 0.7,
});
