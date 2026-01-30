export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function getMe(): Promise<User | null> {
  const res = await fetch("/api/v1/auth/me", {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function logout(): Promise<void> {
  await fetch("/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export function getGoogleAuthUrl(): string {
  // For OAuth redirects, we need the full backend URL since window.location.href
  // bypasses the Vite proxy (which only works for fetch/XHR requests)
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return `${apiUrl}/api/v1/auth/google`;
}
