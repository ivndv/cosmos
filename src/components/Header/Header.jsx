import { useEffect, useState } from "react";
import { BsRocket } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Header() {
	const [shrink, setShrink] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			setShrink(window.scrollY > 50);
		};
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header
			className="w-full flex flex-row-reverse justify-between items-center px-4 fixed top-0 z-[1000] shadow-sm transition-all duration-300 md:flex-row md:justify-center md:px-5"
			style={{
				height: isMobile
					? shrink
						? "40px"
						: "50px"
					: shrink
						? "55px"
						: "70px",
				backgroundColor:
					shrink || !isHome
						? "var(--color-bg-primary)"
						: "rgba(13, 13, 26, 0.65)",
				backdropFilter: shrink || !isHome ? "none" : "blur(12px)",
			}}
		>
			<div className="w-full max-w-[1200px] flex justify-between items-center flex-row-reverse md:flex-row">
				<div className="flex items-center gap-2">
					<div className="flex items-center">
						<BsRocket
							className="text-accent transition-all duration-300"
							style={{
								width: shrink ? "28px" : "32px",
								height: shrink ? "28px" : "32px",
							}}
						/>
					</div>
					<span className="text-[5vw] m-0 text-text-primary md:text-[20px] font-bold">
						Cosmos
					</span>
				</div>

				{isMobile && (
					<FaBars
						onClick={toggleSidebar}
						onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
						className="cursor-pointer text-2xl text-text-primary"
						aria-label="Abrir menú"
						role="button"
						tabIndex={0}
					/>
				)}

				{isMobile ? (
					<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
				) : (
					<Navbar />
				)}
			</div>
		</header>
	);
}

export default Header;
