import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Hello, {user?.name || user?.email}!</h1>
      <p>You are logged in.</p>
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
    </div>
  );
}
