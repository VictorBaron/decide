import { style, styleVariants } from "@vanilla-extract/css";

const baseButton = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  flexShrink: 0,
  height: "fit-content",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  transition: "all 0.15s ease-in-out",
  userSelect: "none",
  cursor: "pointer",
  border: "1px solid transparent",
  borderRadius: 0,
} as const;

export const button = style({
  ...baseButton,
  selectors: {
    "&:focus-visible": {
      outline: "4px solid var(--green-100)",
    },
    "&:disabled": {
      opacity: 0.6,
      pointerEvents: "none",
    },
  },
});

export const variants = styleVariants({
  primary: {
    backgroundColor: "var(--green-900)",
    borderColor: "var(--green-900)",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "var(--green-700)" },
    },
  },
  secondary: {
    backgroundColor: "var(--white)",
    borderColor: "var(--grey-300)",
    color: "var(--text-400)",
    selectors: {
      "&:hover": { backgroundColor: "var(--grey-100)" },
    },
  },
  success: {
    backgroundColor: "var(--green-500)",
    borderColor: "var(--green-600)",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "var(--green-600)" },
    },
  },
  danger: {
    backgroundColor: "var(--red-500)",
    borderColor: "var(--red-600)",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "var(--red-600)" },
    },
  },
  tertiary: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: "var(--text-400)",
    selectors: {
      "&:hover": { backgroundColor: "var(--grey-200)" },
    },
  },
  dark: {
    backgroundColor: "var(--grey-900)",
    borderColor: "transparent",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "#363a40" },
    },
  },
  secondaryDark: {
    backgroundColor: "var(--grey-900)",
    borderColor: "var(--grey-700)",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "#363a40" },
    },
  },
  purple: {
    backgroundColor: "var(--purple-500)",
    borderColor: "var(--purple-600)",
    color: "var(--white)",
    selectors: {
      "&:hover": { backgroundColor: "var(--purple-600)" },
    },
  },
});

export const sizes = styleVariants({
  xxs: { gap: 2, padding: "1px 6px" },
  xs: { gap: 4, padding: "1px 8px" },
  sm: { gap: 4, padding: "3px 7px" },
  md: { gap: 4, padding: "5px 11px" },
  lg: { gap: 8, padding: "9px 19px" },
});

export const rounded = style({ borderRadius: 6 });
export const fullWidth = style({ width: "100%", flex: 1 });
export const isActive = style({ backgroundColor: "var(--grey-200)" });

export const content = style({
  display: "block",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

export const prefix = style({ display: "flex" });
export const suffix = style({ display: "flex" });
export const loading = style({ visibility: "hidden" });
