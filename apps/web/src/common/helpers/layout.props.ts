import { LayoutProps } from 'mimir/types';

export const extractLayoutProps = <Props extends {} = {}>(props: Props & LayoutProps) => {
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
      paddingLeft: paddingX || paddingLeft || padding ? `${paddingX || paddingLeft || padding}px` : undefined,
      paddingRight: paddingX || paddingRight || padding ? `${paddingX || paddingRight || padding}px` : undefined,
      paddingTop: paddingY || paddingTop || padding ? `${paddingY || paddingTop || padding}px` : undefined,
      paddingBottom: paddingY || paddingBottom || padding ? `${paddingY || paddingBottom || padding}px` : undefined,
      position,
      top,
      left,
      right,
      bottom,
      width,
      maxWidth,
      minWidth,
      height,
      maxHeight,
      minHeight,
      flexShrink: shrink,
      flexGrow: grow,
    },
    rest,
  };
};
