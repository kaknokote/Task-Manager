import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../atoms';
import { formatDate } from '../../utils/date/formatDate';

export const TaskCard = ({ task, onDelete }) => {
	const navigate = useNavigate();

	const urgencyStyles = {
		high: 'bg-red-100 text-red-800 border-red-300',
		medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
		low: 'bg-green-100 text-green-800 border-green-300',
	};

	const statusStyles = {
		todo: 'bg-gray-100 text-gray-800 border-gray-300',
		'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
		done: 'bg-green-100 text-green-800 border-green-300',
	};

	const urgencyBorderStyles = {
		high: 'border-red-200',
		medium: 'border-yellow-200',
		low: 'border-green-200',
	};

	const handleEdit = () => {
		navigate(`/edit-task/${task.id}`);
	};

	const handleDelete = () => {
		onDelete(task.id);
	};

	return (
		<div
			className={`flex flex-col p-5 border ${urgencyBorderStyles[task.urgency]} rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300`}
		>
			<h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
			<div className="text-gray-600 mt-2">{task.description}</div>
			<div className="flex flex-wrap gap-2 mt-3">
				<div
					className={`px-3 py-1 text-sm font-semibold rounded-full border ${urgencyStyles[task.urgency]}`}
				>
					Urgency: {task.urgency}
				</div>
				<div
					className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusStyles[task.status]}`}
				>
					Status: {task.status}
				</div>
				<div className="px-3 py-1 text-sm font-semibold rounded-full border bg-gray-100 text-gray-800 border-gray-300">
					Category: {task.category}
				</div>
			</div>
			<div className="text-sm font-semibold text-gray-600 mt-3">
				Created: {formatDate(task.createdAt)}
			</div>
			<div className="flex gap-3 mt-4">
				<CommonButton
					text="Edit"
					color="sky-500"
					onClick={handleEdit}
					className="flex-1 py-2 hover:scale-105 transition-transform duration-200"
				/>
				<CommonButton
					text="Delete"
					color="red-500"
					onClick={handleDelete}
					className="flex-1 py-2 hover:scale-105 transition-transform duration-200"
				/>
			</div>
		</div>
	);
};
