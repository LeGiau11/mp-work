import { ResponseData } from "@/common";
import { NextResponse } from "next/server";

export class HttpError extends Error {
	statusCode: number;
	error: string;

	constructor(message: string, statusCode: number, error: string) {
		super(message);
		this.name = "HttpError";
		this.statusCode = statusCode;
		this.error = error;
	}
}

/**
 *
 * sendOk
 *
 * use: when api successfully
 *
 * @param res NextApiResponse
 * @param data T
 * @param message Success
 * @param error Success
 * @returns {NextResponse}
 */
export const sendOk = <T>(
	data: T,
	message = "Success",
	error = "Success",
): NextResponse<ResponseData<T>> => {
	const value: ResponseData<T> = {
		status: 200,
		data,
		message,
		error,
	};

	return NextResponse.json(value);
};

/**
 *
 * sendCreated
 *
 * use: api have method POST / POST / PATCH when return content
 *
 * @param res NextApiResponse
 * @param data T
 * @param message "Created"
 * @param error "Created"
 * @returns {NextResponse}
 */
export const sendCreated = <T>(
	data: T,
	message = "Created",
	error = "Created",
): NextResponse<ResponseData<T>> => {
	const value: ResponseData<T> = {
		status: 201,
		data,
		message,
		error,
	};

	return NextResponse.json(value);
};

/**
 *
 * sendNoContent
 *
 * use: api have method DELETE / PUT / PATCH when no return content
 *
 * @param res NextApiResponse
 * @param error  NoContent
 * @returns status {NextApiResponse}
 */
export const sendNoContent = (
	message = "Ok",
): NextResponse<ResponseData<null>> => {
	const value: ResponseData<null> = {
		status: 204,
		message,
	};
	return NextResponse.json(value);
};

export const throwBadRequest = (
	message = "Bad Request",
	error = "Bad Request",
): never => {
	throw new HttpError(message, 400, error);
};

// chua dang nhap hoac token khong hop le
export const throwUnauthorized = (
	message = "Unauthorized",
	error = "Unauthorized",
): never => {
	throw new HttpError(message, 401, error);
};

// user khong co quyn
export const throwForbidden = (
	message = "Forbidden",
	error = "Forbidden",
): never => {
	throw new HttpError(message, 403, error);
};

export const throwNotFound = (
	message = "Not Found",
	error = "Not Found",
): never => {
	throw new HttpError(message, 404, error);
};

export const throwNotAllowed = (
	message = "Not Found",
	error = "Not Allowed",
): never => {
	throw new HttpError(message, 405, error);
};

export const throwConflict = (
	message = "Conflict",
	error = "Conflict",
): never => {
	throw new HttpError(message, 409, error);
};

export const throwUnprocessableEntity = (
	message = "Unprocessable Entity",
	error = "Unprocessable Entity",
): never => {
	throw new HttpError(message, 422, error);
};

export const throwInternalServerError = (
	message = "Internal Server Error",
	error = "Internal Server Error",
): never => {
	throw new HttpError(message, 500, error);
};

export const InternalServerError = <T>(
	message = "Internal Server Error",
	error = "Internal Server Error",
) => {
	const value: ResponseData<T> = {
		status: 500,
		message,
		error,
	};
	return NextResponse.json(value, { status: 500 });
};
