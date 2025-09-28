import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common";
import { getTokenExpiry } from "@/helpers";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const accessToken = localStorage.getItem(ACCESS_TOKEN);
	const refreshToken = localStorage.getItem(REFRESH_TOKEN);

	const authOptions = {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const res = await fetch(url, authOptions);

	if (res.status === 401 && refreshToken) {
		// Thử refresh token
		const refreshRes = await fetch("/api/auth/refresh", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});

		if (refreshRes.ok) {
			const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
				await refreshRes.json();

			// Cập nhật token
			localStorage.setItem(ACCESS_TOKEN, newAccessToken);
			localStorage.setItem(REFRESH_TOKEN, newRefreshToken);

			// Gửi lại request ban đầu với token mới
			const retryOptions = {
				...options,
				headers: {
					...(options.headers || {}),
					Authorization: `Bearer ${newAccessToken}`,
				},
			};

			return await fetch(url, retryOptions);
		} else {
			// refresh token hết hạn → logout
			localStorage.clear();
			window.location.href = "/login";
			throw new Error("Refresh token expired");
		}
	}

	return res;
}

let refreshTimeout: NodeJS.Timeout | null = null;
/**
 *
 * startSilentRefreshAuth
 *
 * use: duoc dung sau khi login thanh cong.
 *
 * @returns {Promise<void>}
 */
export async function startSilentRefreshAuth(): Promise<void> {
	stopSilentRefreshAuth();

	const refreshToken = localStorage.getItem(REFRESH_TOKEN);

	if (!refreshToken) return;

	const exp = getTokenExpiry(refreshToken);

	if (!exp) return;

	const now = Date.now();
	const timeUntilExpiry = exp - now;

	// Nếu còn hơn 10s thì set timeout trước khi nó hết hạn 10s
	const refreshIn = timeUntilExpiry > 10_000 ? timeUntilExpiry - 10_000 : 0;

	refreshTimeout = setTimeout(async () => {
		const token = localStorage.getItem(REFRESH_TOKEN);

		if (!token) return;

		const res = await fetch("/api/auth/refresh", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});

		if (res.ok) {
			const { accessToken, refreshToken: newRefreshToken } = await res.json();
			localStorage.setItem(ACCESS_TOKEN, accessToken);
			localStorage.setItem(REFRESH_TOKEN, newRefreshToken);

			startSilentRefreshAuth();
		} else {
			// refresh failed → logout
			localStorage.clear();
			// dung
			stopSilentRefreshAuth();
			window.location.href = "/login";
		}
	}, refreshIn);
}

export const stopSilentRefreshAuth = (): void => {
	if (refreshTimeout) {
		clearTimeout(refreshTimeout);
		refreshTimeout = null;
	}
};
