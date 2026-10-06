import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@shareit/shared";

export interface AuthPayload {
    id: string;
    role: Role;
}

// Beri tahu TypeScript bahwa req.user ada
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    try {
        const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as AuthPayload;
        req.user = { id: payload.id, role: payload.role };
        next();
    } catch {
        res.status(401).json({ message: "Token tidak valid atau kedaluwarsa" });
    }
}

export function requireRole(...roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Anda tidak memiliki akses" });
        }
        next();
    };
}