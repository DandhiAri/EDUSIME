import { Filter, ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Schedule from "../models/schedule";

export interface ScheduleFilter {
    classroomId?: string,
    subjectId? : string,
    teacherId : string
}

export class ScheduleRepository {
    private get collection() {
        return getDatabase().collection<Schedule>("schedule")
    }
    async findAll(f: ScheduleFilter) {
        const query : Filter<Schedule> = {}
        if(f.classroomId) query.classroomId = new ObjectId(f.classroomId);
        if(f.subjectId) query.classroomId = new ObjectId(f.subjectId);
        if(f.teacherId) query.classroomId = new ObjectId(f.teacherId);

        return await this.collection.find(query).toArray()
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(schedule: Schedule) {
        return await this.collection.insertOne(schedule)
    }
    async update(id: string, data: Partial<Schedule>) {
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
    // tambahkan fitur lain nya
}

export const scheduleRepository = new ScheduleRepository