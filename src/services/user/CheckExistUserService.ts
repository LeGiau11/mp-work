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
const CheckExistUser = async (username: string): Promise<Response<unknown>> => {
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

		const isExsit = users.find((x) => x.username === username);

		const result: Response<unknown> = isExsit
			? {
					success: false,
					error: `Đã tồn tại user: ${username} này trong hệ thống`,
					message: "Not OK.",
			  }
			: { success: true, message: "Ok" };

		return result;
	} catch (ex) {
		console.log("ex", ex);

		const result: Response<unknown> = {
			success: false,
			error: "Lỗi khi kiểm tra user",
		};

		return result;
	}
};

export default CheckExistUser;
