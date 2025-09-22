import { WithId, Document } from "mongodb";

import { Response, User } from "@/common";
import { connect } from "@/libs/mongodb";

/**
 *
 * CheckExistUser
 *
 * @param username {string}
 * @returns {Promise<Response<unknown>>}
 *
 * Step 1: lấy danh sách user có trong hệ thống
 * Step 2: tìm trong danh sách có tồn tại user này không
 * Step 3: Nếu tìm thấy thì trả về đã tồn tại và ngược lại
 */
const CheckExistUser = async (username: string): Promise<User | null> => {
	const db = await connect();

	let result: User | null = null;

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

		const user = users.find((x) => x.username === username);

		if (user) result = { ...user };
	} catch (ex) {
		console.log("ex", ex);
	} finally {
		return result;
	}
};

export default CheckExistUser;
