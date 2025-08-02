import { WithId, Document } from "mongodb";
import bcrypt from "bcrypt";

import { User } from "@/models/User";
import { Response } from "@/common";
import { connect } from "@/libs/mongodb";

/**
 * Create Init User
 *
 * @param password string
 *
 * Step 1: connect with database and collection
 * Step 2: check collection user is Exsit
 * Step 3: if no exsit then create init user
 *
 * @returns {success, message}
 */
const initUser = async (password: string): Promise<Response<User>> => {
	const db = await connect();

	try {
		const userCollection = db.collection("users");
		if (!userCollection) throw new Error("User's table not found");

		const data: WithId<Document>[] = await userCollection.find().toArray();

		const users: User[] = data.map((user) => {
			return {
				id: user._id.toString(),
				username: user.username,
				password: user.password,
				isActive: user.isActive,
				name: user.name,
				remember: false,
			};
		});

		const isExsit = users.find((x) => x.username === "admin@mpwork");

		if (!isExsit) {
			const hashedPassword = await bcrypt.hash(password, 10);

			const initUser: User = {
				username: "admin@mpwork",
				password: hashedPassword,
				isActive: true,
				name: "Administrator",
			};

			await userCollection.insertOne(initUser);
		}

		const result: Response<User> = { success: true, message: "Ok" };

		return result;
	} catch (ex) {
		console.log("ex", ex);
		const result: Response<User> = {
			success: false,
			error: "Create user is Failure",
		};
		return result;
	}
};

export default initUser;
