import { z } from "zod"

const schoolYearBase = z.object({
    tahun: z.string().min(1),
    semester: z.string().min(1),
    tanggal_mulai: z.coerce.date(),
    tanggal_selesai: z.coerce.date(),
})
type Dates = { tanggal_mulai?: Date; tanggal_selesai?: Date };
const cekUrutan = (d: Dates, ctx: z.RefinementCtx) => {
    if (d.tanggal_mulai && d.tanggal_selesai && d.tanggal_selesai <= d.tanggal_mulai) {
        ctx.addIssue({
            code: "custom",
            message: "Tanggal selesai harus setelah tanggal mulai",
            path: ["tanggal_selesai"]
        });
    }
};
export const createSchoolYearSchema = schoolYearBase.superRefine(cekUrutan)
export const updateSchoolYearSchema = schoolYearBase.partial().superRefine(cekUrutan);

export type CreateSchoolYearInput = z.infer<typeof createSchoolYearSchema>;
export type UpdateSchoolYearInput = z.infer<typeof updateSchoolYearSchema>;

export interface SchoolYear {
    _id: string,
    tahun: string,
    tanggal_mulai: string,
    tanggal_selesai: string,
}