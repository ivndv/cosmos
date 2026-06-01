function Button({ className, ...props }) {
	return (
		<button
			className={`inline-flex items-center justify-center font-semibold cursor-pointer no-underline rounded-md transition-all duration-300 ${className || ""}`}
			{...props}
		/>
	);
}

export default Button;
