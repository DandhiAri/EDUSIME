import { z } from "zod"

export const createStudentSchema = z.object({
    nis: z.string().min(1),
    nisn: z.string().min(1),
    name: z.string().min(1),
    jenis_kelamin: z.enum(["Laki-laki","Perempuan"]),
    no_hp: z.string().min(12),
    alamat: z.string(),
    userId: z.string().min(1)
})

export const updateStudentSchema = createStudentSchema.omit({ userId: true }).partial()

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

export interface Student {
    _id: string
    userId: string,
    nis: string
    nisn: string
    name: string
    jenis_kelamin: "Laki-laki" | "Perempuan",
    no_hp: string,
    alamat: string,
}