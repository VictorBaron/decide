import * as styles from "./Login.css";

interface LoginViewProps {
  loading: boolean;
  onGoogleLogin: () => void;
}

export function LoginView({ loading, onGoogleLogin }: LoginViewProps) {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Decide</h1>
        <p className={styles.subtitle}>
          Materialize and track decisions across your organization
        </p>
        <button onClick={onGoogleLogin} className={styles.button}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
