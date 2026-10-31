// React
import { useState } from "react";
// Componentes
import EncabezadoSeccion from "@/components/ui/EncabezadoSeccion";
// Datos
import { sistemaSolar } from "@/data/sistemaSolar";
import DetalleCuerpo from "./DetalleCuerpo";
import ListaCuerpos from "./ListaCuerpos";
import Navbar from "./Navbar";

const CATEGORIAS = Object.keys(sistemaSolar);

// Índice global: id → { categoria, indice } para navegar entre categorías
const UBICACION = {};
for (const [categoria, items] of Object.entries(sistemaSolar)) {
	items.forEach((item, indice) => {
		UBICACION[item.id] = { categoria, indice };
	});
}

const CUERPOS_POR_ID = Object.fromEntries(
	Object.values(sistemaSolar)
		.flat()
		.map((item) => [item.id, item]),
);

const SistemaSolar = () => {
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
		CATEGORIAS[0] ?? null,
	);
	const [indiceSeleccionado, setIndiceSeleccionado] = useState(0);

	// Al cambiar de categoría se vuelve al primer cuerpo
	const cambiarCategoria = (categoria) => {
		setCategoriaSeleccionada(categoria);
		setIndiceSeleccionado(0);
	};

	const items = categoriaSeleccionada
		? (sistemaSolar[categoriaSeleccionada] ?? [])
		: [];
	const itemActual = items[indiceSeleccionado] ?? null;
	const padre = itemActual?.padre ? CUERPOS_POR_ID[itemActual.padre] : null;

	// Salta a un cuerpo concreto, cambiando de categoría si hace falta
	const irA = (id) => {
		const destino = UBICACION[id];
		if (!destino) return;
		setCategoriaSeleccionada(destino.categoria);
		setIndiceSeleccionado(destino.indice);
	};

	return (
		<div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 pt-[90px] pb-10 text-left lg:px-5 lg:pt-[100px] lg:pb-15">
			<EncabezadoSeccion
				eyebrow="Vecindario cósmico"
				titulo="El Sistema Solar"
				descripcion="Explora las estrellas, planetas, lunas y cometas de nuestro vecindario cósmico. Elige una categoría y un cuerpo para ver sus datos."
			/>

			{!categoriaSeleccionada ? (
				<p className="animate-fade-in">No hay categorías disponibles.</p>
			) : (
				<>
					<div className="animate-reveal">
						<Navbar
							categorias={CATEGORIAS}
							categoriaSeleccionada={categoriaSeleccionada}
							setCategoriaSeleccionada={cambiarCategoria}
						/>
					</div>

					<div className="grid animate-reveal grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
						<ListaCuerpos
							items={items}
							indiceSeleccionado={indiceSeleccionado}
							onSeleccionar={setIndiceSeleccionado}
						/>
						<DetalleCuerpo
							item={itemActual}
							categoria={categoriaSeleccionada}
							padre={padre}
							onIrAPadre={irA}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SistemaSolar;
