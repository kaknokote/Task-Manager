import { Title } from '../../../components/atoms';
import { useTasks } from '../../../hooks/useTasks';
import { TaskCard, TaskFilters } from '../../../components/molecules';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Tasks = () => {
	const navigate = useNavigate();
	const { tasks, deleteExistingTask } = useTasks();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	const [filters, setFilters] = useState({
		searchQuery: '',
		categoryFilter: '',
		urgencyFilter: '',
	});

	const handleFilterChange = ({
		searchQuery,
		categoryFilter,
		urgencyFilter,
	}) => {
		setFilters({ searchQuery, categoryFilter, urgencyFilter });
	};

	const handleDelete = (id) => {
		deleteExistingTask(id);
	};

	const filteredTasks = tasks.filter((task) => {
		const matchesSearch =
			task.title
				.toLowerCase()
				.includes(filters.searchQuery.toLowerCase()) ||
			task.description
				.toLowerCase()
				.includes(filters.searchQuery.toLowerCase());
		const matchesCategory =
			!filters.categoryFilter || task.category === filters.categoryFilter;
		const matchesUrgency =
			!filters.urgencyFilter || task.urgency === filters.urgencyFilter;
		return matchesSearch && matchesCategory && matchesUrgency;
	});

	return (
		<div className="max-w-[800px] mx-auto p-6 bg-gray-50 min-h-screen">
			<div className="flex justify-center mb-6">
				<Title text="Welcome to your tasks!" />
			</div>

			<TaskFilters onFilterChange={handleFilterChange} />

			{filteredTasks.length === 0 ? (
				<div className="text-center text-3xl text-gray-500 animate-pulse">
					No tasks available.
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{filteredTasks.map((task) => (
						<div key={task.id}>
							<TaskCard task={task} onDelete={handleDelete} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
