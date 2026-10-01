import { ObjectId } from "mongodb"
import { getDatabase } from "../config/database"
import Subjects from "../models/subjects";

export class SubjectsRepository {
    private get collection() {
        return getDatabase().collection<Subjects>("subjects");
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(subjects: Subjects) {
        return await this.collection.insertOne(subjects);
    }
    async findAll() {
        return await this.collection.find().toArray();
    }
    async update(id: string, data: Partial<Subjects>) {
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
    // Tambahan function
    // ! nanti akan ditambahkan pembaharuan untuk mencari berdasarkan category
    async filter(subjects: Partial<Subjects>) {
        return await this.collection.find(subjects).toArray();
    }
}

export const subjectsRepository = new SubjectsRepository();