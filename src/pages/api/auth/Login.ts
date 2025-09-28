import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";

import { IResUser, PRODUCTION, REFRESH_TOKEN } from "@/common";
import GetUserService from "@/services/user/GetUserService";
import { generateAccessToken, generateRefreshToken } from "@/helpers";
import { HttpError, sendCreated, throwBadRequest } from "@/utils";

/**
 * Hàm  login
 *
 * @param req NextApiRequest
 * @param res NextApiResponse
 *
 * Step 1: Kiểm tra method đầu vào
 * Step 2: Lấy thông tin user theo input username
 * Step 3: Kiểm tra kết quả dữ liệu trả về
 * Step 4: Kiểm tra thông tin Password có trùng khớp không
 * Step 5: Tạo token
 * Step 6: Trả lại token
 *
 */
const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	console.log("Request method:", req.method);
	try {
		const { username, password } = req.body;

		const user: IResUser | null = await GetUserService(username);

		if (!user) throwBadRequest();

		let isValidPassword = false;

		if (user) isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) throwBadRequest();

		const accessToken = await generateAccessToken({ username });
		const refreshToken = await generateRefreshToken({ username });

		res.setHeader(
			"Set-Cookie",
			cookie.serialize(REFRESH_TOKEN, refreshToken, {
				httpOnly: true,
				path: "/",
				//maxAge: 7 * 24 * 60 * 60, // 7d
				maxAge: 3 * 60,
				secure: process.env.NODE_ENV !== PRODUCTION,
				sameSite: "strict",
			}),
		);

		return sendCreated(res, { access: accessToken, refresh: refreshToken });
	} catch (err) {
		const status = err instanceof HttpError ? err.statusCode : 500;
		const error = err instanceof HttpError ? err.error : "";
		const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";

		return res.status(status).json({ success: false, message, error });
	}
};

export default handler;
