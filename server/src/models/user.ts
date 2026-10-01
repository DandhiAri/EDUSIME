import { ObjectId } from "mongodb"

export default class Users {
    constructor(
        public _id: ObjectId,
        public name: string,
        public email: string,
        public password: string,
        public number_phone: string,
        public role: string,
    ) {}
}