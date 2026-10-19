import { z } from "zod"

export const createClassroomSchema = z.object({
    name: z.string().min(1)
})

export const updateClassroomSchema = createClassroomSchema.partial();

export type CreateClassroomInput = z.infer<typeof createClassroomSchema>;
export type UpdateClassroomInput = z.infer<typeof updateClassroomSchema>;

export interface Classroom {
    _id: string,
    name: string,
}