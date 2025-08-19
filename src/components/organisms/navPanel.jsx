import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import { CommonButton } from '../atoms';

export const NavPanel = () => {
	const { user } = useAuth();
	const { tasks } = useTasks();

	const todoUrgentTasks = tasks.filter(
		(task) => task.urgency === 'high' && task.status !== 'done',
	).length;

	return (
		<nav className="bg-gray-50 px-6 py-4 mb-6 border-b border-gray-200">
			<div className="flex items-center justify-between">
				<Link
					to="/"
					className="text-xl font-semibold text-gray-800 hover:text-sky-600 transition-colors"
				>
					{user ? (
						<div>Task Manager ({user.username})</div>
					) : (
						<div>Task Manager</div>
					)}
				</Link>

				{user && todoUrgentTasks ? (
					<>
						{todoUrgentTasks === 1 ? (
							<div className="text-red-500">
								{todoUrgentTasks} urgent task uncompleted
							</div>
						) : (
							<div className="text-red-500">
								{todoUrgentTasks} urgent tasks uncompleted
							</div>
						)}
					</>
				) : (
					<></>
				)}

				<div className="flex items-center gap-3">
					{user ? (
						<>
							<Link to="/">
								<CommonButton text="Tasks" />
							</Link>
							<Link to="/new-task">
								<CommonButton text="New Task" />
							</Link>
							<Link to="/profile">
								<CommonButton text="Profile" />
							</Link>
						</>
					) : (
						<>
							<Link to="/login">
								<CommonButton text="Login" />
							</Link>
							<Link to="/register">
								<CommonButton text="Register" />
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
