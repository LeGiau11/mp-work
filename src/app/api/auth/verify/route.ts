import { NextResponse } from "next/server";

import { verifyAccessToken } from "@/helpers";
import { HttpError } from "@/utils";
import CheckExistUser from "@/services/user/CheckExistUserService";
import UpdateUserService from "@/services/user/UpdateUserService";
import { IDecode } from "@/common";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get("token");

		if (!token) {
			return NextResponse.redirect(new URL("/404", process.env.PUBLIC_APP_URL));
		}

		const decoded = (await verifyAccessToken(token)) as IDecode;
		const { username, exp } = decoded;

		const currentTime = Math.floor(Date.now() / 1000);
		if (!exp || currentTime > exp) {
			return NextResponse.redirect(new URL("/404", process.env.PUBLIC_APP_URL));
		}

		const user = await CheckExistUser(username);
		if (!user) {
			return NextResponse.redirect(new URL("/404", process.env.PUBLIC_APP_URL));
		}

		if (user.isActive) {
			return NextResponse.redirect(
				new URL("/login", process.env.PUBLIC_APP_URL),
			);
		}

		const isSuccess = await UpdateUserService(user.id || "", {
			isActive: true,
		});

		if (!isSuccess) {
			return NextResponse.redirect(new URL("/404", process.env.PUBLIC_APP_URL));
		}

		return NextResponse.redirect(new URL("/login", process.env.PUBLIC_APP_URL));
	} catch (error) {
		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return NextResponse.json(
			{ success: false, message, error: err, status, data: null },
			{ status },
		);
	}
}
