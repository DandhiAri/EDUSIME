import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import Users from "../models/user";
import { updateUserSchema, createUserSchema } from "@shareit/shared"
import type { User as UserResponse } from "@shareit/shared"
import bcrypt from "bcrypt";

console.log(updateUserSchema)
function toUserResponse(user: Users): UserResponse {
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        number_phone: user.number_phone,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    }
}

export async function updateUser(req: Request, res: Response) {
    const {id} = req.params;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            message: "Id tidak valid"
        });
    }
    const parsed = updateUserSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details: parsed.error.flatten(),
        })
    }
    try {
        const result = await userRepository.update(id, {
            ...parsed.data,
            updatedAt: new Date(),
        });
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
    const parsed = createUserSchema.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            detais: parsed.error.flatten(),
        })
    }
    try {
        const {name, email, password, number_phone, role} = parsed.data;
        if (await userRepository.findByEmail(email)) {
            return res.status(409).json({ message: "Email sudah terdaftar" });
        }
        const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = new Users(
            new ObjectId(),
            name,
            email,
            hashPassword,
            number_phone,
            role
        );
        const result = await userRepository.create(user);
        res.status(201).json({
            message: "User berhasil dibuat",
            userId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: `Gagal membuat user ${error}` 
        })
    }
}

export async function getUsers(_req: Request, res: Response) {
    try {
        const users = await userRepository.findAll();
        res.status(200).json({
            message: "Data Semua Siswa",
            total_data : users.length,
            data: users.map(toUserResponse)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Gagal mengambil data user"
        })
    }
}

export async function getUserId(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "id tidak valid" })
    }
    try {
        const user = await userRepository.findById(id)
        if (!user) {
            return res.status(400).json({ message: "User tidak ditemukan" })
        }
        res.status(200).json({
            message: "Detail user",
            data: toUserResponse(user)
        })
    } catch (error) {
        
    }
}
export async function deleteUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Id tidak valid"
            });
        }
        const result = await userRepository.delete(id)
        if(result.deletedCount === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            })
        }
        res.status(200).json({
            message: "User berhasil dihapus"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Gagal menghapus user"
        })
    }
}