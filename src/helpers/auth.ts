import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { ACCESS, HS256, ONE_SECOND, REFRESH } from "@/common";

const ACCESS_TOKEN_EXPIRE = "1m";
const REFRESH_TOKEN_EXPIRE = "3m";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
	process.env.JWT_REFRESH_SECRET!,
);

export async function generateAccessToken(
	payload: object,
	timeExp?: string,
): Promise<string> {
	const expTime = timeExp ? timeExp : ACCESS_TOKEN_EXPIRE;
	return await new SignJWT({ ...payload, type: ACCESS })
		.setProtectedHeader({ alg: HS256 })
		.setExpirationTime(`${expTime}`)
		.sign(JWT_SECRET);
}

export async function generateRefreshToken(
	payload: object,
	timeExp?: string,
): Promise<string> {
	const expTime = timeExp ? timeExp : REFRESH_TOKEN_EXPIRE;

	return await new SignJWT({ ...payload, type: REFRESH })
		.setProtectedHeader({ alg: HS256 })
		.setExpirationTime(`${expTime}`)
		.sign(JWT_REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, JWT_SECRET);
	return payload;
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
	return payload;
}

export function getTokenExpiry(token: string): number | null {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp ? payload.exp * ONE_SECOND : null; // chuyển thành milliseconds
	} catch (err) {
		return null;
	}
}
