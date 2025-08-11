export const AuthButton = ({ button }) => {
	return (
		<button
			onClick={button.onClick}
			disabled={button.disabled}
			className="w-[250px] p-1.5 mb-[25px] text-white cursor-pointer rounded-[5px] border border-neutral-600 bg-sky-500 disabled:bg-neutral-300 disabled:border-neutral-400 hover:bg-sky-600 transition-colors duration-300"
		>
			{button.text}
		</button>
	);
};
