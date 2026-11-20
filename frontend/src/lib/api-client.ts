import { client } from "@/api/client.gen";
import { clearToken, getToken } from "@/features/auth/utils";

client.interceptors.request.use((request) => {
	const token = getToken();
	const isAuthCall = new URL(
		request.url,
		window.location.origin,
	).pathname.includes("/auth/");
	if (token && !isAuthCall) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
	return request;
});

client.interceptors.response.use((response) => {
	if (response.status === 401 && getToken()) {
		clearToken();
	}
	return response;
});
