import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Classroom from "../models/classroom";

export class ClassroomRepository {
    private get collection() {
        return getDatabase().collection<Classroom>("classroom");
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(classroom: Classroom) {
        return await this.collection.insertOne(classroom);
    }
    async update(id: string, data: Partial<Classroom>) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: data }
        )
    }
    async delete(id:string) {
        return await this.collection.deleteOne({
            _id: new ObjectId(id)
        })
    }
}

export const classroomRepository = new ClassroomRepository();