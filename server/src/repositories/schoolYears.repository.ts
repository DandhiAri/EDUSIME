import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import SchoolYears from "../models/schoolYears";

export class SchoolYearRepository {
    private get collection() {
        return getDatabase().collection<SchoolYears>("schoolYear")
    }
    async findAll() {
        return await this.collection.find().toArray();
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(schoolYear: SchoolYears) {
        return await this.collection.insertOne(schoolYear)
    }
    async update(id: string, data: Partial<SchoolYears>) {
        return await this.collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: data}
        )
    }
    async delete(id: string) {
        return await this.collection.deleteOne({_id: new ObjectId(id)})
    }
    // tambakan fitur lain nya
}

export const schoolYearRepository = new SchoolYearRepository