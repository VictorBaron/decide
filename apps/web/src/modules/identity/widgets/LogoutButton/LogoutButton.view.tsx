import * as styles from "./LogoutButton.css";

interface LogoutButtonViewProps {
  onLogout: () => void;
}

export function LogoutButtonView({ onLogout }: LogoutButtonViewProps) {
  return (
    <button onClick={onLogout} className={styles.button}>
      Logout
    </button>
  );
}
