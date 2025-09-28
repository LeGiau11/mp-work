import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

import { generateAccessToken } from "@/helpers";
import {
	HttpError,
	sendCreated,
	throwBadRequest,
	throwUnprocessableEntity,
} from "@/utils";
import { REGEX_PASSWORD } from "@/common";
import CreateUserServices from "@/services/user/CreateUserService";
import { RequestSignup } from "@/pages/signup/interface";
import smtpService from "@/libs/smtp";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { username, password } = req.body as RequestSignup;

		if (!username || !password) throwBadRequest("Invalid input");

		if (password.length > 24)
			throwUnprocessableEntity("Password not pass length");

		if (!REGEX_PASSWORD.test(password))
			throwUnprocessableEntity(
				"The password must be at least 8 characters long, including uppercase letters, lowercase letters, numbers, and special characters.",
			);

		const createUser = await CreateUserServices(req.body);

		if (!createUser) return throwBadRequest();

		const tokenVerify = await generateAccessToken({ username }, "24h");
		const verifyUrl = `${process.env.PUBLIC_APP_URL}/api/auth/verify?token=${tokenVerify}`;

		const templatePath = path.join(
			process.cwd(),
			"public",
			"templates",
			"template_mail_signup.html",
		);
		const createdAt = createUser?.createdAt;
		const formattedDate = createdAt
			? `${new Date(createdAt).getDate()}/${
					new Date(createdAt).getMonth() + 1
				}/${new Date(createdAt).getFullYear()}`
			: null;

		let htmlTemplate = fs.readFileSync(templatePath, "utf8");
		htmlTemplate = htmlTemplate
			.replace("{{first_name}}", createUser?.firstName || "")
			.replace("{{last_name}}", createUser?.lastName || "")
			.replace("{{url}}", verifyUrl)
			.replace("{{email}}", createUser.email || "")
			.replace("{{url_href}}", verifyUrl)
			.replace("{{username}}", createUser?.username || "")
			.replace("{{register_date}}", formattedDate || "")
			.replace("{{div_url}}", verifyUrl);

		const sendMail = await smtpService.sendMail({
			to: username,
			subject: "Activate your MP-Work account",
			html: htmlTemplate,
			attachments: [
				{
					filename: "logo_signup.png",
					path: path.join(process.cwd(), "public", "images", "logo_signup.png"),
					cid: "logo_cid",
				},
				{
					filename: "logo_facebook.png",
					path: path.join(
						process.cwd(),
						"public",
						"images",
						"logo_facebook.png",
					),
					cid: "logo_facebook_cid",
				},
				{
					filename: "logo_linkedin.png",
					path: path.join(
						process.cwd(),
						"public",
						"images",
						"logo_linkedin.png",
					),
					cid: "logo_linkedin_cid",
				},
				{
					filename: "logo_instagram.png",
					path: path.join(
						process.cwd(),
						"public",
						"images",
						"logo_instagram.png",
					),
					cid: "logo_instagram_cid",
				},
				{
					filename: "logo_twitter.png",
					path: path.join(
						process.cwd(),
						"public",
						"images",
						"logo_twitter.png",
					),
					cid: "logo_twitter_cid",
				},
			],
		});

		if (sendMail.status !== 201) {
			return throwBadRequest();
		}

		return sendCreated(res, { username }, "OK");
	} catch (err) {
		const status = err instanceof HttpError ? err.statusCode : 500;
		const error = err instanceof HttpError ? err.error : "";
		const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra";

		return res
			.status(status)
			.json({ success: false, message, error, status, data: null });
	}
};

export default handler;
