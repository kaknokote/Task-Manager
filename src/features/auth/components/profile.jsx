import { useNavigate } from 'react-router-dom';
import { CommonButton, Label, Title } from '../../../components/atoms';
import { useAuth } from '../../../hooks/useAuth';
import { useTasks } from '../../../hooks/useTasks';
import { useEffect } from 'react';

export const Profile = () => {
	const { user, logoutUser } = useAuth();
	const navigate = useNavigate();

	const { tasks } = useTasks();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	const handleLogout = () => {
		logoutUser();
		navigate('/');
	};

	if (!user || !tasks) {
		return <div>Loading</div>;
	}

	return (
		<div className="max-w-[800px] mx-auto p-6 bg-gray-50 min-h-screen">
			<div className="flex justify-center mb-6">
				<Title text="Profile" />
			</div>

			<Label text="Username:" />
			<div className="mb-[10px] text-blue-900 text-[24px]">
				{user.username}
			</div>

			<Label text="Token:" />
			<div className="mb-[10px] text-blue-900 text-[24px]">
				{user.token}
			</div>

			<Label text="Tasks available:" />
			<div className="mb-[10px] text-blue-900 text-[24px]">
				{tasks.length}
			</div>

			<CommonButton text="Logout" onClick={handleLogout} />
		</div>
	);
};
