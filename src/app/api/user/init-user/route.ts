import { NextResponse } from "next/server";

import CreateInitUser from "@/services/user/InitUserService";

export async function POST() {
	try {
		const data = await CreateInitUser();

		if (!data?.success) {
			return NextResponse.json({ message: data?.error }, { status: 401 });
		}

		return NextResponse.json(
			{ message: "Create user successfully!" },
			{ status: 200 },
		);
	} catch (ex) {
		return NextResponse.json(
			{
				message: ex instanceof Error ? ex.message : "Internal Server Error",
			},
			{ status: 500 },
		);
	}
}
