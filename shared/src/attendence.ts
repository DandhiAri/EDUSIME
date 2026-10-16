import { z } from "zod";

export const createAttendenceSchema = z.object({
    studentId: z.string().min(1),
    classroomId: z.string().min(1),
    tanggal: z.coerce.date(),
    status: z.string().min(1),
    keterangan: z.string().min(1),  
})

export const updateAttendenceSchema = createAttendenceSchema.omit({studentId: true, classroomId: true}).partial();

export type CreateAttendenceInput = z.infer<typeof createAttendenceSchema>;
export type UpdateAttendenceInput = z.infer<typeof updateAttendenceSchema>;

export interface Attendence {
    _id : string;
    studentId: string;
    classroomId: string;
    tanggal: string;
    status: string;
    keterangan: string | null;
    createdAt: string;
    updatedAt: string;
}
// ya gitu lah ketikan gua mesti gini