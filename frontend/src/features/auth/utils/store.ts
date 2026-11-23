import { createStore, useSelector } from "@tanstack/react-store";
import { type JwtPayload, jwtDecode } from "jwt-decode";

const KEY = "savr_token";

export type AuthUser = {
	id: string;
	email: string;
	name?: string;
	onboarded: boolean;
};
type SavrClaims = JwtPayload & {
	email: string;
	name?: string;
	onboarded?: boolean;
};
type AuthState = {
	token: string | null;
	user: AuthUser | null;
	sessionExpired: boolean;
};

let expiryTimer: ReturnType<typeof setTimeout> | undefined;

function expiryOf(token: string): number | null {
	try {
		const { exp } = jwtDecode<SavrClaims>(token);
		return exp === undefined ? null : exp * 1000;
	} catch {
		return null;
	}
}

function isExpired(token: string): boolean {
	const exp = expiryOf(token);
	return exp === null || exp <= Date.now();
}

function decodeUser(token: string): AuthUser | null {
	try {
		const c = jwtDecode<SavrClaims>(token);
		return {
			id: c.sub!,
			email: c.email,
			name: c.name,
			onboarded: c.onboarded === true,
		};
	} catch {
		return null;
	}
}

function readStored(): { token: string | null; expired: boolean } {
	const stored = localStorage.getItem(KEY);
	if (!stored) return { token: null, expired: false };
	if (isExpired(stored)) {
		localStorage.removeItem(KEY);
		return { token: null, expired: true }; // they had a session and it ran out while the app was closed
	}
	return { token: stored, expired: false };
}

const initial = readStored();

export const authStore = createStore<AuthState>({
	token: initial.token,
	user: initial.token ? decodeUser(initial.token) : null,
	sessionExpired: initial.expired,
});

function endSession(expired: boolean) {
	clearTimeout(expiryTimer);
	localStorage.removeItem(KEY);
	const s = authStore.state;
	if (s.token === null && s.sessionExpired === expired) return;
	authStore.setState(() => ({
		token: null,
		user: null,
		sessionExpired: expired,
	}));
}

export const clearToken = () => endSession(false);

export function expireSession() {
	if (authStore.state.token === null) return;
	endSession(true);
}

function scheduleExpiry(token: string | null) {
	clearTimeout(expiryTimer);
	if (!token) return;
	const exp = expiryOf(token);
	if (exp === null) return;
	const delay = Math.min(Math.max(exp - Date.now(), 0), 2_147_483_647);
	expiryTimer = setTimeout(expireSession, delay);
}

export function setToken(token: string) {
	localStorage.setItem(KEY, token);
	authStore.setState(() => ({
		token,
		user: decodeUser(token),
		sessionExpired: false,
	}));
	scheduleExpiry(token);
}

export function getToken(): string | null {
	const { token } = authStore.state;
	return token && !isExpired(token) ? token : null;
}

export const isAuthenticated = () => getToken() !== null;

export const useIsAuthenticated = () =>
	useSelector(authStore, (s) => s.token !== null);
export const useCurrentUser = () => useSelector(authStore, (s) => s.user);
export const useSessionExpired = () =>
	useSelector(authStore, (s) => s.sessionExpired);

scheduleExpiry(initial.token);

function checkExpiry() {
	const { token } = authStore.state;
	if (token && isExpired(token)) expireSession();
}
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") checkExpiry();
});
window.addEventListener("focus", checkExpiry);

window.addEventListener("storage", (e) => {
	if (e.key !== KEY) return;
	if (e.newValue === null) endSession(false);
	else if (e.newValue !== authStore.state.token) setToken(e.newValue);
});
