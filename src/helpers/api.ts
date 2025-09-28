import { NextApiRequest, NextApiResponse } from "next";

import { disconnect } from "@/libs/mongodb";
import { DELETE, GET, PATCH, POST, PUT } from "@/common";
import { ResponseData } from "../common/interface";
import { isNetworkError } from "./network";
import {
	HttpError,
	throwNotFound,
	throwNotAllowed,
	sendOk,
	sendCreated,
	throwBadRequest,
	InternalServerError,
	sendNoContent,
} from "@/utils";

export const get = async <T, P = undefined>(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<T>>,
	getDataFn: (params?: P) => Promise<T | null>,
): Promise<void> => {
	if (req.method !== GET) {
		res.setHeader("Allow", [GET]);

		throwNotAllowed(`Method ${req.method} Not Allowed`);

		return;
	}

	try {
		const hasQuery = req.query && Object.keys(req.query).length > 0;
		const data = hasQuery ? await getDataFn(req.query as P) : await getDataFn();

		if (!data) throwNotFound();

		return sendOk(res, data, "Successfully");
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) return InternalServerError(res, isErrNW.message);

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res.status(status).json({
			success: false,
			error: err,
			message,
		});
	} finally {
		disconnect();
	}
};

export const post = async <TBody, TResponse>(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<TResponse>>,
	postDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<ResponseData<TResponse>> => {
	if (req.method !== POST) {
		res.setHeader("Allow", [POST]);
		throwNotAllowed(`Method ${req.method} Not Allowed`);
	}

	try {
		const result = await postDataFn(req.body);

		if (!result) {
			// throwBadRequest();
			return {
				success: false,
				status: 400,
				message: "OK",
			};
		}

		return {
			success: true,
			data: result,
			status: 200,
			message: "OK",
		};
	} catch (error) {
		let status = error instanceof HttpError ? error.statusCode : 500;

		let message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			status = 500;
			message = isErrNW.message ?? "";
		}

		return {
			status,
			message,
		};
	} finally {
		disconnect();
	}
};

export const put = async <TBody, TResponse>(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<TResponse>>,
	putDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<void> => {
	if (req.method !== PUT) {
		res.setHeader("Allow", [PUT]);

		throwNotAllowed(`Method ${req.method} Not Allowed`);

		return;
	}

	try {
		const result = await putDataFn(req.body);

		if (!result) {
			throwBadRequest();
		}

		return sendCreated(res, result, "Updated successfully");
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return InternalServerError(res, isErrNW.message);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res.status(status).json({
			success: false,
			error: err,
			message,
		});
	} finally {
		disconnect();
	}
};

export const patch = async <TBody, TResponse>(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData<TResponse>>,
	patchDataFn: (body: TBody) => Promise<TResponse | null>,
): Promise<void> => {
	if (req.method !== PATCH) {
		res.setHeader("Allow", [PATCH]);

		throwNotAllowed(`Method ${req.method} Not Allowed`);
		return;
	}

	try {
		const result = await patchDataFn(req.body);

		if (!result) {
			throwBadRequest();
		}

		return sendCreated(res, result, "Updated successfully");
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return InternalServerError(res, isErrNW.message);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res.status(status).json({
			success: false,
			error: err,
			message,
		});
	} finally {
		disconnect();
	}
};

export const deleted = async <P = undefined, T = null>(
	req: NextApiRequest,
	res: NextApiResponse,
	deleteDataFn: (param: P) => Promise<T>,
): Promise<void> => {
	if (req.method !== DELETE) {
		res.setHeader("Allow", [DELETE]);
		throwNotAllowed(`Method ${req.method} Not Allowed`);

		return;
	}

	try {
		const result = await deleteDataFn(req.query as P);

		if (!result) {
			throwBadRequest();
		}

		sendNoContent(res);
	} catch (error) {
		const isErrNW = isNetworkError(error);

		if (isErrNW.isError) {
			return InternalServerError(res, isErrNW.message);
		}

		const status = error instanceof HttpError ? error.statusCode : 500;
		const err = error instanceof HttpError ? error.error : "";
		const message = error instanceof Error ? error.message : "Đã có lỗi xảy ra";

		return res.status(status).json({
			success: false,
			error: err,
			message,
		});
	} finally {
		disconnect();
	}
};
