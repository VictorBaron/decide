import type { PropsWithChildren } from "react";
import classNames from "classnames";

import { Stack } from "../Stack";

import * as styles from "./BoxedIcon.css";

export type BoxedIconColor = keyof typeof styles.colors;
export type BoxedIconSize = keyof typeof styles.sizes;

export type BoxedIconProps = {
  color?: BoxedIconColor;
  size?: BoxedIconSize;
  border?: "primary";
  variant?: "square" | "circle" | "soft-circle";
  style?: React.CSSProperties;
  className?: string;
};

export const BoxedIcon = ({
  color = "grey",
  size = "medium",
  variant = "square",
  border,
  style,
  className,
  children,
}: PropsWithChildren<BoxedIconProps>) => {
  const isSoft = variant === "soft-circle";
  const softColor =
    isSoft && color in styles.softColors
      ? styles.softColors[color as keyof typeof styles.softColors]
      : null;

  return (
    <Stack
      align="center"
      justify="center"
      radius={variant === "circle" || variant === "soft-circle" ? 50 : 6}
      border={border}
      className={classNames(
        styles.boxedIcon,
        softColor ?? styles.colors[color],
        styles.sizes[size],
        className,
      )}
      style={style}
    >
      {children}
    </Stack>
  );
};
