import { ObjectId } from "mongodb";

export default class Teachers {
    constructor(
        public _id: ObjectId,
        public nip: string,
        public nik: string,
        public name: string,
        public jenis_kelamin: string,
        public no_hp: string, // masih mau di taruh di collection user atau guru
        public alamat: string,
        public userId: ObjectId
    ) {}
}