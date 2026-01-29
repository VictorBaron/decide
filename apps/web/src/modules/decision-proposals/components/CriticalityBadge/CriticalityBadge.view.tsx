import type { Criticality } from "../../types";
import * as styles from "./CriticalityBadge.css";

const CRITICALITY_LABELS: Record<Criticality, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

interface CriticalityBadgeProps {
  criticality: Criticality;
}

export function CriticalityBadge({ criticality }: CriticalityBadgeProps) {
  return (
    <span className={`${styles.base} ${styles.variants[criticality]}`}>
      {CRITICALITY_LABELS[criticality]}
    </span>
  );
}
