import type { LoginInput, User } from "@shareit/shared";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function login(data: LoginInput): Promise<{ user: User; token: string }> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? "Login gagal");

  return body.data;
}