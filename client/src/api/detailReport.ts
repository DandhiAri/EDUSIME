import type { DetailReport, CreateDetailReportInput, UpdateDetailReportInput } from "@shareit/shared";
import { http } from "./http";

export const getDetailReports = async() => (await http.get<{data: DetailReport[]}>("/detailReport")).data;
export const getDetailReport = async(id: string) => (await http.get<{id: string, data: DetailReport}>(`/detailReport/${id}`)).data;

export const createDetailReport = async(data: CreateDetailReportInput) => (await http.post<{data: DetailReport}>(`/detailReport/create`,data)).data;
export const updateDetailReport = async(id: string, data: UpdateDetailReportInput) => (await http.patch(`/detailReport/${id}`,data));
export const deleteDetailReport = async(id: string) => await http.delete(`/detailReport/${id}`);