import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface Option {
	value: string;
	label: string;
}

export interface ResponseData<T> {
	success?: boolean;
	data?: T;
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
