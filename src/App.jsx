import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import {
	EditTaskPage,
	LoginPage,
	NewTaskPage,
	ProfilePage,
	RegisterPage,
	TasksPage,
} from './pages';
import { useTasks } from './hooks/useTasks';
import { NavPanel } from './components/organisms';

export const App = () => {
	const { user, restoreAuthUser } = useAuth();

	const { fetchTasksList } = useTasks();

	useEffect(() => {
		restoreAuthUser();
	}, [restoreAuthUser]);

	useEffect(() => {
		if (user) {
			fetchTasksList(user.id);
		}
	}, [user, fetchTasksList]);

	return (
		<div className="w-[1600px] mx-auto bg-white px-6 py-6 min-h-screen">
			<NavPanel />
			<Routes>
				<Route path="/" element={<TasksPage />} />
				<Route path="/new-task" element={<NewTaskPage />} />
				<Route path="/edit-task/:id" element={<EditTaskPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	);
};
