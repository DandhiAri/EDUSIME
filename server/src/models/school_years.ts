import { ObjectId } from "mongodb";

export default class SchoolYears {
    constructor(
        public _id: ObjectId,
        public tahun: string,
        public semester: string,
        public tanggal_mulai: Date,
        public tanggal_selesai: Date,
    ) {}
}