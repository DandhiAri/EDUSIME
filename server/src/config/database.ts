import { MongoClient, Db } from "mongodb";

const client = new MongoClient(
  process.env.MONGODB_URI as string
);

let database: Db;

export async function connectDatabase(): Promise<void> {
  try {
    await client.connect();

    database = client.db(
      process.env.MONGODB_DB
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error
    );

    process.exit(1);
  }
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error(
      "Database belum terkoneksi"
    );
  }

  return database;
}