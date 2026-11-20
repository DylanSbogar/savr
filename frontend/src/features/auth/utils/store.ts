import { createStore, useSelector } from "@tanstack/react-store";
import { type JwtPayload, jwtDecode } from "jwt-decode";

const KEY = "savr_token";

export type AuthUser = { id: string; email: string; name?: string };

type SavrClaims = JwtPayload & { email: string; name?: string };

function isExpired(token: string): boolean {
	try {
		const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
		return JSON.parse(atob(base64)).exp * 1000 < Date.now();
	} catch {
		return true;
	}
}

function decodeUser(token: string): AuthUser | null {
	try {
		const claims = jwtDecode<SavrClaims>(token);
		if (!claims.sub) return null;
		return { id: claims.sub, email: claims.email, name: claims.name };
	} catch {
		return null;
	}
}

function loadToken(): string | null {
	const token = localStorage.getItem(KEY);
	if (token && !isExpired(token)) return token;
	localStorage.removeItem(KEY);
	return null;
}

const initialToken = loadToken();

export const authStore = createStore<{
	token: string | null;
	user: AuthUser | null;
}>({
	token: initialToken,
	user: initialToken ? decodeUser(initialToken) : null,
});

export function getToken(): string | null {
	const { token } = authStore.state;
	return token && !isExpired(token) ? token : null;
}

export const isAuthenticated = () => getToken() !== null;

export function setToken(token: string) {
	localStorage.setItem(KEY, token);
	authStore.setState(() => ({ token, user: decodeUser(token) }));
}

export function clearToken() {
	localStorage.removeItem(KEY);
	authStore.setState(() => ({ token: null, user: null }));
}

export const useIsAuthenticated = () =>
	useSelector(authStore, (state) => state.token !== null);

export const useCurrentUser = () =>
	useSelector(authStore, (state) => state.user);
