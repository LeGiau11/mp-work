import cookie from "cookie";
import { NextResponse } from "next/server";

import { REFRESH_TOKEN } from "@/common";

export async function GET() {
	const response = NextResponse.json({
		success: true,
		message: "OK",
		status: 200,
	});

	response.headers.append(
		"Set-Cookie",
		cookie.serialize(REFRESH_TOKEN, "", {
			httpOnly: true,
			path: "/",
			maxAge: 0, // xóa cookie
		}),
	);

	return response;
}
