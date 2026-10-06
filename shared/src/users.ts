import { z } from "zod";

export const roleSchema = z.enum(["admin","guru","siswa"])
export type Role = z.infer<typeof roleSchema>

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    number_phone: z.string().min(1),
    role: roleSchema,
})

export const updateUserSchema = createUserSchema.omit({ password: true }).partial();

export const loginSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8),
})
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

export interface User {
    _id: string
    name: string
    email: string
    number_phone: string
    role: Role
    createdAt: string
    updatedAt: string
}
