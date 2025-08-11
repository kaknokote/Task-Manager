import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTasks } from '../../../hooks/useTasks';
import { useNavigate } from 'react-router-dom';
import {
	CommonButton,
	ErrorMessage,
	Label,
	StatusSelector,
	Title,
} from '../../../components/atoms';
import { CategorySelector, UrgencySelector } from '../../../components/atoms';

export const NewTask = () => {
	const { user } = useAuth();

	const { createNewTask, loading, error } = useTasks();

	const navigate = useNavigate();

	const [task, setTask] = useState({
		category: 'work',
		title: '',
		description: '',
		urgency: 'low',
		status: 'todo',
	});

	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, [user, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => prev.filter((err) => !err.includes(name)));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = [];
		if (!task.title) {
			newErrors.push('Task title is required');
		}

		if (!task.category) {
			newErrors.push('Task category is required');
		}

		if (!task.urgency) {
			newErrors.push('Task urgency is required');
		}

		if (!task.status) {
			newErrors.push('Task status is required');
		}

		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}

		createNewTask({ userId: user.id, task });
		if (!error) {
			navigate('/');
		}
	};

	return (
		<div className="max-w-[800px] mx-auto p-6 bg-gray-50 min-h-screen">
			<div className="flex justify-center mb-6">
				<Title text="Create New Task" />
			</div>
			{loading && (
				<div className="text-center text-gray-500 mb-4">
					Creating task...
				</div>
			)}
			{error && <ErrorMessage error={error} />}
			{errors.length > 0 && (
				<div className="mb-4">
					{errors.map((err, index) => (
						<ErrorMessage key={index} error={err} />
					))}
				</div>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<Label text="Title" />
					<input
						type="text"
						name="title"
						value={task.title}
						onChange={handleChange}
						placeholder="Task title"
						className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
					/>
				</div>
				<div>
					<Label text="Description" />
					<textarea
						name="description"
						value={task.description}
						onChange={handleChange}
						placeholder="Task description"
						className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
					/>
				</div>
				<div>
					<Label text="Category" />
					<CategorySelector
						name="category"
						value={task.category}
						onChange={handleChange}
						isNewTask={true}
					/>
				</div>
				<div>
					<Label text="Urgency" />
					<UrgencySelector
						name="urgency"
						value={task.urgency}
						onChange={handleChange}
						isNewTask={true}
					/>
				</div>
				<div>
					<Label text="Status" />
					<StatusSelector
						name="status"
						value={task.status}
						onChange={handleChange}
						isNewTask={true}
					/>
				</div>
				<div className="flex gap-3 mt-4">
					<CommonButton text="Save" type="submit" />
					<CommonButton text="Cancel" onClick={() => navigate('/')} />
				</div>
			</form>
		</div>
	);
};
