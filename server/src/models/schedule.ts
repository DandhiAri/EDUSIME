import { ObjectId } from "mongodb";

export type days = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu"

export default class Schedule {
    constructor(
        public _id: ObjectId,
        public classroomId: ObjectId,
        public subjectId: ObjectId,
        public teacherId: ObjectId,
        public day: days,
        public start_time: string, // format data example : 07.30
        public end_time: string, // format data example : 07.30
        public room: string
    ){}
}