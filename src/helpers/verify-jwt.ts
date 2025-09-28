import { JWTPayload, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function verifyAccessToken(token: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, JWT_SECRET);
	return payload;
}
