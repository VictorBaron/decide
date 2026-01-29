import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../pages/routes";
import { secondaryButtonStyles } from "../../styles";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <button onClick={handleLogout} style={secondaryButtonStyles}>
      Logout
    </button>
  );
};
