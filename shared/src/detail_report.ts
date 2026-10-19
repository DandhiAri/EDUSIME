import { z } from "zod"

export const createDetailReportSchema = z.object({
    nilai_tugas: z.number().min(1),
    nilai_ulangan: z.number().min(1),
    nilai_uts: z.number().min(1),
    nilai_uas: z.number().min(1),
    nilai_akhir: z.number().min(1),
    predikat: z.string().min(1),
    deskripsi: z.string().min(1),
    schoolReportId: z.string().min(1),
    subjectId: z.string().min(1)
})

export const updateDetailReportSchema = createDetailReportSchema.omit({schoolReportId: true, subjectId: true})

export type CreateDetailReportInput = z.infer<typeof createDetailReportSchema>
export type UpdateDetailReportInput = z.infer<typeof updateDetailReportSchema>

export interface DetailReport {
    _id: string,
    nilai_tugas: number,
    nilai_ulangan: number,
    nilai_uts: number,
    nilai_uas: number,
    nilai_akhir: number,
    predikat: string,
    deskripsi: string,
    schoolReportId: string,
    subjectId: string,
}