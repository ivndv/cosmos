// Barra de categorías del sistema solar
function Navbar({
	categorias,
	categoriaSeleccionada,
	setCategoriaSeleccionada,
}) {
	return (
		<nav
			aria-label="Categorías del sistema solar"
			className="w-full overflow-x-auto pb-1 [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[#d0d0d0]"
		>
			<ul className="m-0 flex list-none gap-2 p-0">
				{categorias.map((categoria) => {
					const isSelected = categoria === categoriaSeleccionada;
					return (
						<li key={categoria}>
							<button
								type="button"
								onClick={() => setCategoriaSeleccionada(categoria)}
								aria-pressed={isSelected}
								className={`cursor-pointer whitespace-nowrap rounded-md border px-4 py-2 text-sm font-semibold capitalize transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
									isSelected
										? "border-bg-secondary bg-bg-secondary text-text-primary"
										: "border-[#e0e0e0] bg-bg-surface text-text-on-surface hover:border-accent/50"
								}`}
							>
								{categoria}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default Navbar;
