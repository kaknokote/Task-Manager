import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginPage, RegisterPage, TasksPage } from './pages';

export const App = () => {
	const { restoreAuthUser } = useAuth();

	useEffect(() => {
		restoreAuthUser();
	}, [restoreAuthUser]);

	return (
		<div className="w-[1600px] mx-auto bg-white px-6 py-6 min-h-screen">
			<Routes>
				<Route path="/" element={<TasksPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
};
