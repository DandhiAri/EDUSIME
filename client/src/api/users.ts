import type { CreateUserInput, UpdateUserInput, User } from "@shareit/shared";
import { http } from "./http";

export const getUsers = async() => (await http.get<{data: User[]}>("/users")).data;
export const getUser = async(id: string) => (await http.get<{data: User}>((`/users/${id}`))).data;
export const createUser = async(data: CreateUserInput) => (await http.post<{data: CreateUserInput}>("/users/create", data)).data;
export const updateUser = async(id: string, data: UpdateUserInput) => await http.patch(`/users/${id}`,data);
export const deleteUser = async(id: string) => await http.delete(`/users/${id}`);