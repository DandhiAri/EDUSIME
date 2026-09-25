import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { classroomRepository } from "../repositories/classroom.repository";
import { userRepository } from "../repositories/user.repository"; // Import user repository
import Classroom from "../models/classroom";

// 1. CREATE CLASSROOM
export async function createClassroom(req: Request, res: Response) {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: "Nama kelas wajib diisi" });
        }

        const newClassroom = new Classroom(name);
        const result = await classroomRepository.create(newClassroom);

        res.status(201).json({
            message: "Kelas berhasil dibuat",
            classroomId: result.insertedId
        });
    } catch (error) {
        console.error("Create Classroom Error:", error);
        res.status(500).json({ message: "Gagal membuat kelas" });
    }
}

export async function getClassrooms(req: Request, res: Response) {
    try {
        const classrooms = await classroomRepository.findAll();
        res.status(200).json({
            message: "Berhasil mengambil data semua kelas",
            data: classrooms
        });
    } catch (error) {
        console.error("Get Classrooms Error:", error);
        res.status(500).json({ message: "Gagal mengambil data kelas" });
    }
}

export async function getClassroomWithUsers(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Format ID kelas tidak valid" });
        }

        const classroom = await classroomRepository.findById(id);
        if (!classroom) {
            return res.status(404).json({ message: "Kelas tidak ditemukan" });
        }

        const users = await userRepository.findByClassId(id);

        res.status(200).json({
            message: "Berhasil mengambil data kelas dan siswa",
            data: {
                classroom: classroom,
                total_students: users.length,
                students: users
            }
        });
    } catch (error) {
        console.error("Get Classroom With Users Error:", error);
        res.status(500).json({ message: "Gagal mengambil data kelas detail" });
    }
}

export async function updateClassroom(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Format ID kelas tidak valid" });
        }

        const result = await classroomRepository.update(id, { name });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Kelas tidak ditemukan" });
        }

        res.status(200).json({ message: "Kelas berhasil diperbaharui" });
    } catch (error) {
        console.error("Update Classroom Error:", error);
        res.status(500).json({ message: "Gagal memperbaharui kelas" });
    }
}

// 5. DELETE CLASSROOM
export async function deleteClassroom(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Format ID kelas tidak valid" });
        }

        const result = await classroomRepository.delete(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Kelas tidak ditemukan" });
        }

        res.status(200).json({ message: "Kelas berhasil dihapus" });
    } catch (error) {
        console.error("Delete Classroom Error:", error);
        res.status(500).json({ message: "Gagal menghapus kelas" });
    }
}