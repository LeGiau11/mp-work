import { NextApiRequest, NextApiResponse } from "next";

import { post, get } from "@/helpers";
import CheckExistUser from "@/services/user/CheckExistUserService";
import {
	HttpError,
	sendCreated,
	throwBadRequest,
	throwConflict,
	throwUnprocessableEntity,
} from "@/utils";
import { REGEX_PASSWORD, User } from "@/common";
import CreateUserServices from "@/services/user/CreateUserService";
import { RequestSignup } from "@/pages/signup/interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { username, password } = req.body as RequestSignup;

		if (!username || !password) throwBadRequest("Invalid input");

		if (password.length > 24)
			throwUnprocessableEntity("Password not pass length");

		if (!REGEX_PASSWORD.test(password))
			throwUnprocessableEntity(
				"The password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters.",
			);

		const createUser = await CreateUserServices(req.body);

		return sendCreated(res, createUser);
	} catch (err) {
		let status = err instanceof HttpError ? err.statusCode : 500;
		const error = err instanceof HttpError ? err.error : "";
		let message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";

		return res.status(status).json({ success: false, message, error, status });
	}
};

export default handler;
