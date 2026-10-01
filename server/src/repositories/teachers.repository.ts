import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Teachers from "../models/teachers";

export class TeachersRepository {
    private get collection() {
        return getDatabase().collection<Teachers>("teachers");
    }
    async findById(id: string) {
        return await this.collection.findOne(
            { _id: new ObjectId(id) }
        )
    }
    async create(teachers: Teachers) {
        return await this.collection.insertOne(teachers);
    }
    async findAll() {
        return await this.collection.find().toArray();
    }
    async update(id: string, data: Partial<Teachers>) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: data }
        )
    }
    async delete(id: string) {
        return await this.collection.deleteOne(
            { _id: new ObjectId(id)}
        )
    } 
}

export const teachersRepository = new TeachersRepository();