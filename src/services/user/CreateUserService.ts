import { Crypt } from "@/utils/crypt";
import { RequestSignup } from "@/pages/signup/interface";
import { userDAO } from "@/dao/userDAO";
import { throwConflict } from "@/utils";
import { User } from "@/models/User";

const CreateUserServices = async (data: RequestSignup) => {
	const { username, password } = data;
	const findUser = await userDAO.findUserByUserName(username);

	if (!!findUser) throwConflict(`Is exist user ${username} in system`);

	const crypt = new Crypt();
	const hashPass = await crypt.encode(password);

	const userData: User = {
		...data,
		password: hashPass,
		isActive: false,
		remember: false,
		createdBy: "",
		createdAt: new Date(),
		updatedBy: "",
		updatedAt: new Date(),
	};

	return await userDAO.insert(userData);
};

export default CreateUserServices;
