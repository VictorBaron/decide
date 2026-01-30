import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../useAuth";
import { getGoogleAuthUrl } from "../../auth";
import { ROUTES } from "../../../../pages/routes";
import { LoginView } from "./Login.view";

export function LoginWidget() {
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

  return <LoginView loading={loading} onGoogleLogin={handleGoogleLogin} />;
}
