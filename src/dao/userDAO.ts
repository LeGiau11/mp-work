import { User } from "@/common";
import { connect } from "@/libs/mongodb";

export const userDAO = {
	async insert(user: User) {
		const db = await connect();
		const collection = db.collection("users");
		const result = await collection.insertOne(user);
		return { ...user, id: result.insertedId.toString() };
	},
	async findUserByUserName(username: string) {
		const db = await connect();
		return db.collection("users").findOne({ username });
	},
};
