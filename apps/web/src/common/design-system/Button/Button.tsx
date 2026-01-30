import React from "react";
import classNames from "classnames";

import { extractMarginProps } from "../../helpers";
import { Loader } from "../Loader";
import type { ColorType, MarginProps } from "../../../styles/types";

import * as styles from "./Button.css";

import { Box } from "../Box";

const BUTTON_VARIANT_TO_LOADER_COLOR = {
  primary: "PRIMARY",
  secondary: "TEXT_SECONDARY",
  tertiary: "TEXT_SECONDARY",
  success: "WHITE",
  danger: "WHITE",
} as const satisfies Record<ButtonVariant, ColorType>;

type ButtonElement = React.ElementRef<"button">;
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "danger";
export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg";
type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rounded?: boolean;
  justify?: "start" | "space-between" | "center";
  full?: boolean;
  isActive?: boolean;
};

export interface ButtonProps
  extends
    MarginProps,
    ButtonOwnProps,
    Omit<React.ComponentPropsWithoutRef<"button">, "prefix"> {}

export const Button = React.forwardRef<ButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      disabled = false,
      children,
      prefix,
      suffix,
      style: propStyle,
      loading,
      ...props
    },
    forwardedRef,
  ) {
    const { marginProps, rest: buttonProps } = extractMarginProps(props);

    return (
      <button
        disabled={disabled || loading}
        ref={forwardedRef}
        {...buttonProps}
        style={{ ...marginProps, ...propStyle }}
      >
        {prefix ? (
          <span
            className={classNames(styles.prefix, { [styles.loading]: loading })}
          >
            {prefix}
          </span>
        ) : null}

        <span
          className={classNames(styles.content, {
            [styles.loading]: loading,
          })}
        >
          {children}
        </span>

        {suffix ? (
          <span
            className={classNames(styles.suffix, { [styles.loading]: loading })}
          >
            {suffix}
          </span>
        ) : null}
        {loading ? (
          <Box position="absolute">
            <Loader color={BUTTON_VARIANT_TO_LOADER_COLOR[variant]} />
          </Box>
        ) : null}
      </button>
    );
  },
);
