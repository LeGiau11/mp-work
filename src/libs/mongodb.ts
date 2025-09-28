import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const option = {};
let client: MongoClient | null = null;
let db: Db | null = null;
const DB_NAME = process.env.DB_NAME;

export const connect = async (): Promise<Db> => {
	if (db) return db;

	if (!client) {
		client = new MongoClient(uri, option);
		await client.connect();
	}

	db = client.db(DB_NAME);
	return db;
};

export const disconnect = () => {
	if (!client) return;

	client.close();

	client = null;
	db = null;
};
