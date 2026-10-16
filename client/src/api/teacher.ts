import { http } from "./http"
import type { CreateTeacherInput, Teacher, UpdateTeacherInput } from "@shareit/shared";

export const getTeachers = async() => (await http.get<{data: Teacher[]}>("/teachers")).data;
export const getTeacher = async(id: string) => (await http.get<{data: Teacher}>(`/teachers/${id}`)).data;
export const createTeacher = async(data: CreateTeacherInput) => (await http.post<{data: Teacher}>("/teachers/create",data)).data;
export const updateTeacher = async(id: string, data: UpdateTeacherInput) => await http.patch(`/teachers/${id}`, data);
export const deleteUser = async(id: string) => await http.delete(`/teachers/${id}`);