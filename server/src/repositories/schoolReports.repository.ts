import { Filter, ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import SchoolReport from "../models/schoolReport";

export interface SchoolReportFilter {
    studentId?: string,
    classroomId?: string,
    schoolYearsId?: string,
}

export class SchoolReportRepository {
    private get collection() {
        return getDatabase().collection<SchoolReport>("schoolReport")
    }
    async findAll(f: SchoolReportFilter) {
        const query : Filter<SchoolReport> = {}
        if(f.studentId) query.studentId = new ObjectId(f.studentId);
        if(f.classroomId) query.classroomId = new ObjectId(f.classroomId);
        if(f.schoolYearsId) query.schoolYearsId = new ObjectId(f.schoolYearsId);

        return await this.collection.find(query).toArray();
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(schoolReport: SchoolReport) {
        return await this.collection.insertOne(schoolReport)
    }
    async update(id: string, data: Partial<SchoolReport>) {
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

export const schoolReportRepository = new SchoolReportRepository