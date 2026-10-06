import { ObjectId } from "mongodb"

export type Role = "admin" | "guru" | "siswa"
export default class Users {
    constructor(
        public _id: ObjectId,
        public name: string,
        public email: string,
        public password: string,
        public number_phone: string,
        public role: Role,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) {}
}