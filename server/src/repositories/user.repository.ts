import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database";
import User from "../models/user"

export class UserRepository {
    private get collection() {
        return getDatabase().collection<User>("users");
    }

    async findAll() {
        return await this.collection.find().toArray();
    }

    async findById(id: string) {
        return await this.collection.findOne({
            _id: new ObjectId(id)
        });
    }

    async create(user: User) {
        return await this.collection.insertOne(user);
    }

    async update(id: string, data: Partial<User>) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id)},
            { $set: data }
        );
    }
    async delete(id: string) {
        return await this.collection.deleteOne({
            _id: new ObjectId(id)
        })
    }
    async findByClassId(classId: string) {
        return await this.collection.find({
            classId: new ObjectId(classId)
        }).toArray();
    }
}

export const userRepository = new UserRepository();