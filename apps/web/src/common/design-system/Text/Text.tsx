import React from "react";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import * as styles from "./Text.css";
import type { ColorType } from "../../../styles/types";

type TextAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "small"
  | "span"
  | "label"
  | "div";
export type TextVariant = keyof typeof styles.variants;
export type TextFamily = "default" | "ai.global" | "signature";

export type PropsWithoutRefOrColor<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "color"
>;

type TextElement = React.ElementRef<"span">;
type TextOwnProps = {
  variant?: TextVariant;
  family?: TextFamily;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight?: 12 | 14 | 16 | 18 | 20 | 24 | 32;
  color?: ColorType | "inherit";
  transform?: React.CSSProperties["textTransform"];
  size?: 6 | 10 | 12 | 14 | 16 | 20 | 24 | 30;
  truncate?: boolean;
  children: React.ReactNode;
  whiteSpace?: React.CSSProperties["whiteSpace"];
  className?: string;
  textAlign?: React.CSSProperties["textAlign"];
  italic?: boolean;
  textDecoration?: string;
  maxLines?: number;
};
type TextAsChildProps = {
  asChild?: boolean;
  as?: never;
} & PropsWithoutRefOrColor<"a">;
type TextSpanProps = {
  as?: "span";
  asChild?: never;
} & PropsWithoutRefOrColor<"span">;
type TextDivProps = {
  as: "div";
  asChild?: never;
} & PropsWithoutRefOrColor<"div">;
type TextLabelProps = {
  as: "label";
  asChild?: never;
} & PropsWithoutRefOrColor<"label">;
type TextPProps = { as: "p"; asChild?: never } & PropsWithoutRefOrColor<"p">;
type TextSmallProps = {
  as: "small";
  asChild?: never;
} & PropsWithoutRefOrColor<"small">;
type TextH1Props = { as: "h1"; asChild?: never } & PropsWithoutRefOrColor<"h1">;
type TextH2Props = { as: "h2"; asChild?: never } & PropsWithoutRefOrColor<"h2">;
type TextH3Props = { as: "h3"; asChild?: never } & PropsWithoutRefOrColor<"h3">;
type TextH4Props = { as: "h4"; asChild?: never } & PropsWithoutRefOrColor<"h4">;

export type TextProps = TextOwnProps &
  (
    | TextAsChildProps
    | TextSpanProps
    | TextDivProps
    | TextLabelProps
    | TextPProps
    | TextSmallProps
    | TextH1Props
    | TextH2Props
    | TextH3Props
    | TextH4Props
  );

const VARIANT_MAP: Record<TextVariant, TextAs> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-bold": "div",
  "body-medium": "div",
  "body-regular": "div",
  "small-medium": "div",
  "small-regular": "div",
  "tiny-bold": "span",
  "tiny-medium": "span",
  "tiny-regular": "span",
};

const FAMILY_MAP: Record<TextFamily, string | undefined> = {
  default: undefined,
  "ai.global": "Merriweather",
  signature: "Caveat",
};

export const Text = React.forwardRef<TextElement, TextProps>(function Text(
  {
    variant = "body-regular",
    family = "default",
    className,
    color = "text-primary",
    weight,
    transform,
    size,
    lineHeight,
    truncate,
    children,
    whiteSpace,
    style: propStyle,
    asChild = false,
    as,
    textAlign = "start",
    italic = false,
    textDecoration = "none",
    maxLines,
    ...textProps
  },
  forwardedRef,
) {
  const Tag = as || VARIANT_MAP[variant];

  const inlineVars = assignInlineVars({
    [styles.textColor]: `var(--${color})`,
    ...(weight && { [styles.textWeight]: String(weight) }),
    ...(transform && { [styles.textTransform]: transform }),
    ...(size && { [styles.textSize]: `${size / 16}rem` }),
    ...(lineHeight && { [styles.textLineHeight]: `${lineHeight / 16}rem` }),
    ...(whiteSpace && { [styles.textWhiteSpace]: whiteSpace }),
    [styles.textAlign]: textAlign,
    [styles.fontStyle]: italic ? "italic" : "normal",
    ...(FAMILY_MAP[family] && { [styles.fontFamily]: FAMILY_MAP[family] }),
    ...(maxLines && { [styles.maxLines]: String(maxLines) }),
    [styles.textDecoration]: textDecoration,
  });

  return (
    <Slot
      data-accent-color={color}
      {...textProps}
      ref={forwardedRef}
      className={classNames(
        className,
        styles.text,
        styles.variants[variant],
        truncate && styles.truncate,
        maxLines && styles.maxLinesStyle,
      )}
      style={{ ...inlineVars, ...propStyle }}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
