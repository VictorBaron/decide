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
  return "/api/v1/auth/google";
}
