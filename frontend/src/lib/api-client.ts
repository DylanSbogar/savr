import { client } from "@/api/client.gen";
import { expireSession, getToken } from "@/features/auth/utils";

const isAuthCall = (url: string) =>
	new URL(url, window.location.origin).pathname.includes("/auth/");

client.interceptors.request.use((request) => {
	const token = getToken();
	if (token && !isAuthCall(request.url)) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
	return request;
});

client.interceptors.response.use((response) => {
	if (response.status === 401 && !isAuthCall(response.url)) {
		expireSession();
	}
	return response;
});
