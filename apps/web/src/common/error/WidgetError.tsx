import { Stack } from "../design-system";

interface WidgetErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const WidgetError = ({
  message = "Something went wrong",
  onRetry,
}: WidgetErrorProps) => {
  return (
    <Stack align="center" justify="center" gap={12} style={{ padding: 24 }}>
      <span style={{ fontSize: 32 }}>⚠️</span>
      <p style={{ margin: 0, color: "var(--text-secondary)" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid var(--grey-300)",
            background: "var(--white)",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      )}
    </Stack>
  );
};
