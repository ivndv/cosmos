// Lista vertical de cuerpos de la categoría activa
function ListaCuerpos({ items, indiceSeleccionado, onSeleccionar }) {
	return (
		<ul className="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
			{items.map((item, index) => {
				const activo = index === indiceSeleccionado;
				return (
					<li key={item.id} className="shrink-0 lg:w-full">
						<button
							type="button"
							onClick={() => onSeleccionar(index)}
							aria-current={activo ? "true" : undefined}
							className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors duration-200 ${
								activo
									? "border-accent/40 bg-accent/10"
									: "border-transparent bg-transparent hover:bg-bg-surface-alt"
							}`}
						>
							<img
								src={item.url}
								alt=""
								loading="lazy"
								aria-hidden="true"
								className="h-9 w-9 shrink-0 rounded-full object-cover"
							/>
							<span
								className={`whitespace-nowrap text-sm font-semibold lg:whitespace-normal ${
									activo ? "text-accent" : "text-bg-secondary"
								}`}
							>
								{item.title}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}

export default ListaCuerpos;
