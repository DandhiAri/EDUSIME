import { ObjectId } from "mongodb";

export type Status = "" | "" | ""

export default class SchoolReport {
    constructor(
        public _id : ObjectId,
        public total_sakit : string,
        public total_izin : string,
        public total_alpha : string,
        public catatan_wali_kelas: string,
        public status : Status,
        public studentId : ObjectId,
        public classroomId : ObjectId,
        public schoolYearsId : ObjectId,
        public createdAt : Date = new Date(),
        public updatedAt : Date = new Date(),
    ) {}
}