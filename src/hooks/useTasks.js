import { useSelector, useDispatch } from 'react-redux';
import {
	fetchTasks,
	createTask,
	updateTask,
	deleteTask,
	clearError,
} from '../features/tasks/slices/tasksSlice';
import { useCallback } from 'react';

export const useTasks = () => {
	const dispatch = useDispatch();
	const { tasks, loading, error } = useSelector((state) => state.tasks);

	const fetchTasksList = useCallback(
		async (userId) => {
			await dispatch(fetchTasks(userId));
		},
		[dispatch],
	);

	const createNewTask = async (task) => {
		await dispatch(createTask(task));
	};

	const updateExistingTask = async (task) => {
		await dispatch(updateTask(task));
	};

	const deleteExistingTask = async (id) => {
		await dispatch(deleteTask(id));
	};

	const resetError = () => dispatch(clearError());

	return {
		tasks,
		loading,
		error,
		fetchTasksList,
		createNewTask,
		updateExistingTask,
		deleteExistingTask,
		resetError,
	};
};
