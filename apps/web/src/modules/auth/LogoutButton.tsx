import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../pages/routes";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Logout
    </button>
  );
};
