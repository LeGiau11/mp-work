import { MongoClient, Db } from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const option = {};
let client: MongoClient | null = null;
let db: Db | null = null;
const DB_NAME = "mp_work";

export const connect = async (): Promise<Db> => {
	if (db) return db;

	console.log("creating connect...");

	if (!client) {
		client = new MongoClient(uri, option);
		console.log("waiting connect...");
		await client.connect();
		console.log("connect successfully!");
	}

	db = client.db(DB_NAME);
	return db;
};

export const disconnect = () => {
	if (!client) return;

	client.close();
	console.log("disconnected!");
	client = null;
	db = null;
};
