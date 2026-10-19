import { ObjectId } from "mongodb";

export type Status = "draft" | "final" | "cetak"

export default class SchoolReport {
    constructor(
        public _id : ObjectId,
        public total_sakit : number,
        public total_izin : number,
        public total_alpha : number,
        public catatan_wali_kelas: string,
        public status : Status,
        public studentId : ObjectId,
        public classroomId : ObjectId,
        public schoolYearsId : ObjectId,
        public createdAt : Date = new Date(),
        public updatedAt : Date = new Date(),
    ) {}
}