import { API_URL } from '../../../utils/constants';

export const fetchTasksApi = async (userId, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		if (!userId) {
			throw new Error('User ID is required');
		}
		const res = await fetch(`${API_URL}/tasks?userId=${userId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (!res.ok) {
			throw new Error(
				`Failed to fetch tasks: ${res.status} ${res.statusText}`,
			);
		}
		return await res.json();
	} catch (e) {
		return rejectWithValue(e.message);
	}
};

export const createTaskApi = async ({ task, userId }, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		if (!userId) {
			throw new Error('User ID is required');
		}
		if (!task.title) {
			throw new Error('Task title is required');
		}
		const res = await fetch(`${API_URL}/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				userId,
				...task,
				createdAt: Date.now(),
			}),
		});
		if (!res.ok) {
			throw new Error(
				`Failed to create task: ${res.status} ${res.statusText}`,
			);
		}
		return await res.json();
	} catch (e) {
		return rejectWithValue(e.message);
	}
};

export const updateTaskApi = async (
	{ id, userId, ...task },
	{ rejectWithValue },
) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		if (!id) {
			throw new Error('Task ID is required');
		}
		if (!userId) {
			throw new Error('User ID is required');
		}
		const res = await fetch(`${API_URL}/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ userId, ...task }),
		});
		if (!res.ok) {
			throw new Error(
				`Failed to update task: ${res.status} ${res.statusText}`,
			);
		}
		return await res.json();
	} catch (e) {
		return rejectWithValue(e.message);
	}
};

export const deleteTaskApi = async (id, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No token found');
		}
		if (!id) {
			throw new Error('Task ID is required');
		}
		const res = await fetch(`${API_URL}/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			throw new Error(
				`Failed to delete task: ${res.status} ${res.statusText}`,
			);
		}
		return id;
	} catch (e) {
		return rejectWithValue(e.message);
	}
};
