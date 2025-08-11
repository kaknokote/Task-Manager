import { AuthButton, ErrorMessage, Input, Title } from '../atoms';

export const FormField = ({ text, error, fields, button }) => {
	return (
		<div className="flex flex-wrap mx-auto justify-center w-[310px]">
			<Title text={text} />

			{fields.map((field) => (
				<Input
					key={field.name}
					name={field.name}
					type={field.type}
					placeholder={field.placeholder}
					value={field.value}
					onChange={field.onChange}
				/>
			))}
			{error && <ErrorMessage error={error} />}
			<AuthButton button={button} />
		</div>
	);
};
