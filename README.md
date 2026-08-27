# Cosmos (Explorador del Universo)

## Descripción

Aplicación web moderna e interactiva diseñada para explorar y descubrir los misterios del espacio exterior. Permite visualizar imágenes astronómicas diarias provistas por la NASA (APOD), mantenerse al día con noticias espaciales y conocer datos clave de los cuerpos de nuestro sistema solar, todo dentro de una interfaz rápida, atractiva y responsiva.

## Características

- **Galería interactiva NASA APOD**: Explora colecciones de imágenes astronómicas en alta calidad consumidas en tiempo real desde la API de la NASA, con soporte para modal detallado y animaciones de carga.
- **Gestión de favoritos y likes**: Interactúa dando me gusta y guardando tus fotografías astronómicas favoritas con persistencia de estado global gestionada con Zustand.
- **Feed de noticias espaciales**: Sección dedicada a la divulgación astronómica con artículos detallados y enrutamiento dinámico por slug.
- **Explorador del Sistema Solar**: Datos interactivos sobre planetas y cuerpos celestes acompañados de carruseles informativos.
- **Diseño moderno y responsivo**: Estilos estilizados con Tailwind CSS v4, tipografía Outfit (@fontsource/outfit) y componentes modulares con soporte para manejo de errores (Error Boundary).

## Secciones

1. **Inicio**: Hero con llamada a la acción, resumen de características destacadas y carrusel visual.
2. **Galería Espacial**: Cuadrícula dinámica de imágenes astronómicas (15 por lote), visor modal con descripción detallada y acciones interactivas.
3. **Noticias**: Artículos y novedades espaciales estructuradas con navegación individualizada (`/noticias/:slug`).
4. **Sistema Solar**: Vista interactiva con datos astronómicos de los planetas y carrusel de navegación.

## Uso

- **Visualizar Contenido**: La aplicación ya está activa y puedes explorarla en vivo aquí: [Cosmos](https://cosmos.mgdc.site/).
- **Explorar la Galería**: Haz clic en cualquier fotografía para abrir el modal explicativo, guarda tus fotos preferidas o genera nuevos lotes aleatorios.
- **Conocer el Sistema Solar**: Selecciona los diferentes planetas y cuerpos para ver sus características, distancias y datos astronómicos.

## Tecnologías Utilizadas

- **Frontend**: Vite 8, React 19, React Router 7, Tailwind CSS 4, @fontsource/outfit 5
- **Backend**: Cloudflare Pages Functions (Hono 4)
- **API Externa**: NASA Open APIs (`APOD - Astronomy Picture of the Day`)
- **State**: Zustand 5
- **Iconos**: React Icons 5, @iconify/react 6
- **Herramientas**: Bun 1, Biome 2, Vitest 4, jsdom 30, Wrangler 4
- **Infra**: Cloudflare Pages

## Instalación

1. **Clonar el Repositorio**: Descarga el código de este proyecto en tu máquina usando Git.

```bash
git clone https://github.com/ivndv/cosmos.git
```

2. **Instalar Dependencias**: Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
bun install
```

3. **Variables de Entorno**: Crea un archivo `.dev.vars` (para entorno Cloudflare local) o `.env` en la raíz con tu clave de API de la NASA:

```env
# NASA API Key (Obtén la tuya en https://api.nasa.gov/)
NASA_API_KEY=tu_api_key_aqui
VITE_NASA_API_KEY=tu_api_key_aqui
```

4. **Iniciar el Proyecto**:

```bash
# Solo frontend (Vite):
bun run dev

# Full stack con API (Cloudflare Pages Functions + Wrangler):
bun run dev:full
```

## Despliegue

La aplicación está construida para ser sumamente ligera y se encuentra desplegada de forma global a través de Cloudflare Pages. Puedes usarla directamente aquí: [cosmos.mgdc.site](https://cosmos.mgdc.site/)

## Licencia

Licencia de Uso Personal:

Este software es propiedad de **Ivan Cruz**. Se permite el uso de este software solo para fines personales y no comerciales. No se permite la distribución, modificación ni uso comercial de este software sin el consentimiento expreso de **Ivan Cruz**.

Cualquier uso no autorizado puede resultar en acciones legales.
