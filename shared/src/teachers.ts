import { z } from "zod";

export const createTeacherSchema = z.object({
    userId: z.string().min(1),
    nip: z.string().length(18).regex(/^\d+$/,"NIP harus angka"),
    nik: z.string().length(16).regex(/^\d+$/,"NIK harus angka"),
    name: z.string().min(1),
    jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
    no_hp: z.string().min(1),
    alamat: z.string().min(1),
})

export const updateTeacherSchema = createTeacherSchema.omit({ userId: true }).partial();

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;

export interface Teacher {
    _id: string;
    userId: string;
    nip: string;
    nik: string;
    name: string;
    jenis_kelamin: "Laki-laki" | "Perempuan";
    no_hp: string;
    alamat: string;
}