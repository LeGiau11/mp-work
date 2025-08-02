import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "./helpers/verify-jwt";

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	console.log("pathname", pathname);

	if (pathname.startsWith("/api/auth/")) {
		console.log("pathname-2", pathname);
		return NextResponse.next();
	}
	console.log("pathname-3", pathname);
	const token = req.headers.get("authorization")?.replace("Bearer ", "");

	if (!token)
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

	try {
		const user = await verifyAccessToken(token);

		return NextResponse.next();
	} catch (err) {
		return NextResponse.json(
			{ message: "Invalid or expired token" },
			{ status: 401 },
		);
	}
}

export const config = {
	matcher: ["/api/:path*"],
};
