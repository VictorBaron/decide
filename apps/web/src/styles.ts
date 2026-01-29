import type { CSSProperties } from "react";

export const colors = {
  primary: "#1a1a2e",
  primaryHover: "#2d2d44",
  secondary: "#f5f5f7",
  secondaryHover: "#e8e8eb",
  background: "#f8f9fa",
  surface: "#ffffff",
  border: "#e5e7eb",
  borderDashed: "#d1d5db",
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  error: "#dc2626",
  errorBg: "#fef2f2",
  success: "#047857",
  successBg: "#d1fae5",
  successLight: "#f0fdf4",
  successBorder: "#bbf7d0",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const;

export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

export const containerStyles: CSSProperties = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: spacing.xl,
};

export const cardStyles: CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px dashed ${colors.borderDashed}`,
  borderRadius: radius.lg,
  padding: spacing.xl,
};

export const inputStyles: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: radius.md,
  border: "none",
  backgroundColor: colors.secondary,
  fontSize: 14,
  color: colors.textPrimary,
  outline: "none",
};

export const labelStyles: CSSProperties = {
  display: "block",
  marginBottom: spacing.xs,
  fontWeight: 500,
  fontSize: 14,
  color: colors.textPrimary,
};

export const primaryButtonStyles: CSSProperties = {
  padding: "12px 24px",
  backgroundColor: colors.primary,
  color: "#fff",
  border: "none",
  borderRadius: radius.md,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

export const secondaryButtonStyles: CSSProperties = {
  padding: "10px 20px",
  backgroundColor: colors.secondary,
  color: colors.textPrimary,
  border: "none",
  borderRadius: radius.md,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

export const dangerButtonStyles: CSSProperties = {
  padding: "10px 16px",
  backgroundColor: colors.errorBg,
  color: colors.error,
  border: "none",
  borderRadius: radius.md,
  fontSize: 14,
  cursor: "pointer",
};

export const linkStyles: CSSProperties = {
  color: colors.primary,
  textDecoration: "none",
  fontSize: 14,
};

export const pageHeaderStyles: CSSProperties = {
  marginBottom: spacing.xl,
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.border}`,
};

export const tabContainerStyles: CSSProperties = {
  display: "inline-flex",
  backgroundColor: colors.secondary,
  borderRadius: radius.full,
  padding: spacing.xs,
};

export const tabStyles = (isActive: boolean): CSSProperties => ({
  padding: "10px 24px",
  borderRadius: radius.full,
  border: "none",
  backgroundColor: isActive ? colors.surface : "transparent",
  color: colors.textPrimary,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
  display: "flex",
  alignItems: "center",
  gap: spacing.sm,
});
