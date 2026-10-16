import type { CreateStudentInput, Student, UpdateStudentInput} from "@shareit/shared";
import { http } from "./http";

export const getStudent = async() => (await http.get<{data: Student}>("/students")).data;
export const createStudent = async(data: CreateStudentInput) => (await http.post<{data: Student}>("/students/create", data)).data;
export const updateStudent = async(id: string, data: UpdateStudentInput) => await http.patch(`/students/${id}`, data);
export const deleteStudent = async(id: string) => await http.delete(`/students/${id}`);