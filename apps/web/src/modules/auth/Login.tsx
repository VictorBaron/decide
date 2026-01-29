import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { getGoogleAuthUrl } from "./auth";
import { ROUTES } from "../../pages/routes";
import {
  containerStyles,
  colors,
  spacing,
  primaryButtonStyles,
} from "../../styles";

export const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(ROUTES.HOME);
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  if (loading) {
    return (
      <div
        style={{
          ...containerStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ color: colors.textSecondary }}>Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        ...containerStyles,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <h1 style={{ fontSize: 32, marginBottom: spacing.sm }}>Decide</h1>
        <p style={{ color: colors.textSecondary, marginBottom: spacing["2xl"] }}>
          Materialize and track decisions across your organization
        </p>
        <button
          onClick={handleGoogleLogin}
          style={{
            ...primaryButtonStyles,
            width: "100%",
            padding: "14px 24px",
            fontSize: 15,
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
