import { disconnect } from "@/libs/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { Response } from "@/common";
import CheckExistUser from "@/services/user/CheckExistUserService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { username } = req.body;

		try {
			const data: Response<unknown> = await CheckExistUser(username);

			if (!data.success) return res.status(401).json({
				success: false,
				error: data.error,
			});

			const result: Response<unknown> = {
				success: true,
				message: data.message,
			};

			return res.status(200).json(result);
		} catch (ex) {
			console.log("Error->message:", ex);
			return res.status(500).json({
				message: ex instanceof Error ? ex.message : "Internal Server Error",
			});
		} finally {
			disconnect();
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
