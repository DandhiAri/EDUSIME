import { Filter, ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import DetailReport from "../models/detailReport";

export interface DetailReportFilter {
    schoolReportId?: string,
    subjectId?: string,
}

export class DetailReportRepository {
    private get collection() {
        return getDatabase().collection<DetailReport>("detailReport")
    }
    async findAll(f: DetailReportFilter) {
        const query : Filter<DetailReport> = {}
        if(f.schoolReportId) query.schoolReportId = new ObjectId(f.schoolReportId)
        if(f.subjectId) query .subjectId = new ObjectId(f.subjectId)
        
        return this.collection.find(query).toArray()
    }
    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        })
    }
    async create(detailReport: DetailReport) {
        return await this.collection.insertOne(detailReport)
    }
    async update(id: string, data: Partial<DetailReport>) {
        return await this.collection.updateOne(
            {_id: new ObjectId(id)},
            { $set: data }
        )
    }
    async delete(id: string) {
        return await this.collection.deleteOne({
            _id: new ObjectId(id)
        })
    }
    // tambahan fitur lain nya
}

export const detailReportRepository = new DetailReportRepository