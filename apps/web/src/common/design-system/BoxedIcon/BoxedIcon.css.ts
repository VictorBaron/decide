import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

export const boxedIcon = style({
  display: "inline-flex",
  alignItems: "center",
});

export const sizes = styleVariants({
  xxsmall: { height: 20, width: 20 },
  xsmall: { height: 24, width: 24 },
  small: { height: 32, width: 32 },
  medium: { height: 40, width: 40 },
  large: { height: 64, width: 64 },
  xlarge: { height: 80, width: 80 },
});

const svgSizes: Record<keyof typeof sizes, number> = {
  xxsmall: 14,
  xsmall: 16,
  small: 20,
  medium: 24,
  large: 33.33,
  xlarge: 40,
};

Object.entries(sizes).forEach(([size, className]) => {
  globalStyle(`${className} svg`, {
    width: svgSizes[size as keyof typeof sizes],
    height: svgSizes[size as keyof typeof sizes],
  });
});

export const colors = styleVariants({
  grey: {
    color: "var(--grey-500)",
    backgroundColor: "var(--grey-200)",
  },
  neutral: {
    color: "var(--grey-700)",
    backgroundColor: "var(--grey-200)",
  },
  silver: {
    color: "var(--neutral-700)",
    backgroundColor: "var(--grey-300)",
  },
  black: {
    color: "var(--white)",
    backgroundColor: "var(--grey-900)",
  },
  blue: {
    color: "var(--blue-700)",
    backgroundColor: "var(--blue-100)",
  },
  green: {
    color: "var(--green-700)",
    backgroundColor: "var(--green-100)",
  },
  mint: {
    color: "var(--green-700)",
    backgroundColor: "var(--green-200)",
  },
  success: {
    color: "var(--green-500)",
    backgroundColor: "var(--green-100)",
  },
  orange: {
    color: "var(--orange-700)",
    backgroundColor: "var(--orange-100)",
  },
  red: {
    color: "var(--red-700)",
    backgroundColor: "var(--red-100)",
  },
  fuchsia: {
    color: "var(--fuchsia-700)",
    backgroundColor: "var(--fuchsia-100)",
  },
  purple: {
    color: "var(--purple-700)",
    backgroundColor: "var(--purple-100)",
  },
  golden: {
    color: "var(--golden-700)",
    backgroundColor: "var(--golden-100)",
  },
  dark: {
    color: "var(--dark-700)",
    backgroundColor: "var(--dark-100)",
  },
  white: {
    color: "var(--grey-500)",
    backgroundColor: "var(--white)",
  },
});

export const softColors = styleVariants({
  grey: {
    color: "var(--grey-200)",
    backgroundColor: "var(--grey-500)",
  },
  silver: {
    color: "var(--neutral-700)",
    backgroundColor: "var(--grey-200)",
  },
  blue: {
    color: "var(--blue-100)",
    backgroundColor: "var(--blue-700)",
  },
  green: {
    color: "var(--green-100)",
    backgroundColor: "var(--green-500)",
  },
  mint: {
    color: "var(--green-700)",
    backgroundColor: "var(--green-100)",
  },
});
