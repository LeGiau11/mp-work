import { NextResponse } from "next/server";
import cookie from "cookie";

import {
	HttpError,
	InternalServerError,
	sendCreated,
	throwUnauthorized,
} from "@/utils";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "@/helpers";
import { IDecode, PRODUCTION, REFRESH_TOKEN } from "@/common";

export async function POST(req: Request) {
	const cookies = cookie.parse(req.headers.get("cookie") || "");
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

		const response = NextResponse.json(
			{
				success: true,
				data: newAccessToken,
				status: 201,
				message: "Created",
			},
			{ status: 201 },
		);

		response.headers.append(
			"Set-Cookie",
			cookie.serialize(REFRESH_TOKEN, newRefreshToken, {
				httpOnly: true,
				path: "/",
				maxAge: 3 * 60, //
				secure: process.env.NODE_ENV !== PRODUCTION,
				sameSite: "strict",
			}),
		);

		return sendCreated(newAccessToken);
	} catch (error) {
		const status = error instanceof HttpError ? error.statusCode : 500;
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return InternalServerError(status, message);
	}
}
