import type { LayoutProps } from "../../styles/types";

export const extractLayoutProps = <Props extends object = object>(
  props: Props & LayoutProps,
) => {
  const {
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    position,
    top,
    left,
    right,
    bottom,
    shrink,
    grow,
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    ...rest
  } = props;

  return {
    layoutProps: {
      paddingLeft:
        paddingX || paddingLeft || padding
          ? `${paddingX || paddingLeft || padding}px`
          : undefined,
      paddingRight:
        paddingX || paddingRight || padding
          ? `${paddingX || paddingRight || padding}px`
          : undefined,
      paddingTop:
        paddingY || paddingTop || padding
          ? `${paddingY || paddingTop || padding}px`
          : undefined,
      paddingBottom:
        paddingY || paddingBottom || padding
          ? `${paddingY || paddingBottom || padding}px`
          : undefined,
      position,
      top: numberToString(top),
      left: numberToString(left),
      right: numberToString(right),
      bottom: numberToString(bottom),
      width: numberToString(width),
      maxWidth: numberToString(maxWidth),
      minWidth: numberToString(minWidth),
      height: numberToString(height),
      maxHeight: numberToString(maxHeight),
      minHeight: numberToString(minHeight),
      flexShrink: numberToString(shrink),
      flexGrow: numberToString(grow),
    },
    rest,
  };
};

const numberToString = (value: number | string | undefined) => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};
