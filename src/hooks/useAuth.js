import { useDispatch, useSelector } from 'react-redux';
import {
	clearError,
	login,
	logout,
	register,
	restoreAuth,
} from '../features/auth/slices/authSlice';
import { useCallback } from 'react';

export const useAuth = () => {
	const dispatch = useDispatch();
	const { user, loading, error } = useSelector((state) => state.auth);

	const loginUser = async (username, password) => {
		await dispatch(login({ username, password }));
	};

	const registerUser = async (username, password) => {
		await dispatch(register({ username, password }));
	};

	const restoreAuthUser = useCallback(async () => {
		await dispatch(restoreAuth());
	}, [dispatch]);

	const logoutUser = () => {
		dispatch(logout());
	};

	const resetError = () => {
		dispatch(clearError());
	};

	return {
		user,
		loading,
		error,
		loginUser,
		registerUser,
		logoutUser,
		restoreAuthUser,
		resetError,
	};
};
