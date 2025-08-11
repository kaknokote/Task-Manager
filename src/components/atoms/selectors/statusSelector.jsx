export const StatusSelector = ({
	value,
	onChange,
	isNewTask = false,
	name,
}) => {
	return (
		<select
			name={name}
			value={value}
			onChange={onChange}
			className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-800"
		>
			{!isNewTask && <option value="">Select Status</option>}
			<option value="todo">To Do</option>
			<option value="in-progress">In Progress</option>
			<option value="done">Done</option>
		</select>
	);
};
