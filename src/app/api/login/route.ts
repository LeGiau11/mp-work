import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextResponse } from "next/server";
import { IResUser, PRODUCTION, REFRESH_TOKEN } from "@/common";
import GetUserService from "@/services/user/GetUserService";
import { generateAccessToken, generateRefreshToken } from "@/helpers";
import { HttpError, throwBadRequest } from "@/utils";

export async function POST(req: Request) {
	try {
		// Lấy body JSON từ request
		const { username, password } = await req.json();

		const user: IResUser | null = await GetUserService(username);

		if (!user) throwBadRequest();

		const isValidPassword = await bcrypt.compare(
			password,
			user?.password || "",
		);
		if (!isValidPassword) throwBadRequest();

		const accessToken = await generateAccessToken({ username });
		const refreshToken = await generateRefreshToken({ username });

		// Tạo response JSON
		const res = NextResponse.json(
			{ success: true, access: accessToken, refresh: refreshToken },
			{ status: 201 },
		);

		// Gắn refresh token vào cookie
		res.headers.append(
			"Set-Cookie",
			cookie.serialize(REFRESH_TOKEN, refreshToken, {
				httpOnly: true,
				path: "/",
				maxAge: 3 * 60, // 3 phút
				secure: process.env.NODE_ENV === PRODUCTION,
				sameSite: "strict",
			}),
		);

		return res;
	} catch (err) {
		const status = err instanceof HttpError ? err.statusCode : 500;
		const error = err instanceof HttpError ? err.error : "";
		const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";

		return NextResponse.json({ success: false, message, error }, { status });
	}
}
