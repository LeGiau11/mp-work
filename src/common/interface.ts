import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface Option {
	value: string;
	label: string;
}

export interface ResponseData<T> {
	success?: boolean;
	data?: T | null;
	error?: string;
	message?: string;
	status?: number;
}

export interface Response<T> extends Omit<ResponseData<T>, "data"> {
	isError?: boolean;
}

export interface InputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {}
export interface User {
	username: string;
	password: string;
}

export interface ISmtpSendMailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
	attachments?: { filename: string; path: string; cid?: string }[];
}

export interface ISmtpSendMailTemplate {
	to: string;
	subject: string;
	template: string;
	variables: Record<string, string>;
}

export interface ISendGridSendMailOptions {
	to: string | string[];
	subject: string;
	text?: string;
	html?: string;
	attachments?: {
		content: string;
		filename: string;
		type?: string;
		disposition?: string;
	}[];
}
