import React from "react";
import classNames from "classnames";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  stack,
  stackDirection,
  stackWrap,
  stackAlign,
  stackJustify,
  stackFlex,
  stackGap,
  stackBackground,
  stackBorder,
} from "./Stack.css";

import type { ColorType } from "../../../styles/types";
import { extractLayoutProps, extractMarginProps } from "../../helpers";

type StackElement = React.ElementRef<"div">;
type StackOwnProps = {
  gap?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?:
    | "normal"
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline";
  justify?:
    | "normal"
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  flex?: string;
  flexShrink?: number;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  background?: ColorType;
  boxShadow?: string;
  border?: string;
  radius?: number;
  cursor?: "pointer" | "default" | "move";
  overflow?: "visible" | "hidden" | "scroll" | "auto";
};

export interface StackProps
  extends React.ComponentPropsWithoutRef<"div">, StackOwnProps {
  asChild?: boolean;
}

export const Stack = React.forwardRef<StackElement, StackProps>(function Stack(
  {
    align = "normal",
    justify = "normal",
    direction = "column",
    flex = "initial",
    wrap = "nowrap",
    background,
    boxShadow,
    border,
    radius,
    children,
    gap = 0,
    className,
    overflow,
    flexShrink,
    ...props
  },
  forwardedRef,
) {
  const { layoutProps, rest: layoutRest } = extractLayoutProps(props);
  const { marginProps, rest: stackProps } = extractMarginProps(layoutRest);

  return (
    <div
      className={classNames(stack, className)}
      {...stackProps}
      style={assignInlineVars({
        ...layoutProps,
        ...marginProps,
        [stackGap]: `${gap}px`,
        [stackAlign]: align,
        [stackJustify]: justify,
        [stackDirection]: direction,
        [stackFlex]: flex,
        [stackWrap]: wrap,
        [stackBackground]: background,
        [stackBorder]: border ?? "none",
        borderRadius: radius ? `${radius}px` : undefined,
        boxShadow,
        cursor: props.cursor,
        overflow,
        flexShrink: flexShrink !== undefined ? flexShrink.toString() : "",
      })}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
});
