import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, registerApi, restoreAuthApi } from '../api/authApi';

export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }, { rejectWithValue }) => {
		return await loginApi({ username, password }, { rejectWithValue });
	},
);

export const register = createAsyncThunk(
	'auth/register',
	async ({ username, password }, { rejectWithValue }) => {
		return await registerApi({ username, password }, { rejectWithValue });
	},
);

export const restoreAuth = createAsyncThunk(
	'auth/restoreAuth',
	async (_, { rejectWithValue }) => {
		return await restoreAuthApi(_, { rejectWithValue });
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, loading: false, error: null },
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem('token');
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(restoreAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(restoreAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(restoreAuth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.user = null;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
