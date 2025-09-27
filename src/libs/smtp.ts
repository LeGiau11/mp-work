import nodemailer, { Transporter } from "nodemailer";

import {
	ISmtpSendMailOptions,
	ISmtpSendMailTemplate,
	ResponseData,
} from "@/common";

class SMTPService {
	private transporter: Transporter;

	private compileTemplate(
		template: string,
		variables: Record<string, string>,
	): string {
		let output = template;

		for (const key in variables) {
			output = output.replace(new RegExp(`{{${key}}}`, "g"), variables[key]);
		}

		return output;
	}

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT) || 587,
			secure: process.env.SMTP_SECURE === "true",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	async sendMail({
		to,
		subject,
		text,
		html,
		attachments,
	}: ISmtpSendMailOptions): Promise<ResponseData<any>> {
		try {
			const info = await this.transporter.sendMail({
				from: `"${process.env.SMTP_FROM_NAME}"<${process.env.SMTP_FROM_EMAIL}>`,
				to,
				subject,
				text,
				html,
				attachments,
			});

			if (!info?.messageId) {
				return { status: 500, success: false, message: "Send mail failed" };
			}

			return { data: info?.messageId, status: 201, success: true, message: "" };
		} catch (error) {
			console.error(error);

			return { status: 500, success: false, message: "Send mail failed" };
		}
	}

	async sendTemplate({
		to,
		subject,
		template,
		variables,
	}: ISmtpSendMailTemplate) {
		const compiled = this.compileTemplate(template, variables);

		return this.sendMail({
			to,
			subject,
			html: compiled,
		});
	}

	async sendWithRetry(
		options: ISmtpSendMailOptions,
		retries = 3,
	): Promise<ResponseData<any>> {
		for (let attempt = 1; attempt <= retries; attempt++) {
			const result = await this.sendMail(options);

			if (result.success) return result;

			console.warn(`Retry ${attempt}/${retries}...`);
		}
		return { status: 500, success: false, message: "Max retries exceeded" };
	}
}

const smtpService = new SMTPService();
export default smtpService;
