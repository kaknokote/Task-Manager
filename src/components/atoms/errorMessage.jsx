export const ErrorMessage = ({ error }) => {
	return (
		<div className="w-[300px] p-1.5 mb-[25px] bg-red-300 rounded-[5px] text-center">
			{error}
		</div>
	);
};
