import { ObjectId } from "mongodb";

export default class Scores {
    constructor(
        public _id: ObjectId,
        public studentId: ObjectId,
        public subjectId: ObjectId,
        public schoolYearId: ObjectId,
        public jenis_nilai: string,
        public nilai: number,
        public tanggal: Date,
    ) {}
}