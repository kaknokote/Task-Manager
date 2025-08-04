import { useEffect, useState } from 'react';
import { FormField } from '../../../components/molecules';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const navigate = useNavigate();

	const { user, loginUser, loading, error, resetError } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		loginUser(username, password);
	};

	return (
		<FormField
			text="Login"
			error={error}
			fields={[
				{
					name: 'username',
					type: 'text',
					placeholder: 'Enter your username...',
					value: username,
					onChange: (e) => {
						resetError();
						setUsername(e.target.value);
					},
				},
				{
					name: 'password',
					type: 'password',
					placeholder: 'Enter your password...',
					value: password,
					onChange: (e) => {
						resetError();
						setPassword(e.target.value);
					},
				},
			]}
			button={{
				text: 'Login',
				onClick: handleLogin,
				disabled: loading || !!error,
			}}
		/>
	);
};
