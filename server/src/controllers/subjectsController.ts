import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { subjectsRepository } from "../repositories/subjects.repository";
import Subjects from "../models/subjects";

export async function viewCreateSubject(req: Request, res: Response) {
    res.render("client/src/views/subjects/createSubject", {
        title: "Create Subject"
    });
}
export async function createSubject(req: Request, res : Response) {
    try {
        const { code, name, kkm } = req.body
        const subject = new Subjects(
            new ObjectId(),
            code,
            name,
            kkm,
        )
        const result = await subjectsRepository.create(subject)
        res.status(201).json({
            message: "Subject created successfully",
            subjectId: result.insertedId
        })
    } catch (error) {
        res.json({
            message: "Error creating subject",
        })
    }
}

export async function getAllSubjects(res: Response) {
    try {
        const subjects = await subjectsRepository.findAll()
        res.status(200).json({
            message: "Berhasil mengambil data semua mata pelajaran",
            data: subjects
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching subjects"
        })
    }
}

export async function updateSubject(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid subject ID"
            })
        }
        const { code, name, kkm } = req.body
        const data: Partial<Subjects> = {
            code,
            name,
            kkm
        }
        const result = await subjectsRepository.update(id, data)
        res.status(200).json({
            message: "Subject updated successfully",
            data : result
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating subject"
        })
    }
}

export async function deleteSubject(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                messaage: "Invalid subject ID"
            })
        }
        const result = await subjectsRepository.delete(id);
        res.status(200).json({
            message: "Subject deleted successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting subject"
        })
    }
}

export async function filterSubjects(req: Request, res: Response) {
    try {
        const subjects = await subjectsRepository.filter(req.body)
        res.status(200).json({
            message: "Subjects filtered successfully",
            data: subjects
        })
    } catch (error) {
        res.status(500).json({
            message: "Error filtering subjects"
        })
    }
}