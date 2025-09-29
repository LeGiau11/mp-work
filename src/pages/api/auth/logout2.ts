import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import { REFRESH_TOKEN } from "@/common";
import { sendOk } from "@/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize(REFRESH_TOKEN, "", {
			httpOnly: true,
			path: "/",
			maxAge: 0, // xóa cookie
		}),
	);

	return sendOk({}, "OK");
};
export default handler;
