import { BsRocket } from "react-icons/bs";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #0d0d1a;
  color: #a0a0b8;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterTop = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;

  svg {
    font-size: 1.5rem;
    color: #7c6af7;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Tagline = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 260px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const IconLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.06);
  color: #a0a0b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: background-color 0.25s, color 0.25s;

  &:hover {
    background-color: #7c6af7;
    color: #fff;
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColTitle = styled.span`
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const NavLink = styled(Link)`
  color: #a0a0b8;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const Divider = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
`;

const FooterBottom = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

const Footer = () => {
	return (
		<FooterWrapper>
			<FooterTop>
				{/* MARCA */}
				<Brand>
					<Logo>
						<BsRocket />
						Space App
					</Logo>
					<Tagline>
						Explora el universo a través de imágenes, noticias y datos del
						sistema solar en tiempo real.
					</Tagline>
					<SocialRow>
						<IconLink
							href="https://github.com/ivndv"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<FaGithub />
						</IconLink>
						<IconLink
							href="https://www.linkedin.com/in/ivan-cruz-1906mx"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<FaLinkedinIn />
						</IconLink>
						<IconLink
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
						>
							<FaInstagram />
						</IconLink>
					</SocialRow>
				</Brand>

				{/* NAVEGACIÓN */}
				<NavCol>
					<ColTitle>Explorar</ColTitle>
					<NavLink to="/">Inicio</NavLink>
					<NavLink to="/galería-espacial">Galería Espacial</NavLink>
					<NavLink to="/noticias">Noticias</NavLink>
					<NavLink to="/sistema-solar">Sistema Solar</NavLink>
				</NavCol>

				{/* DATOS */}
				<NavCol>
					<ColTitle>Datos</ColTitle>
					<NavLink
						as="a"
						href="https://api.nasa.gov"
						target="_blank"
						rel="noreferrer"
					>
						NASA API
					</NavLink>
					<NavLink
						as="a"
						href="https://apod.nasa.gov"
						target="_blank"
						rel="noreferrer"
					>
						APOD
					</NavLink>
				</NavCol>
			</FooterTop>

			<Divider />

			<FooterBottom>
				<span>© {new Date().getFullYear()} Space App — Ivan Cruz</span>
				<span>Datos provistos por la API de la NASA 🚀</span>
			</FooterBottom>
		</FooterWrapper>
	);
};

export default Footer;
