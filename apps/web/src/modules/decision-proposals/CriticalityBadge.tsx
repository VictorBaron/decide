import type { Criticality } from "./types";
import { radius } from "../../styles";

const CRITICALITY_STYLES: Record<
  Criticality,
  { bg: string; text: string; label: string }
> = {
  LOW: { bg: "#dcfce7", text: "#166534", label: "Low" },
  MEDIUM: { bg: "#fef9c3", text: "#854d0e", label: "Medium" },
  HIGH: { bg: "#fed7aa", text: "#c2410c", label: "High" },
  CRITICAL: { bg: "#fecaca", text: "#dc2626", label: "Critical" },
};

interface CriticalityBadgeProps {
  criticality: Criticality;
}

export function CriticalityBadge({ criticality }: CriticalityBadgeProps) {
  const style = CRITICALITY_STYLES[criticality];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: radius.sm,
        fontSize: 12,
        fontWeight: 500,
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {style.label}
    </span>
  );
}
