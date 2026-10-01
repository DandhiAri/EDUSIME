import { ObjectId } from "mongodb";

export default class Students {
    constructor(
        public _id: ObjectId,
        public nis: string,
        public nisn: string,
        public name: string,
        public jenis_kelamin: string,
        public tanggal_lahir: Date,
        public tempat_lahir: string,
        public agama: string,
        public no_hp: string, // masih mau di taruh di collection user atau students
        public alamat: string,
        public userId: ObjectId,
        public classroomId: ObjectId,
    ) {}
}