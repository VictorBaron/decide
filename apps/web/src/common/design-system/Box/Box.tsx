import React from "react";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";

import * as styles from "./Box.css";
import { extractLayoutProps, extractMarginProps } from "../../helpers";
import type {
  ColorType,
  LayoutProps,
  MarginProps,
  RadiusType,
} from "../../../styles/types";

type BoxElement = React.ElementRef<"div">;
type BoxOwnProps = {
  display?: "none" | "inline" | "inline-block" | "block" | "flex";
  background?: ColorType;
  border?: keyof typeof styles.borders;
  radius?: RadiusType;
};

export interface BoxProps
  extends
    React.ComponentPropsWithoutRef<"div">,
    MarginProps,
    LayoutProps,
    BoxOwnProps {
  asChild?: boolean;
}

export const Box = React.forwardRef<BoxElement, BoxProps>(function Box(
  {
    display,
    background,
    border,
    radius,
    children,
    asChild,
    style: propStyle,
    className,
    ...props
  },
  forwardedRef,
) {
  const { layoutProps, rest: layoutRest } = extractLayoutProps(props);
  const { marginProps, rest: boxProps } = extractMarginProps(layoutRest);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={classNames(border && styles.borders[border], className)}
      {...boxProps}
      style={{
        ...layoutProps,
        ...marginProps,
        ...propStyle,
        display,
        borderRadius: radius,
        background: background ? `var(--${background})` : undefined,
      }}
      ref={forwardedRef}
    >
      {children}
    </Comp>
  );
});
