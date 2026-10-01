import { ObjectId } from "mongodb";

export default class Subjects {
    constructor(
        public _id: ObjectId,
        public code: string,
        public name: string,
        public kkm: number,
    ) {}
}