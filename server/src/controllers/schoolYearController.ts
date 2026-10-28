import { ObjectId } from "mongodb"
import { Request, Response } from "express"
import { schoolYearRepository } from "../repositories/schoolYears.repository"
import SchoolYears from "../models/schoolYears"
import { updateSchoolYearSchema, createSchoolYearSchema } from "@shareit/shared"
import type { SchoolYear as SchoolYearResponse } from "@shareit/shared";

const validId = (id: unknown): id is string => typeof id === "string" && ObjectId.isValid(id);

function toSchoolYearResponse(schoolYear: SchoolYears): SchoolYearResponse {
    return {
        _id: schoolYear._id.toString(),
        tahun: schoolYear.tahun,
        semester: schoolYear.semester,
        tanggal_mulai: schoolYear.tanggal_mulai.toISOString(),
        tanggal_selesai: schoolYear.tanggal_selesai.toISOString(),
    }
}

export async function getSchoolYear(req: Request, res: Response) {
    try {
        const list = await schoolYearRepository.findAll();
        res.status(200).json({
            message: "Data tahun ajaran",
            total_data: list.length,
            data: list.map(toSchoolYearResponse)
        })
    } catch (error) {
        res.status(500).json({message: "Gagal mengambil data"})
    }
}
export async function getSchoolYearById(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const item = await schoolYearRepository.findById(id);
        if(!item) return res.status(404).json({message: "Tahun ajaran tidak ditemukan"});
        res.json({message: "Tahun ajaran", data: toSchoolYearResponse(item)})
    } catch (error) {
        res.status(500).json({message: "Gagal mengambil tahun ajaran"})
    }
}

export async function updateSchoolYear(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    const parsed = updateSchoolYearSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten(),
        })
    }
    try {
        const { ...rest } = parsed.data;
        const result = await schoolYearRepository.update(id,{
            ...rest
        })
        if(result.matchedCount === 0) return res.status(404).json({message: "tahun ajaran tidak ditemukan"});
        res.json({message: "Tahun ajaran berhasil diperbaharui"})
    } catch (error) {
        res.status(500).json({message: "Gagal memperbaharui tahun ajaran"});
    }
}

export async function createSchoolYear(req: Request, res: Response) {
    const parsed = createSchoolYearSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "Data tidak valid", details: parsed.error.flatten()});
    try {
        const { tahun, semester, tanggal_mulai, tanggal_selesai } = parsed.data;
        const schoolYear = new SchoolYears(
            new ObjectId(),
            tahun,
            semester,
            tanggal_mulai,
            tanggal_selesai,
        );
        await schoolYearRepository.create(schoolYear);
        res.status(201).json({
            message: "Tahun ajaran berhasil dibuat",
            data: toSchoolYearResponse(schoolYear)
        })
    } catch (error) {
        res.status(500).json({message: "Gagal membuat tahun ajaran"});
    }
}

export async function deleteSchoolYear(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});

    try {
        const result = await schoolYearRepository.delete(id);
        if(result.deletedCount === 0) return res.status(404).json({message: "tahun ajaran tidak ditemukan"});
        res.json({message: "Tahun ajaran berhasil dihapus"});
    } catch(error) {
        res.status(500).json({message: "Gagal menghapus tahun ajaran"})
    }
}