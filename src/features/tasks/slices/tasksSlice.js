import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createTaskApi,
	deleteTaskApi,
	fetchTasksApi,
	updateTaskApi,
} from '../api/tasksApi';

export const fetchTasks = createAsyncThunk(
	'tasks/fetchTasks',
	async (userId, { rejectWithValue }) => {
		return await fetchTasksApi(userId, { rejectWithValue });
	},
);

export const createTask = createAsyncThunk(
	'tasks/createTask',
	async (task, { rejectWithValue }) => {
		return await createTaskApi(task, { rejectWithValue });
	},
);

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (task, { rejectWithValue }) => {
		return await updateTaskApi(task, { rejectWithValue });
	},
);

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (id, { rejectWithValue }) => {
		return await deleteTaskApi(id, { rejectWithValue });
	},
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
		loading: false,
		error: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(createTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks.push(action.payload);
			})
			.addCase(createTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(updateTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.tasks.findIndex(
					(task) => task.id === action.payload.id,
				);
				if (index !== -1) {
					state.tasks[index] = action.payload;
				}
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(deleteTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = state.tasks.filter(
					(task) => task.id !== action.payload,
				);
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
