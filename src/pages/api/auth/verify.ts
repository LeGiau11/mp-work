import { NextApiRequest, NextApiResponse } from "next";

import { verifyAccessToken } from "@/helpers";
import { HttpError } from "@/utils";
import CheckExistUser from "@/services/user/CheckExistUserService";
import UpdateUserService from "@/services/user/UpdateUserService";
import { IDecode } from "@/common";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { token } = req.query;

		if (!token)
			return res.redirect(
				new URL("/404", process.env.PUBLIC_APP_URL).toString(),
			);

		const decoded = (await verifyAccessToken(token as string)) as IDecode;

		const { username, exp } = decoded;

		// Lấy current time tính bằng giây, exp cung tinh bang giay
		const currentTime = Math.floor(Date.now() / 1000);

		console.log(exp, "exp");
		console.log(currentTime, "currentTime");

		if (!exp || currentTime > exp) {
			return res.redirect(
				new URL("/404", process.env.PUBLIC_APP_URL).toString(),
			);
		}

		const user = await CheckExistUser(username);

		if (!user) {
			return res.redirect(
				new URL("/404", process.env.PUBLIC_APP_URL).toString(),
			);
		}

		if (user.isActive) {
			return res.redirect(
				new URL("/login", process.env.PUBLIC_APP_URL).toString(),
			);
		}

		const isSuccess = await UpdateUserService(user.id || "", {
			isActive: true,
		});

		if (!isSuccess) {
			return res.redirect(
				new URL("/404", process.env.PUBLIC_APP_URL).toString(),
			);
		}

		res.redirect(new URL("/login", process.env.PUBLIC_APP_URL).toString());
	} catch (error) {
		let status = error instanceof HttpError ? error.statusCode : 500;
		const errorNew = error instanceof HttpError ? error.error : "";
		let message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res
			.status(status)
			.json({ success: false, message, error: errorNew, status, data: null });
	}
};

export default handler;
