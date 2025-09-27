import { IResUser } from "@/common";
import { userDAO } from "@/dao/userDAO";

export default async function GetUserService(
	username: string,
): Promise<IResUser | null> {
	let result: IResUser | null = null;

	if (!username) return null;

	try {
		return await userDAO.findUserInActive(username);
	} catch (ex) {
		console.log("ex", ex);
		return null;
	}
}
