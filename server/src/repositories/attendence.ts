import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Attendance from "../models/attendence";

export class AttendenceRepository {
    private get collection() {
        return getDatabase().collection<Attendance>("attendence")
    }
    async findAll() {
        return await this.collection.find().toArray()
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(attendence: Attendance) {
        return await this.collection.insertOne(attendence)
    }
    async update(id: string, data: Partial<Attendance>) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        )
    }
    async delete(id: string) {
        return await this.collection.deleteOne({
            _id: new ObjectId(id)
        })
    }
}

export const attendenceRepository = new AttendenceRepository