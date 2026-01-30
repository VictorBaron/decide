import type { MarginProps } from "../../styles/types";
import { notNullish } from "./notNullish";

export const extractMarginProps = <Props extends object = object>(
  props: Props & MarginProps,
) => {
  const {
    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...rest
  } = props;

  return {
    marginProps: {
      marginLeft:
        notNullish(marginX) || notNullish(marginLeft) || notNullish(margin)
          ? `${marginX || marginLeft || margin}px`
          : undefined,
      marginRight:
        notNullish(marginX) || notNullish(marginRight) || notNullish(margin)
          ? `${marginX || marginRight || margin}px`
          : undefined,
      marginTop:
        notNullish(marginY) || notNullish(marginTop) || notNullish(margin)
          ? `${marginY || marginTop || margin}px`
          : undefined,
      marginBottom:
        notNullish(marginY) || notNullish(marginBottom) || notNullish(margin)
          ? `${marginY || marginBottom || margin}px`
          : undefined,
    },
    rest,
  };
};
