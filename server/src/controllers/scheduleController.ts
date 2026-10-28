import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { scheduleRepository } from "../repositories/schedules.repository";
import Schedule from "../models/schedule";
import { updateScheduleSchema, createScheduleSchema } from "@shareit/shared";
import type { Schedule as ScheduleResponse } from "@shareit/shared";

const validId = (id: unknown): id is string => typeof id === "string" && ObjectId.isValid(id);

function toScheduleResponse(schedule: Schedule) : ScheduleResponse {
    return {
        _id: schedule._id.toString(),
        classroomId: schedule.classroomId.toString(),
        subjectId: schedule.subjectId.toString(),
        teacherId: schedule.teacherId.toString(),
        day: schedule.day,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        room: schedule.room,
    }
}

export async function getSchedule(req: Request, res: Response) {
    const { classroomId, subjectId, teacherId } = req.body;
    if (subjectId !== undefined && !validId(subjectId)) {
        return res.status(400).json({message: "subjectId tidak valid"})
    }
    if (classroomId !== undefined && !validId(classroomId)) {
        return res.status(400).json({message: "classroomId tidak valid"})
    }
    if (teacherId !== undefined && !validId(teacherId)) {
        return res.status(400).json({message: "teacherId tidak valid"})
    }
    try {
        const list = await scheduleRepository.findAll({
            ...(classroomId ? {classroomId} : {}),
            ...(subjectId ? {subjectId} : {}),
            ...(teacherId ? {teacherId} : {}),
        });
        res.status(200).json({
            message: "Data Jadwal",
            total_data: list.length,
            data: list.map(toScheduleResponse)
        })
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data jadwal" });
    }
}

export async function getScheduleById(req: Request, res: Response) {
    const { id } = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const item = await scheduleRepository.findById(id);
        if(!item) return res.status(404).json({message: "Jadwal tidak ditemukan"});
        res.json({message: "Jadwal", data: toScheduleResponse(item)})
    } catch (error) {
        res.status(500).json({message: "gagal mengambil jadwal"})
    }
}

export async function updateSchedule(req: Request, res: Response) {
    const { id } = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    const parsed = updateScheduleSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten()
        })
    }
    try {
        const { ...rest } = parsed.data;
        const result = await scheduleRepository.update(id,{
            ...rest
        })
        if(result.matchedCount === 0) return res.status(404).json({message: "jadwal tidak ditemukan"});
        res.json({ message: "Jadwal berhasil diperbaharui" });
    } catch (error) {
        res.status(500).json({message: "Gagal memperbaharui jadwal"})
    }
}

export async function createSchedule(req: Request, res: Response) {
    const parsed = createScheduleSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({message: "Data tidak valid", details: parsed.error.flatten()});
    try {
        const { classroomId, subjectId, teacherId, day, start_time, end_time, room } = parsed.data;
        if(!ObjectId.isValid(classroomId) || !ObjectId.isValid(classroomId) || !ObjectId.isValid(classroomId)) return res.status(400).json({message: "Data tidak valid"});
        const schedule = new Schedule(
            new ObjectId(),
            new ObjectId(classroomId),
            new ObjectId(subjectId),
            new ObjectId(teacherId),
            day,
            start_time,
            end_time,
            room
        )
        await scheduleRepository.create(schedule);
        res.status(201).json({
            message: "Jadwal berhasil di buat",
            data: toScheduleResponse(schedule)
        })
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat jadwal" });
    }
}

export async function deleteSchedule(req: Request, res: Response) {
    const { id } = req.params;
    if(!validId(id)) return res.status(400).json({message: "id tidak valid"});
    try {
        const result = await scheduleRepository.delete(id);
        if(result.deletedCount === 0) return res.status(404).json({ message: "Jadwal tidak ditemukan" });
        res.json({ message: "Detail report berhasil dihapus" })
    } catch (error) {
        res.status(500).json({message: "Gagal menghapus jadwal"})
    }
}