import { IResUser } from "@/common";
import { userDAO } from "@/dao/userDAO";

export default async function GetUserService(
	username: string,
): Promise<IResUser | null> {
	if (!username) return null;
	return await userDAO.findUserInActive(username);
}
