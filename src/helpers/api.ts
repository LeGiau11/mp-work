import { NextResponse } from "next/server";

import { disconnect } from "@/libs/mongodb";
import { DELETE, GET, PATCH, POST, PUT } from "@/common";
import { ResponseData } from "../common/interface";
import { isNetworkError } from "./network";
import {
	HttpError,
	throwNotFound,
	throwBadRequest,
	InternalServerError,
	sendOk,
} from "@/utils";

export const get = async <T, P = undefined>(
	req: Request,
	getDataFn: (params?: P) => Promise<T | null>,
): Promise<NextResponse> => {
	if (req.method !== GET) {
		const response = NextResponse.json(
			{
				success: false,
				message: "Method Not Allowed",
				status: 405,
			},
			{ status: 405 },
		);

		response.headers.set("Allow", GET);
		return response;
	}

	try {
		// Lấy query từ URL
		const { searchParams } = new URL(req.url);

		// Convert searchParams -> plain object (nếu cần)
		const paramsObj = Object.fromEntries(searchParams.entries()) as P;

		const data =
			searchParams.size > 0 ? await getDataFn(paramsObj) : await getDataFn();

		if (!data) throwNotFound();

		return sendOk(data);
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return NextResponse.json(
				{ success: false, message: isErrNW.message },
				{ status: 500 },
			);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";
		return InternalServerError(status, message, err);

		disconnect();
	}
};

export const post = async <TBody, TResponse>(
	req: Request,
	postDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<NextResponse<ResponseData<TResponse>>> => {
	if (req.method !== POST) {
		const res = NextResponse.json<ResponseData<TResponse>>(
			{
				success: false,
				status: 405,
				message: `Method ${req.method} Not Allowed`,
			},
			{ status: 405 },
		);
		res.headers.set("Allow", POST);
		return res;
	}

	try {
		// Lấy body từ request
		const body = (await req.json()) as TBody;

		const result = await postDataFn(body);

		if (!result) {
			return NextResponse.json(
				{
					success: false,
					status: 400,
					message: "Bad Request",
				},
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				data: result,
				status: 200,
				message: "OK",
			},
			{ status: 200 },
		);
	} catch (error) {
		let status = error instanceof HttpError ? error.statusCode : 500;
		let message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		const isErrNW = isNetworkError(error);
		if (isErrNW.isError) {
			status = 500;
			message = isErrNW.message ?? "";
		}

		return NextResponse.json(
			{
				status,
				message,
			},
			{ status },
		);
	} finally {
		disconnect();
	}
};

export const put = async <TBody, TResponse>(
	req: Request,
	putDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<NextResponse<ResponseData<TResponse>>> => {
	if (req.method !== PUT) {
		const response = NextResponse.json<ResponseData<TResponse>>(
			{
				success: false,
				status: 405,
				message: `Method ${req.method} Not Allowed`,
			},
			{ status: 405 },
		);
		response.headers.set("Allow", PUT);
		return response;
	}

	try {
		const body = (await req.json()) as TBody;
		const result = await putDataFn(body);

		if (!result) {
			throwBadRequest();
		}

		return NextResponse.json(
			{
				success: true,
				data: result,
				status: 200,
				message: "Updated successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return NextResponse.json(
				{
					success: false,
					status: 500,
					message: isErrNW.message ?? "Network error",
				},
				{ status: 500 },
			);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return NextResponse.json(
			{
				success: false,
				error: err,
				status,
				message,
			},
			{ status },
		);
	} finally {
		disconnect();
	}
};

export const patch = async <TBody, TResponse>(
	req: Request,
	patchDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<NextResponse<ResponseData<TResponse>>> => {
	if (req.method !== PATCH) {
		const response = NextResponse.json<ResponseData<TResponse>>(
			{
				success: false,
				status: 405,
				message: `Method ${req.method} Not Allowed`,
			},
			{ status: 405 },
		);
		response.headers.set("Allow", PATCH);
		return response;
	}

	try {
		const body = (await req.json()) as TBody;
		const result = await patchDataFn(body);

		if (!result) {
			throwBadRequest();
		}

		return NextResponse.json<ResponseData<TResponse>>(
			{
				success: true,
				data: result,
				status: 200,
				message: "Updated successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return NextResponse.json<ResponseData<TResponse>>(
				{
					success: false,
					status: 500,
					message: isErrNW.message ?? "Network error",
				},
				{ status: 500 },
			);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return NextResponse.json<ResponseData<TResponse>>(
			{
				success: false,
				error: err,
				status,
				message,
			},
			{ status },
		);
	} finally {
		disconnect();
	}
};

export const deleted = async <P = undefined, T = null>(
	req: Request,
	deleteDataFn: (param: P) => Promise<T>,
): Promise<NextResponse<ResponseData<T>>> => {
	if (req.method !== DELETE) {
		const response = NextResponse.json<ResponseData<T>>(
			{
				success: false,
				status: 405,
				message: `Method ${req.method} Not Allowed`,
			},
			{ status: 405 },
		);
		response.headers.set("Allow", DELETE);
		return response;
	}

	try {
		// ✅ Lấy params từ URL
		const url = new URL(req.url);
		const params = Object.fromEntries(url.searchParams) as P;

		const result = await deleteDataFn(params);

		if (!result) {
			throwBadRequest();
		}

		// ✅ Trả về 204 No Content
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return NextResponse.json<ResponseData<T>>(
				{
					success: false,
					status: 500,
					message: isErrNW.message ?? "Network error",
				},
				{ status: 500 },
			);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return NextResponse.json<ResponseData<T>>(
			{
				success: false,
				error: err,
				status,
				message,
			},
			{ status },
		);
	} finally {
		disconnect();
	}
};
