import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CommonButton } from '../atoms';

export const NavPanel = () => {
	const { user } = useAuth();

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
