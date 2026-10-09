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
    const token = header.slice(7).trim().replace(/^"|"$/g, "");
    if (token.split(".").length !== 3) {
        return res.status(401).json({ message: "Format token tidak valid" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
        req.user = { id: payload.id, role: payload.role };
        next();
    } catch (err) {
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