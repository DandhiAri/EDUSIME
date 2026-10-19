import {z} from "zod"

export const createScoreSchema = z.object({
    studentId: z.string().min(1),
    subjectId: z.string().min(1),
    schoolYearId: z.string().min(1),
    jenis_nilai: z.string().min(1),
    nilai: z.number().min(1),
    tanggal: z.coerce.date(),
})

export const updateScoreSchema = createScoreSchema.omit({studentId: true,schoolYearId: true,subjectId: true});

export type CreateScoreInput = z.infer<typeof createScoreSchema>
export type UpdateScoreInput = z.infer<typeof updateScoreSchema>

export interface Score {
    _id: string,
    subjectId: string,
    schoolYearId: string,
    studentId: string,
    jenis_nilai: string,
    nilai: number,
    tanggal: string,
}