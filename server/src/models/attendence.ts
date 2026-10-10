import { ObjectId } from "mongodb";

export default class Attendence {
    constructor(
        public _id: ObjectId,
        public studentId: ObjectId,
        public classroomId: ObjectId,
        public tanggal: Date,
        public status: string,
        public keterangan: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) {}
}