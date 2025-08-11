export const CommonButton = ({ text, onClick, type = 'button' }) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className="h-[50px] px-[10px] text-[16px] bg-white shadow-sm cursor-pointer rounded-md border border-gray-300  disabled:bg-red-100 hover:bg-blue-100 transition-colors duration-300"
		>
			{text}
		</button>
	);
};
