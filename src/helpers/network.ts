import { Response } from "@/common/interface";

export const isNetworkError = (error: unknown): Response<unknown> => {
	const err: Response<unknown> = {
		success: false,
		message: "",
		error: "",
		isError: false,
	};

	const maybeError = error as { message?: unknown; code?: unknown };

	const message =
		typeof maybeError.message === "string" ? maybeError.message : "";
	const code = typeof maybeError.code === "string" ? maybeError.code : "";

	if (typeof error !== "object" || error === null) {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "Invalid input";
	}

	if (message.includes("getaddrinfo")) {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "getaddrinfo";
	}

	if (message.includes("fetch failed")) {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "fetch failed";
	}

	if (message.includes("network")) {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "network";
	}

	if (code === "ENOTFOUND") {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "ENOTFOUND";
	}

	if (code === "ECONNREFUSED") {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "ECONNREFUSED";
	}

	if (code === "ETIMEDOUT") {
		err.isError = true;
		err.message = "Net work disconnected";
		err.error = "ETIMEDOUT";
	}

	return err;
};
