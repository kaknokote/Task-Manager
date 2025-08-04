import { API_URL } from '../../../utils/constants';

const generateToken = (username) => `${username}_${Date.now()}`;

export const loginApi = async ({ username, password }, { rejectWithValue }) => {
	try {
		if (!username || !password) {
			throw new Error('Username and password required');
		}
		const normalizedUsername = username.toLowerCase();
		const res = await fetch(
			`${API_URL}/users?username=${normalizedUsername}&password=${password}`,
		);
		if (!res.ok) {
			throw new Error(`Login failure: ${res.status} ${res.statusText}`);
		}
		const users = await res.json();
		if (!Array.isArray(users) || users.length === 0) {
			throw new Error('Wrong username or password');
		}
		const user = users[0];
		const token = generateToken(normalizedUsername);

		await fetch(`${API_URL}/users/${user.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		});
		localStorage.setItem('token', token);
		return { ...user, token };
	} catch (e) {
		return rejectWithValue(e.message);
	}
};

export const registerApi = async (
	{ username, password },
	{ rejectWithValue },
) => {
	try {
		if (!username || !password) {
			throw new Error('Username and password required');
		}
		const normalizedUsername = username.toLowerCase();
		const checkRes = await fetch(
			`${API_URL}/users?username=${normalizedUsername}`,
		);
		const usersWithSimilarUsername = await checkRes.json();
		if (
			!Array.isArray(usersWithSimilarUsername) ||
			usersWithSimilarUsername.length !== 0
		) {
			throw new Error('This username is already taken');
		}
		const token = generateToken(normalizedUsername);
		const res = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: Date.now().toString(),
				username: normalizedUsername,
				password,
				token,
			}),
		});
		if (!res.ok) {
			throw new Error(
				`Registration failure: ${res.status} ${res.statusText}`,
			);
		}
		const user = await res.json();
		localStorage.setItem('token', token);
		return user;
	} catch (e) {
		return rejectWithValue(e.message);
	}
};

export const restoreAuthApi = async (_, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');
		if (!token || !token.includes('_')) {
			return;
		}
		const res = await fetch(`${API_URL}/users?token=${token}`);
		if (!res.ok) {
			throw new Error(
				`Failed to restore auth: ${res.status} ${res.statusText}`,
			);
		}
		const users = await res.json();
		if (!Array.isArray(users) || users.length === 0) {
			throw new Error('Invalid token');
		}
		return users[0];
	} catch (e) {
		localStorage.removeItem('token');
		return rejectWithValue(e.message);
	}
};
