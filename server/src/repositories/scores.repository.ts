import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import Scores from "../models/scores";

export class ScoresRepository {
    private get collection() {
        return getDatabase().collection<Scores>("scores");
    }

    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        });
    }
    async create(scores: Scores) {
        return await this.collection.insertOne(scores);
    }
    async findAll() {
        return await this.collection.find().toArray();
    }
    async update(id: string, data: Partial<Scores>) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }
    async delete(id: string) {
        return await this.collection.deleteOne({
            _id: new ObjectId(id)
        });
    }

    // Tambahan function
    // ! nanti akan ditambahkan pembaharuan untuk mencari berdasarkan category
    async filter(scores: Partial<Scores>) {
        return await this.collection.find(scores).toArray();
    }
}

export const scoresRepository = new ScoresRepository();