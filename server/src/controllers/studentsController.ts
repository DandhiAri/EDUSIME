import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { studentsRepository } from "../repositories/students.repository";
import Students from "../models/students";

export async function viewCreateStudent(req: Request, res: Response) {
    res.render("client/src/views/students/createStudent", {
        title: "Create Student"
    });
}

export async function createStudent(req: Request, res: Response) {
    try {
        const {nis, nik, name, jenis_kelamin, no_hp, tanggal_lahir, tempat_lahir, agama, alamat, userId, classroomId} = req.body;
        const student = new Students(
            new ObjectId(),
            nis,
            nik,
            name,
            jenis_kelamin,
            tanggal_lahir,
            tempat_lahir,
            agama,
            no_hp,
            alamat,
            userId,
            classroomId
        );
        const result = await studentsRepository.create(student);
        res.status(201).json({
            message: "Student created successfully",
            studentId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating student"
        });
    }
}

export async function getAllStudents(req: Request, res: Response) {
    try {
        const students = await studentsRepository.findAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students"
        });
    }
}

export async function updateStudent(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            })
        }
        const {nis, nisn, name, jenis_kelamin, tanggal_lahir, tempat_lahir, agama, no_hp, alamat, userId, classroomId} = req.body;
        const data: Partial<Students> = {
            _id: new ObjectId(),
            nis,
            nisn,
            name,
            jenis_kelamin,
            tanggal_lahir,
            tempat_lahir,
            agama,
            no_hp,
            alamat,
            userId,
            classroomId
        };
        const result = await studentsRepository.update(id, data);
        res.json({
            message: "Student updated successfully",
            student: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating student"
        });
    }
}

export async function deleteStudent(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            })
        }
        const result = await studentsRepository.delete(id)
        res.json({
            message: "Student deleted successfully",
            student: result
        })

    } catch (error) {
        res.status(500).json({
            message: "Error deleting student"
        });
    }
}