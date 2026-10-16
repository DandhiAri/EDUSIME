const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? "Terjadi kesalahan");
  return body;
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) => request<T>(path, {method: "POST", body: JSON.stringify(data)}),
  // for update data
  patch: <T>(path: string, data: unknown) => request<T>(path, {method: "PATCH", body: JSON.stringify(data)}),
  delete: <T>(path: string) => request<T>(path, {method : "DELETE"})
}

export function buildQuery(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  })
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}