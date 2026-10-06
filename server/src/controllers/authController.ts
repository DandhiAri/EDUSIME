import { Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@shareit/shared";
import type { User as UserResponse } from "@shareit/shared";
import { userRepository, UserRepository } from "../repositories/user.repository";
import type Users from "../models/user";

function toUserResponse(user: Users): UserResponse {
    const fallback = user._id.getTimestamp();
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        number_phone: user.number_phone,
        role: user.role,
        createdAt: (user.createdAt ?? fallback).toISOString(),
        updatedAt: (user.updatedAt ?? user.createdAt ?? fallback).toISOString(),
    }
}

export async function login(req:Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Data tidak valid",
            details : parsed.error.flatten()
        })
    }
    try {
        const { email,password } = parsed.data;
        const user = await userRepository.findByEmail(email);

        const valid = user && (await bcrypt.compare(password, user.password));
        if (!user || !valid) {
            return res.status(401).json({ message: "Email atau password salah" })
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT secret belum diatur")
        
        const token = jwt.sign(
            {id: user._id.toString(), role: user.role},
            secret,
            { expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions["expiresIn"]}
        )
        res.status(200).json({
            message: "Login berhasil",
            data: { user: toUserResponse(user), token }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Gagal Login"})
    }
}

// mengembalikan data user yang sedang login, berdasarkan toke yang dikirim.
// memulihkan sesi saat halaman di refresh
// menampilkan profil nama di navbar dan menentukan tampilan role yang sesuai
export async function me(req: Request, res: Response) {
    try {
        const user = await userRepository.findByEmail(req.user!.id)
        if(!user) return res.status(401).json({ message: "User tidak ditemukan" })
        res.json({ message: "Profil", data: toUserResponse(user) })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Gagal mengambil profile" })
    }
}