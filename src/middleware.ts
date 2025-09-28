import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (pathname.startsWith("/api/auth/")) {
		return NextResponse.next();
	}

	const token = req.headers.get("authorization")?.replace("Bearer ", "");

	if (!token)
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

	try {
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
