import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice';
// import tasksReducer from '../features/tasks/slices/tasksSlice';
// import categoriesReducer from '../features/categories/slices/categoriesSlice';

export const rootReducer = combineReducers({
	auth: authReducer,
	// tasks: tasksReducer,
	// categories: categoriesReducer,
});
