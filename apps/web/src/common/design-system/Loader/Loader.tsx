import { loader, loaderSize, loaderStroke, loaderColor } from "./Loader.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import type { ColorType } from "../../styles/types";

export type LoaderSize = 16 | 18 | 20 | 24 | 32 | 40;
export type LoaderStroke = 1 | 2 | 4;

interface LoaderProps {
  color?: ColorType;
  size?: LoaderSize;
  stroke?: LoaderStroke;
}

export const Loader = ({
  color = "PRIMARY",
  size = 20,
  stroke = 2,
}: LoaderProps) => {
  return (
    <div
      className={loader}
      style={assignInlineVars({
        [loaderSize]: `${size}px`,
        [loaderStroke]: `${stroke}px`,
        [loaderColor]: color,
      })}
    />
  );
};
