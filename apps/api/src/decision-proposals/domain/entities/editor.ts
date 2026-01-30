import { Block } from "@blocknote/core";

export function isBlock(value: unknown): value is Block {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "type" in value &&
    "content" in value
  );
}

export function isBlockArray(value: unknown): value is Block[] {
  return Array.isArray(value) && value.every((item) => isBlock(item));
}
