import { Dashboard } from "../modules/decision-proposals/dashboard/Dashboard";
import { LogoutButton } from "../modules/auth/LogoutButton";
import { useAuth } from "../modules/auth/useAuth";

export function HomePage() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Hello, {user?.name || user?.email}!</h1>
      <p>You are logged in.</p>
      <Dashboard />
      <LogoutButton />
    </div>
  );
}
