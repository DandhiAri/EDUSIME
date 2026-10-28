import { ObjectId } from "mongodb";
import { Request,Response } from "express";
import { schoolReportRepository } from "../repositories/schoolReports.repository";
import SchoolReport from "../models/schoolReport";
import { updateSchoolReportSchema, createSchoolReportSchema } from "@shareit/shared";
import type { SchoolReport as SchoolReportResponse } from "@shareit/shared";

const validId = (id: unknown): id is string => typeof id === "string" && ObjectId.isValid(id);

function toSchoolReportResponse(schoolReport: SchoolReport): SchoolReportResponse {
    return {
        _id: schoolReport._id.toString(),
        total_sakit: schoolReport.total_sakit,
        total_izin: schoolReport.total_izin,
        total_alpha: schoolReport.total_alpha,
        catatan_wali_kelas: schoolReport.catatan_wali_kelas,
        status: schoolReport.status,
        studentId: schoolReport.studentId.toString(),
        classroomId: schoolReport.classroomId.toString(),
        schoolYearsId: schoolReport.schoolYearsId.toString(),
    }
}

export async function getSchoolReport(req: Request, res: Response) {
    const { studentId, classroomId, schoolYearsid } = req.body;
    if(studentId !== undefined && !validId(studentId)) {
        return res.status(400).json({message: "studentId tidak valid"})
    }
    if(classroomId !== undefined && !validId(classroomId)) {
        return res.status(400).json({message: "classroomId tidak valid"})
    }
    if(schoolYearsid !== undefined && !validId(schoolYearsid)) {
        return res.status(400).json({message: "schoolYearsid tidak valid"})
    }
    try {
        const list = await schoolReportRepository.findAll({
            ...(studentId ? {studentId} : {}),
            ...(classroomId ? {classroomId} : {}),
            ...(schoolYearsid ? {schoolYearsid} : {}),
        })
        res.status(200).json({
            message: "Data Rapot",
            total_data: list.length,
            data: list.map(toSchoolReportResponse)
        })
    } catch (error) {
        res.status(500).json({message: "Gagal mengambil data rapot"})
    }
}

export async function getSchoolReportById(req: Request, res: Response) {
    const { id } = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const item = await schoolReportRepository.findById(id);
        if(!item) return res.status(404).json({message: "Detail rapot tidak ditemukan"});
        res.json({message: "Detail rapot", data: toSchoolReportResponse(item)})
    } catch (error) {
        res.status(500).json({message: "Gagal mengambil data rapot"})
    }
}
export async function updateSchoolReport(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    const parsed = updateSchoolReportSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten(),
        })
    }
    try {
        const { ...rest } = parsed.data;
        const result = await schoolReportRepository.update(id, {
            ...rest
        })
        res.json({message: "Rapot berhasil diperbaharui"})
    } catch (error) {
        res.status(500).json({message: "Gagal memperbaharui rapot"})
    }
}
export async function createSchoolReport(req: Request, res: Response) {
    const parsed = createSchoolReportSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "Data tidak valid", details: parsed.error.flatten});
    try {
        const { studentId, classroomId, schoolYearsId,status,catatan_wali_kelas,total_alpha,total_izin,total_sakit } = parsed.data;
        if (!ObjectId.isValid(studentId) || !ObjectId.isValid(classroomId) || !ObjectId.isValid(schoolYearsId)) {
            return res.status(400).json({message: "id tidak valid"})
        }
        const schoolReport = new SchoolReport(
            new ObjectId(),
            total_sakit,
            total_izin,
            total_alpha,
            catatan_wali_kelas,
            status,
            new ObjectId(studentId),
            new ObjectId(classroomId),
            new ObjectId(schoolYearsId),
        )
        await schoolReportRepository.create(schoolReport);
        res.status(201).json({
            message: "Rapot berhasil di buat",
            data: toSchoolReportResponse(schoolReport)
        });
    } catch (error) {
        return res.status(500).json({message: "Gagal membuat rapot"});
    }
}
export async function deleteSchoolReport(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const result = await schoolReportRepository.delete(id);
        if(result.deletedCount === 0) return res.status(404).json({message: "Rapot tidak ditemukan"});
        res.json({message: "Rapot berhasil dihapus"})
    } catch (error) {
        res.status(500).json({message: "Gagagl menghapus rapot"})
    }
}