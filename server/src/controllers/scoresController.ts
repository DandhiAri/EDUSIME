import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { scoresRepository } from "../repositories/scores.repository";
import Scores from "../models/scores";

export async function viewCreateScore(req: Request, res: Response) {
    res.render("client/src/views/scores/createScore", {
        title: "Create Score"
    });
}
export async function createScore(req: Request, res: Response) {
    try {
        const { studentId, subjectId, schoolYearId, jenis_nilai, nilai, tanggal } = req.body;
        const scores = await scoresRepository.create({
            studentId,
            subjectId,
            schoolYearId,
            jenis_nilai,
            nilai,
            tanggal
        });
        res.status(201).json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error creating score" });
    }
}

export async function getAllScores(req: Request, res: Response) {
    try {
        const scores = await scoresRepository.findAll();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scores" });
    }
}

export async function updateScore(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid score ID"
            })
        }
        const { studentId, subjectId, schoolYearId, jenis_nilai, nilai, tanggal } = req.body;
        const data: Partial<Scores> = {
            studentId,
            subjectId,
            schoolYearId,
            jenis_nilai,
            nilai,
            tanggal
        }
        const scores = await scoresRepository.update(id, data);
        res.status(200).json({
            message: "Score updated successfully",
            data: scores
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating score" });
    }
}
export async function deleteScore(req: Request, res: Response) {
    try {
        const {id} = req.params
        if(!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid score ID"
            })
        }
        const scores = await scoresRepository.delete(id);
        res.status(200).json({
            message: "Score deleted successfully",
            data: scores
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting score" });
    }
}