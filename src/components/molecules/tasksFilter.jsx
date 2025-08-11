import { useState } from 'react';
import { CategorySelector, CommonButton, UrgencySelector } from '../atoms';
import { Link } from 'react-router-dom';

export const TaskFilters = ({ onFilterChange }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [urgencyFilter, setUrgencyFilter] = useState('');

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		onFilterChange({ searchQuery: value, categoryFilter, urgencyFilter });
	};

	const handleCategoryChange = (e) => {
		const value = e.target.value;
		setCategoryFilter(value);
		onFilterChange({ searchQuery, categoryFilter: value, urgencyFilter });
	};

	const handleUrgencyChange = (e) => {
		const value = e.target.value;
		setUrgencyFilter(value);
		onFilterChange({ searchQuery, categoryFilter, urgencyFilter: value });
	};

	return (
		<div className="flex flex-col sm:flex-row gap-4 mb-6">
			<div className="relative flex-1">
				<input
					type="text"
					placeholder="Search tasks..."
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-800"
				/>
			</div>
			<CategorySelector
				value={categoryFilter}
				onChange={handleCategoryChange}
				className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-800"
			/>

			<UrgencySelector
				value={urgencyFilter}
				onChange={handleUrgencyChange}
				className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-gray-800"
			/>
			<Link to="/new-task">
				<CommonButton text="Add new task" />
			</Link>
		</div>
	);
};
