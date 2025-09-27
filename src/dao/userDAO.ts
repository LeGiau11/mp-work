import { ObjectId } from "mongodb";

import { IResUser, User as UserInput } from "@/common";
import { connect } from "@/libs/mongodb";
import { User as UserDB } from "@/models/User";

export const userDAO = {
	async insert(user: UserInput): Promise<IResUser> {
		const db = await connect();
		console.warn("...... dang tien hanh tao du lieu");
		const collection = db.collection<UserDB>("users");
		const result = await collection.insertOne(user);
		console.warn("...... da tao du lieu");
		return { ...user, id: result.insertedId.toString() };
	},
	async findUserByUserName(username: string): Promise<IResUser | null> {
		const db = await connect();
		console.warn("...... dang tim thong tin yeu cau");
		const user = await db.collection<UserDB>("users").findOne({ username });
		console.warn("...... da tim duoc thong tin yeu cau");
		if (!user) return null;

		const { _id, ...rest } = user;
		return { ...rest, id: _id.toString() };
	},
	async updateUser<T extends Partial<UserDB>>(id: string, userData: T) {
		const db = await connect();
		console.warn("...... dang tien hanh cap nhat du lieu");
		if (Object.keys(userData).length === 0) return false;

		const result = db.collection<UserDB>("users").updateOne(
			{
				_id: new ObjectId(id),
			},
			{
				$set: userData,
			},
		);
		console.warn("...... da cap nhat du lieu");
		return (await result).modifiedCount > 0;
	},
	async findUserInActive(username: string): Promise<IResUser | null> {
		const db = await connect();
		console.warn("...... dang tim thong tin yeu cau");
		const user = await db
			.collection<UserDB>("users")
			.findOne({ username, isActive: true });
		console.warn("...... da tim duoc thong tin yeu cau");
		if (!user) return null;
		const { _id, ...rest } = user;
		return { ...rest, id: _id.toString() };
	},
};
