import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { detailReportRepository } from "../repositories/detailReports.repository";
import DetailReport from "../models/detailReport";
import { updateDetailReportSchema, createDetailReportSchema } from "@shareit/shared";
import type { DetailReport as DetailReportResponse } from "@shareit/shared"

const validId = (id: unknown): id is string => typeof id === "string" && ObjectId.isValid(id);

function toDetailReportResponse(detailReport: DetailReport): DetailReportResponse {
    return {
        _id: detailReport._id.toString(),
        schoolReportId: detailReport.schoolReportId.toString(),
        subjectId: detailReport.subjectId.toString(),
        nilai_tugas: detailReport.nilai_tugas,
        nilai_ulangan: detailReport.nilai_ulangan,
        nilai_uts: detailReport.nilai_uts,
        nilai_uas: detailReport.nilai_uas,
        nilai_akhir: detailReport.nilai_akhir,
        predikat: detailReport.predikat,
        deskripsi: detailReport.deskripsi
    }
}

export async function getDetailReport(req: Request, res: Response) {
    const { subjectId, schoolReportId } = req.body;
    if (subjectId !== undefined && !validId(subjectId)) {
        return res.status(400).json({message: "subjectId tidak valid"})
    }
    if (schoolReportId !== undefined && !validId(schoolReportId)) {
        return res.status(400).json({message: "schoolReportId tidak valid"})
    }
    try {
        const list = await detailReportRepository.findAll({
            ...(subjectId ? {subjectId} : {}),
            ...(schoolReportId ? {schoolReportId} : {}),
        });
        res.status(200).json({
            message: "Data Detail Rapot",
            total_data: list.length,
            data: list.map(toDetailReportResponse),
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Gagal mengambil data rapot" })
    }
}

export async function getDetailReportById(req: Request, res: Response) {
    const { id } = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const item = await detailReportRepository.findById(id);
        if(!item) return res.status(404).json({message: "Detail Rapot tidak ditemukan"});
        res.json({message: "Detail rapot", data: toDetailReportResponse(item)})
    } catch (error) {
        res.status(500).json({message: "gagal mengambil detail rapot"})
    }
}

export async function updateDetailReport(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "Id tidak valid"});
    const parsed = updateDetailReportSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten()
        })
    }
    try {
        const { ...rest } = parsed.data;
        const result = await detailReportRepository.update(id,{
            ...rest
        });
        if(result.matchedCount === 0) return res.status(404).json({message: "detail rapot tidak ditemukan"});
        res.json({ message: "Detail Rapot berhasil diperbaharui" })
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbaharui detail rapot" })
    }
}

export async function createDetailReport(req: Request, res: Response) {
    const parsed = createDetailReportSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "Data tidak valid", details: parsed.error.flatten()});
    try {
        const {schoolReportId, subjectId, nilai_tugas, nilai_ulangan, nilai_uts, nilai_uas, nilai_akhir, predikat, deskripsi} = parsed.data;
        if (!ObjectId.isValid(schoolReportId) || !ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: "id schoolreport atau subjectid tidak valid" })
        }
        const detailReport = new DetailReport(
            new ObjectId(),
            new ObjectId(schoolReportId),
            new ObjectId(subjectId),
            nilai_tugas,
            nilai_ulangan,
            nilai_uts,
            nilai_uas,
            nilai_akhir,
            predikat,
            deskripsi ?? "",
        )
        await detailReportRepository.create(detailReport)
        res.status(201).json({
            message: "Detail rapot berhasil di buat",
            data: toDetailReportResponse(detailReport)
        })
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat detail report" })
    }
}

export async function deleteDetailReport(req: Request, res: Response) {
    const {id} = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const result = await detailReportRepository.delete(id);
        if(result.deletedCount === 0) return res.status(404).json({message: "Detail report tidak ditemukan"});
        res.json({message: "Detail report berhasil dihapus"})
    } catch (error) {
        res.status(500).json({message: "Gagal menghapus detail report"})
    }
}