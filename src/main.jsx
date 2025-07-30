import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TaskManager } from './taskManager';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<TaskManager />
	</StrictMode>,
);
