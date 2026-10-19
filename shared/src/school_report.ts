import { z } from "zod"

export const createSchoolReportSchema = z.object({
    total_sakit: z.number().min(1),
    total_izin: z.number().min(1),
    total_alpha: z.number().min(1),
    catatan_wali_kelas: z.string().min(1),
    status: z.enum(["draft","final","cetak"]),
    studentId: z.string().min(1),
    classroomId: z.string().min(1),
    schoolYearsId: z.string().min(1),
})

export const updateSchoolReportSchema = createSchoolReportSchema.omit({classroomId: true,schoolYearsId: true,studentId: true}).partial();

export type CreateSchoolReportInput = z.infer<typeof createSchoolReportSchema>;
export type UpdateSchoolReportInput = z.infer<typeof updateSchoolReportSchema>;

export interface SchoolReport {
    _id : string,
    total_sakit: number,
    total_izin: number,
    total_alpha: number,
    catatan_wali_kelas: string,
    status: "draft" | "final" | "cetak",
    studentId: string,
    classroomId: string,
    schoolYearsId: string,
}