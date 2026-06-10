// Barra de navegación de categorías para el sistema solar
function Navbar({
	categorias,
	setCategoriaSeleccionada,
	categoriaSeleccionada,
}) {
	return (
		<nav className="w-full mb-5 overflow-x-auto [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d0d0d0] [&::-webkit-scrollbar-thumb]:rounded-sm">
			<ul className="list-none flex justify-start gap-3 px-2.5 m-0 md:justify-center">
				{categorias.map((categoria) => {
					const isSelected = categoria === categoriaSeleccionada;
					return (
						<li key={categoria}>
							{/* Botón de categoría */}
							<button
								type="button"
								onClick={() => setCategoriaSeleccionada(categoria)}
								className={`border-none rounded-xl px-4 py-2 text-sm font-semibold capitalize cursor-pointer whitespace-nowrap transition-all duration-200 md:px-6 md:py-2.5 md:text-base ${
									isSelected
										? "bg-bg-secondary text-text-primary"
										: "bg-bg-surface-alt text-text-on-surface hover:bg-[#e0e0e8]"
								} hover:-translate-y-0.5`}
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
