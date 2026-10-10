import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { teachersRepository } from "../repositories/teachers.repository";
import Teachers from "../models/teachers";

export async function createTeacher(req: Request, res: Response) {
    try {
        const {nip, nik, name, jenis_kelamin, no_hp, alamat, userId} = req.body;
        const teacher = new Teachers(
            new ObjectId(),
            nip,
            nik,
            name,
            jenis_kelamin,
            no_hp,
            alamat,
            userId
        );
        await teachersRepository.create(teacher);
        res.status(201).json({
            message: "Teacher created successfully",
            teacherId: teacher._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating teacher" });
    }
}

export async function getAllTeachers(req: Request, res: Response) {
    try {
        const teachers = await teachersRepository.findAll();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teachers" });
    }
}

export async function updateTeacher(req: Request, res: Response) {
    try {
        const {id} = req.params;
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid ID"
            })
        }
        const { nip, nik, name, jenis_kelamin, no_hp, alamat, userId } = req.body;
        const data: Partial<Teachers> = {
            nip,
            nik,
            name,
            jenis_kelamin,
            no_hp,
            alamat,
            userId
        };
        const result = await teachersRepository.update(id, data);
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        res.json({
            message: "Teacher updated successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating teacher" });
    }
}

export async function deleteTeacher(req: Request, res: Response) {
    try {
        const {id} = req.params;
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid ID"
            })
        }
        const result = await teachersRepository.delete(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }
        res.json({
            message: "Teacher deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting teacher" });
    }
}