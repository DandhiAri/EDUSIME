import type { CreateUserInput, UpdateUserInput, User } from "@shareit/shared";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path:string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {"Content-type": "application/json",...(token  ? { Authorization: `Bearer ${token}`} : {})},
    })
    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    const body = await res.json();
    if (!res.ok) throw new Error(body.message ?? "Terjadi kesalahan")
    return body;
}
export async function createUser(data: CreateUserInput): Promise<User> {
  return (
    await request<{ data: User }>("/users/create",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
  ).data
}

export async function updateUser(id: string, data: UpdateUserInput): Promise<void> {
    await request<{ message: string }>(`/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
}

export async function getUser(id:string): Promise<User> {
    return (await request<{ data: User }>(`/users/${id}`)).data;
}
export async function getUsers(): Promise<User[]> {
    return (await request<{ data:User[] }>("/users")).data
}
export async function deleteUser(id: string): Promise<void> {
    await request<{ message: string }>(`/users/${id}`,{method: "DELETE"})
}