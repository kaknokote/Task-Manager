export const Input = ({ name, type, placeholder, value, onChange }) => {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-[300px] p-1.5 mb-[25px] rounded-[5px] border border-neutral-600 text-neutral-800 bg-neutral-50"
		/>
	);
};
