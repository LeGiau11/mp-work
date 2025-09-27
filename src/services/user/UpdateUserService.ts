import { userDAO } from "@/dao/userDAO";

const UpdateUserService = async (id: string, data: { isActive: boolean }) => {
	try {
		if (!id || !data) return false;

		return await userDAO.updateUser(id, data);
	} catch (error) {
		return false;
	}
};

export default UpdateUserService;
