import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { getGoogleAuthUrl } from "./auth";
import { ROUTES } from "../../pages/routes";

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
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Decide</h1>
      <p>Please sign in to continue</p>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};
