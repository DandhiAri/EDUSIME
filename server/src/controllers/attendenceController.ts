import { ObjectId } from "mongodb";
import { Request,Response } from "express";
import { attendenceRepository } from "../repositories/attendence.repository";
import Attendence from "../models/attendence";
import { updateAttendenceSchema, createAttendenceSchema } from "@shareit/shared"
import type { Attendence as AttendenceResponse } from "@shareit/shared"

const startOfDay = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
const validId = (id: unknown): id is string => typeof id === "string" && ObjectId.isValid(id);
function toAttendenceResponse(attendence: Attendence): AttendenceResponse {
    return {
        _id: attendence._id.toString(),
        tanggal : attendence.tanggal.toISOString(),
        status : attendence.status,
        keterangan : attendence.keterangan,
        studentId : attendence.studentId.toString(),
        classroomId : attendence.classroomId.toString(),
        createdAt: attendence.createdAt.toISOString(),
        updatedAt: attendence.updatedAt.toISOString(),
    }
}

export async function getAttendence(req: Request, res: Response) {
    const { classroomId, studentId, tanggal } = req.query;
    if (classroomId !== undefined && !validId(classroomId)) {
        return res.status(400).json({message: "classroomId tidak valid"})
    }
    if (studentId !== undefined && !validId(studentId)) {
        return res.status(400).json({message: "studentId tidak valid"})
    }
    let day: Date | undefined;
    if (typeof tanggal === "string" && tanggal) {
        const parsed = new Date(tanggal);
        if (isNaN(parsed.getTime())) return res.status(400).json({message: "Tanggal tidak valid"});
        day = startOfDay(parsed)
    }
    try {
        const list = await attendenceRepository.findAll({
            ...(classroomId ? { classroomId } : {}),
            ...(studentId ? { studentId } : {}),
            ...(day ? { tanggal: day } : {}),
        });
        res.status(200).json({
            message: "Data absen",
            total_data: list.length,
            data: list.map(toAttendenceResponse),
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Gagal mengambil data absen"})
    }
}

export async function getAttendenceById(req: Request, res: Response) {
    const { id } = req.params;
    if(!id || Array.isArray(id)) return res.status(400).json({message: "Id tidak valid"});

    try {
        const item = await attendenceRepository.findById(id);
        if(!item) return res.status(404).json({ message: "Absen tidak ditemukan" });
        res.json({message: "Detail absen", data: toAttendenceResponse(item)})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Gagal mengambil absen" })
    }
}

export async function updateAttendence(req: Request, res: Response) {
    const {id} = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Id tidak valid" })
    }
    const parsed = updateAttendenceSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten()
        })
    }
    try {
        const { tanggal, ...rest } = parsed.data
        const result = await attendenceRepository.update(id, {
            ...rest,
            ...(tanggal !== undefined ? { tanggal: startOfDay(tanggal)} : {}),
            updatedAt: new Date(),
        });
        if (result.matchedCount === 0) return res.status(404).json({message: "Absen tidak ditemukan"})
        res.json({ message: "Absen berhasil diperbaharui"})
    } catch (error) {
        res.status(500).json({message: "Gagal memperbaharui absen"})
    }
}

export async function createAttendence(req:Request, res: Response) {
    const parsed = createAttendenceSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten(),
        })
    }
    try {
        const { studentId,classroomId,tanggal,status,keterangan } = parsed.data;
        if (!ObjectId.isValid(studentId) || ObjectId.isValid(classroomId)) {
            return res.status(400).json({ message: "Id siswa atau kelas tidak valid" });
        }
        const attendence = new Attendence(
            new ObjectId(),
            new ObjectId(studentId),
            new ObjectId(classroomId),
            startOfDay(tanggal),
            status,
            keterangan ?? "",
        )
        await attendenceRepository.create(attendence)
        res.status(201).json({
            message: "Absen berhasil di buat",
            data : toAttendenceResponse(attendence)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Gagal membuat absen" })
    }
}

export async function deleteAttendence(req: Request, res: Response) {
    const { id } = req.params;
    if(!id || Array.isArray(id)) return res.status(400).json({ message: "Id tidak valid" })
    try {
        const result = await attendenceRepository.delete(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Absen tidak ditemukan" });
        }
        res.json({ message: "Absen berhasil dihapus" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Gagal menghapus absen" })
    }
}