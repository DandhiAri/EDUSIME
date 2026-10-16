import type { Attendence, CreateAttendenceInput, UpdateAttendenceInput } from "@shareit/shared";
import { buildQuery, http } from "./http";
export interface AttendenceQuery {
  classroomId?: string;
  studentId?: string;
  tanggal?: string;
}

export const getAttendences = async(q: AttendenceQuery = {}) => (await http.get<{data: Attendence[]}>(`/attendences${buildQuery({...q})}`)).data;
export const getAttendence = async(id: string) => (await http.get<{id: string, data: Attendence}>(`/attendences/${id}`)).data;

type CreateBody = Omit<CreateAttendenceInput, "tanggal"> & {tanggal: string};
type UpdateBody = Omit<UpdateAttendenceInput, "tanggal"> & {tanggal?: string};

export const createAttendence = async(data: CreateBody) => (await http.post<{data: Attendence}>(`/attendences/create`,data)).data;
export const updateAttendence = async(id: string, data: UpdateBody) => await http.patch(`/attendences/${id}`,data);
export const deleteAttendence = async(id: string) => await http.delete(`/attendences/${id}`)