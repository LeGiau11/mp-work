import { IResUser } from "@/common";
import { userDAO } from "@/dao/userDAO";

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
const CheckExistUser = async (username: string): Promise<IResUser | null> => {
	let result: IResUser | null = null;

	if (!username) return null;

	result = await userDAO.findUserByUserName(username);

	return result;
};

export default CheckExistUser;
