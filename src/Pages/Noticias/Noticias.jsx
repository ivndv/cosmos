import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import { noticias } from "../../data/noticias";
import Titulo from "../Galeria/Titulo";

const generarSlug = (title) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9áéíóúüñ\s]+/g, "")
		.replace(/\s+/g, "-");

const Noticias = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedAuthor, setSelectedAuthor] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [orderDirection, setOrderDirection] = useState("reciente");

	const categories = [...new Set(noticias.map((n) => n.categoria))];
	const authors = [...new Set(noticias.map((n) => n.author))];
	const allTags = [...new Set(noticias.flatMap((n) => n.keywords))];

	const filtered = noticias
		.filter((n) => {
			const matchTitle = n.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchCat = selectedCategory
				? n.categoria === selectedCategory
				: true;
			const matchAuthor = selectedAuthor ? n.author === selectedAuthor : true;
			const matchTag = selectedTag ? n.keywords.includes(selectedTag) : true;
			return matchTitle && matchCat && matchAuthor && matchTag;
		})
		.sort((a, b) => {
			if (orderBy === "fecha")
				return orderDirection === "reciente"
					? new Date(b.date) - new Date(a.date)
					: new Date(a.date) - new Date(b.date);
			if (orderBy === "relevancia")
				return orderDirection === "masVistas"
					? b.views - a.views
					: a.views - b.views;
			return 0;
		});

	const handleOrderByChange = (e) => {
		const val = e.target.value;
		setOrderBy(val);
		if (val !== "fecha") setOrderDirection("masVistas");
		else setOrderDirection("reciente");
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setSelectedCategory("");
		setSelectedAuthor("");
		setSelectedTag("");
		setOrderBy("");
		setOrderDirection("reciente");
	};

	const hasActiveFilters =
		searchTerm || selectedCategory || selectedAuthor || selectedTag || orderBy;

	return (
		<div className="pt-[90px] px-4 pb-10 max-w-[1200px] mx-auto flex flex-col gap-10 md:pt-[100px] md:px-10 md:pb-15">
			<div className="flex flex-col items-center text-center gap-2.5 animate-stagger-1">
				<Titulo titulo="Últimas Noticias" />
				<p className="text-base text-text-on-surface max-w-[680px] leading-[1.6]">
					Las noticias más recientes sobre exploración espacial, astronomía y
					tecnología. Mantente al día con los descubrimientos más emocionantes.
				</p>
			</div>

			<section className="flex flex-wrap gap-4 items-center justify-center w-full animate-stagger-2">
				<div className="flex-[1_1_260px] max-w-[320px] relative flex items-center">
					<Icon
						icon="lucide:search"
						width="16"
						className="absolute left-3 text-text-muted pointer-events-none"
					/>
					<input
						placeholder="Buscar por título..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full py-2.5 px-9 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)]"
					/>
					{searchTerm && (
						<button
							type="button"
							className="absolute right-2 bg-none border-none text-bg-secondary cursor-pointer p-1 flex items-center hover:text-bg-primary"
							onClick={() => setSearchTerm("")}
							aria-label="Limpiar búsqueda"
						>
							<Icon icon="lucide:x" width="16" />
						</button>
					)}
				</div>

				{[
					{
						value: selectedCategory,
						set: setSelectedCategory,
						items: categories,
						label: "Todas las categorías",
					},
					{
						value: selectedAuthor,
						set: setSelectedAuthor,
						items: authors,
						label: "Todos los autores",
					},
				].map(({ value, set, items, label }) => (
					<div
						key={label}
						className="flex-[1_1_180px] max-w-[240px] relative flex items-center"
					>
						<select
							value={value}
							onChange={(e) => set(e.target.value)}
							className="w-full py-2.5 pr-9 pl-4 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary cursor-pointer outline-none appearance-none transition-[border-color,box-shadow] duration-200 focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)] [&>option]:bg-bg-surface [&>option]:text-bg-secondary [&>option]:px-3.5 [&>option]:py-1.5 [&>option:checked]:bg-bg-surface-alt"
						>
							<option value="">{label}</option>
							{items.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
						<Icon
							icon="lucide:chevron-down"
							width="16"
							className="absolute right-3 text-[#000] pointer-events-none"
						/>
					</div>
				))}

				<div className="flex-[1_1_180px] max-w-[240px] relative flex items-center">
					<select
						value={orderBy}
						onChange={handleOrderByChange}
						className="w-full py-2.5 pr-9 pl-4 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary cursor-pointer outline-none appearance-none transition-[border-color,box-shadow] duration-200 focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)] [&>option]:bg-bg-surface [&>option]:text-bg-secondary"
					>
						<option value="">Ordenar por</option>
						<option value="fecha">Fecha</option>
						<option value="relevancia">Relevancia</option>
					</select>
					<Icon
						icon="lucide:chevron-down"
						width="16"
						className="absolute right-3 text-[#000] pointer-events-none"
					/>
				</div>

				{orderBy === "fecha" && (
					<div className="flex-[1_1_180px] max-w-[240px] relative flex items-center">
						<select
							value={orderDirection}
							onChange={(e) => setOrderDirection(e.target.value)}
							className="w-full py-2.5 pr-9 pl-4 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary cursor-pointer outline-none appearance-none transition-[border-color,box-shadow] duration-200 focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)]"
						>
							<option value="reciente">Más reciente</option>
							<option value="antigua">Más antigua</option>
						</select>
						<Icon
							icon="lucide:chevron-down"
							width="16"
							className="absolute right-3 text-[#000] pointer-events-none"
						/>
					</div>
				)}
				{orderBy === "relevancia" && (
					<div className="flex-[1_1_180px] max-w-[240px] relative flex items-center">
						<select
							value={orderDirection}
							onChange={(e) => setOrderDirection(e.target.value)}
							className="w-full py-2.5 pr-9 pl-4 border border-bg-secondary rounded-sm text-sm font-inherit bg-bg-surface text-bg-secondary cursor-pointer outline-none appearance-none transition-[border-color,box-shadow] duration-200 focus:border-bg-primary focus:shadow-[0_0_0_3px_rgba(26,26,46,0.15)]"
						>
							<option value="masVistas">Más vistas</option>
							<option value="menosVistas">Menos vistas</option>
						</select>
						<Icon
							icon="lucide:chevron-down"
							width="16"
							className="absolute right-3 text-[#000] pointer-events-none"
						/>
					</div>
				)}
				{hasActiveFilters && (
					<button
						type="button"
						onClick={clearAllFilters}
						aria-label="Limpiar filtros"
						className="bg-none border-none text-bg-secondary cursor-pointer p-1 flex items-center transition-colors duration-200 hover:text-bg-primary"
					>
						<Icon icon="lucide:x-circle" width="18" />
					</button>
				)}
			</section>

			<div className="flex flex-wrap gap-1.5 animate-stagger-3">
				<button
					type="button"
					className={`border-none rounded-md px-2.5 py-1 text-xs font-inherit cursor-pointer transition-[background,color] duration-200 ${
						selectedTag === ""
							? "bg-bg-secondary text-text-primary"
							: "bg-bg-surface-alt text-text-on-surface"
					}`}
					onClick={() => setSelectedTag("")}
				>
					Todos los tags
				</button>
				{allTags.map((tag) => (
					<button
						key={tag}
						type="button"
						className={`border-none rounded-md px-2.5 py-1 text-xs font-inherit cursor-pointer transition-[background,color] duration-200 hover:bg-bg-secondary hover:text-text-primary ${
							selectedTag === tag
								? "bg-bg-secondary text-text-primary"
								: "bg-bg-surface-alt text-text-on-surface"
						}`}
						onClick={() => setSelectedTag(tag)}
					>
						{tag}
					</button>
				))}
			</div>

			{filtered.length === 0 ? (
				<p className="text-text-muted italic text-center py-10">
					No se encontraron noticias con esos filtros.
				</p>
			) : (
				<section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-stagger-4">
					{filtered.map((noticia, idx) => (
						<div
							key={noticia.id}
							className="border border-[#e8e8e8] rounded-lg overflow-hidden flex flex-col bg-bg-surface shadow-card transition-all duration-[250ms] hover:shadow-card-hover hover:-translate-y-1 animate-fade-in-up"
							style={{ animationDelay: `${idx * 0.06}s` }}
						>
							<img
								src={noticia.url}
								alt={noticia.title}
								className="w-full h-[180px] object-cover"
							/>
							<div className="p-4 flex flex-col gap-2 flex-1">
								<h2 className="text-base font-bold text-bg-secondary leading-[1.4] m-0">
									{noticia.title}
								</h2>
								<p className="text-sm text-text-on-surface leading-[1.5] flex-1">
									{noticia.explanation}
								</p>
								<div className="flex justify-between text-sm text-text-muted">
									<span>Por: {noticia.author}</span>
									<span>{new Date(noticia.date).toLocaleDateString()}</span>
								</div>
								<Link
									to={`/noticias/${generarSlug(noticia.title)}`}
									state={{ id: noticia.id }}
									className="block mt-3"
								>
									<Boton className="px-4 py-2 text-sm bg-bg-secondary text-text-primary border border-bg-secondary hover:bg-bg-hover">
										Ver más
									</Boton>
								</Link>
							</div>
						</div>
					))}
				</section>
			)}
		</div>
	);
};

export default Noticias;
