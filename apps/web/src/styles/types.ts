export const Color = {
  PRIMARY: "primary",
  PRIMARY_HOVER: "primaryHover",
  SECONDARY: "secondary",
  SECONDARY_HOVER: "secondaryHover",
  BACKGROUND: "background",
  SURFACE: "surface",
  BORDER: "border",
  BORDER_DASHED: "borderDashed",
  TEXT_PRIMARY: "textPrimary",
  TEXT_SECONDARY: "textSecondary",
  TEXT_MUTED: "textMuted",
  ERROR: "error",
  ERROR_BG: "errorBg",
  SUCCESS: "success",
  SUCCESS_BG: "successBg",
  SUCCESS_LIGHT: "successLight",
  SUCCESS_BORDER: "successBorder",
  WHITE: "white",
} as const;
export type ColorType = keyof typeof Color;

export const Space = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  _2XL: "2xl",
  _3XL: "3xl",
} as const;
export type SpaceType = keyof typeof Space;

export const Radius = {
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  FULL: "full",
} as const;
export type RadiusType = keyof typeof Radius;

export const FontSize = {
  XS: "xs",
  SM: "sm",
  BASE: "base",
  MD: "md",
  LG: "lg",
  XL: "xl",
  _2XL: "2xl",
  _3XL: "3xl",
  _4XL: "4xl",
} as const;
export type FontSizeType = keyof typeof FontSize;

export const FontWeight = {
  NORMAL: "normal",
  MEDIUM: "medium",
  SEMIBOLD: "semibold",
} as const;
export type FontWeightType = keyof typeof FontWeight;

export type MarginProps = {
  margin?: number;
  marginX?: number;
  marginY?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export type LayoutProps = {
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  position?: React.CSSProperties["position"];
  top?: React.CSSProperties["top"];
  left?: React.CSSProperties["left"];
  right?: React.CSSProperties["right"];
  bottom?: React.CSSProperties["bottom"];
  width?: React.CSSProperties["width"];
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  height?: React.CSSProperties["height"];
  minHeight?: React.CSSProperties["minHeight"];
  maxHeight?: React.CSSProperties["maxHeight"];
  shrink?: React.CSSProperties["flexShrink"];
  grow?: React.CSSProperties["flexGrow"];
};
