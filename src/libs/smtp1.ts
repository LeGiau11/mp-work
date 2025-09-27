import sgMail, { MailDataRequired } from "@sendgrid/mail";
import {
	ISendGridSendMailOptions,
	ISmtpSendMailTemplate,
	ResponseData,
} from "@/common";
type MailContent = {
	type: "text/plain" | "text/html";
	value: string;
};
class SendGridService {
	constructor() {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
	}

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

	async sendMail({
		to,
		subject,
		text,
		html,
		attachments,
	}: ISendGridSendMailOptions): Promise<ResponseData<any>> {
		try {
			const content: MailContent[] & { 0: MailContent } =
				html && text
					? ([
							{ type: "text/plain", value: text },
							{ type: "text/html", value: html },
					  ] as const)
					: html
					? ([{ type: "text/html", value: html }] as const)
					: ([{ type: "text/plain", value: text || "" }] as const);

			const msg: MailDataRequired = {
				to,
				from: {
					name: process.env.SENDGRID_FROM_NAME || "No-Reply",
					email: process.env.SENDGRID_FROM_EMAIL || "",
				},
				subject,
				content,
				attachments,
			};

			const [response] = await sgMail.send(msg);

			return {
				data: null,
				status: response.statusCode,
				success: true,
				message: "",
			};
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
		options: ISendGridSendMailOptions,
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

const smtpService = new SendGridService();
export default smtpService;
