import { ObjectId } from "mongodb"

export default class Users {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public number_phone: string,
        public classId? : ObjectId,
    ) {}
}