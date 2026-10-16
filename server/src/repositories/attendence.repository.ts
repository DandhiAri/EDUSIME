import { Filter,ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Attendance from "../models/attendence";

export interface AttendenceFilter {
    classroomId?: string;
    studentId?: string;
    tanggal?: Date;
}

export class AttendenceRepository {
    private get collection() {
        return getDatabase().collection<Attendance>("attendence")
    }
    async findAll(f: AttendenceFilter) {
        const query: Filter<Attendance> = {};
        if(f.classroomId) query.classroomId = new ObjectId(f.classroomId);
        if(f.studentId) query.studentId = new ObjectId(f.studentId);
        if(f.tanggal) query.tanggal = f.tanggal
        
        return this.collection.find(query).sort({ tanggal: -1, createdAt: -1 }).toArray()
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