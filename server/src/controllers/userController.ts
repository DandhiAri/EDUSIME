import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import Users from "../models/user";
import bcrypt from "bcrypt";

export async function updateUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const {name,email,number_phone,classId} = req.body
        const data: any = {
            name,
            email,
            number_phone
        }
        if (classId) {
            data.classId = new ObjectId(classId);
        }
        const result = await UserRepository.update(id, data);
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        res.json({
            message: "User berhasil diperbaharui"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal memperbaharui user"
        })
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const {name, email,password,number_phone,classId} = req.body;
        if (ObjectId.isValid(classId)) {
            return res.status(404).json({
                message: "Id tidak valid"
            })
        }
        const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = new Users(
            name,
            email,
            hashPassword,
            number_phone,
            classId ? new ObjectId(classId) : undefined
        );
        const result = await UserRepository.create(user);
        res.status(201).json({
            message: "User berhasil dibuat",
            userId: result.insertedId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal membuat user"
        })
    }
}