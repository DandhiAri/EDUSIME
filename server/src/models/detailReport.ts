import { ObjectId } from "mongodb";

export default class DetailReport {
    constructor(
        public _id: ObjectId,
        public schoolReportId: ObjectId,
        public subjectId: ObjectId,
        public nilai_tugas : number,
        public nilai_ulangan : number,
        public nilai_uts: number,
        public nilai_uas: number,
        public nilai_akhir: number,
        public predikat: string,
        public deskripsi: string,
    ){}
}