import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import { HttpError, sendCreated, throwUnauthorized } from "@/utils";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "@/helpers";
import { IDecode, PRODUCTION, REFRESH_TOKEN } from "@/common";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const cookies = cookie.parse(req.headers.cookie || "");
	const token = cookies.refreshToken;

	try {
		if (!token || typeof token !== "string") throwUnauthorized();

		const decoded = (await verifyRefreshToken(token as string)) as IDecode;

		if (decoded?.type !== "refresh") throw new Error("Invalid token type");

		const newAccessToken = await generateAccessToken({
			username: decoded.username,
		});
		const newRefreshToken = await generateRefreshToken({
			username: decoded.username,
		});

		res.setHeader(
			"Set-Cookie",
			cookie.serialize(REFRESH_TOKEN, newRefreshToken, {
				httpOnly: true,
				path: "/",
				maxAge: 3 * 60, //
				secure: process.env.NODE_ENV !== PRODUCTION,
				sameSite: "strict",
			}),
		);

		return sendCreated(res, newAccessToken);
	} catch (error) {
		const status = error instanceof HttpError ? error.statusCode : 500;
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res.status(status).json({ success: false, message, error });
	}
};

export default handler;
