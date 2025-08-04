import { useEffect, useState } from 'react';
import { FormField } from '../../../components/molecules';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
	const navigate = useNavigate();

	const { user, registerUser, loading, error, resetError } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		registerUser(username, password);
	};

	return (
		<FormField
			text="Register"
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
				text: 'Register',
				onClick: handleRegister,
				disabled: loading || !!error,
			}}
		/>
	);
};
