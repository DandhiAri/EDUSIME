import { ObjectId } from "mongodb";

export default class Attendance {
    constructor(
        public _id: ObjectId,
        public studentId: ObjectId,
        public classroomId: ObjectId,
        public tanggal: Date,
        public status: string,
        public keterangan: string,
    ) {}
}