import { useNavigate } from "react-router-dom";
import { useAuth } from "../../useAuth";
import { ROUTES } from "../../../../pages/routes";
import { LogoutButtonView } from "./LogoutButton.view";

export function LogoutButtonWidget() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return <LogoutButtonView onLogout={handleLogout} />;
}
