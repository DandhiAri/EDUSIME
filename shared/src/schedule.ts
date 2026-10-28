import { z } from "zod"

export const createScheduleSchema = z.object({
    classroomId: z.string().min(1),
    subjectId: z.string().min(1),
    teacherId: z.string().min(1),
    day: z.enum(["senin", "selasa", "rabu", "kamis", "jumat","sabtu"]),
    start_time: z.string().min(4),
    end_time: z.string().min(4),
    room: z.string().min(1),
})

export const updateScheduleSchema = createScheduleSchema.omit({classroomId: true, subjectId: true, teacherId: true}).partial();

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;

export interface Schedule {
    _id: string,
    classroomId: string,
    subjectId: string,
    teacherId: string,
    day: "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu",
    start_time: string,
    end_time: string,
    room: string
}