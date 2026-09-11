# Cosmos 

## Descripción

Aplicación web moderna e interactiva diseñada para explorar y descubrir los misterios del espacio exterior. Permite visualizar imágenes astronómicas diarias provistas por la NASA (APOD), mantenerse al día con noticias espaciales y conocer datos clave de los cuerpos de nuestro sistema solar, todo dentro de una interfaz rápida, atractiva y responsiva.

## Características

- **Galería interactiva NASA APOD**: Explora fotografías astronómicas en alta calidad provistas diariamente por la NASA, con visor detallado de cada imagen.
- **Gestión de favoritos**: Guarda y administra tus fotografías astronómicas preferidas para verlas cuando quieras.
- **Noticias espaciales**: Artículos actualizados sobre descubrimientos astronómicos y avances en la exploración del universo.
- **Explorador del Sistema Solar**: Guía interactiva con datos clave, características y distancias de los planetas y cuerpos celestes.
- **Diseño moderno y responsivo**: Interfaz fluida adaptada a cualquier dispositivo con tema oscuro espacial.

## Secciones

1. **Inicio**: Portada con llamada a la acción, novedades destacadas y accesos rápidos.
2. **Galería Espacial**: Cuadrícula de imágenes astronómicas diarias con visor modal y descripciones oficiales de la NASA.
3. **Noticias**: Publicaciones de divulgación espacial con vista de lectura individual.
4. **Sistema Solar**: Fichas interactivas con datos astronómicos organizados por planeta.

## Uso

- **Visualizar Contenido**: La aplicación ya está activa y puedes explorarla en vivo aquí: [Cosmos](https://cosmos.mgdc.site/).
- **Explorar la Galería**: Haz clic en cualquier fotografía para abrir el modal explicativo, guarda tus fotos preferidas o genera nuevos lotes aleatorios.
- **Conocer el Sistema Solar**: Selecciona los diferentes planetas y cuerpos para ver sus características, distancias y datos astronómicos.

## Tecnologías Utilizadas

- **Frontend**: Vite 8, React 19, React Router 7, Tailwind CSS 4
- **Backend**: Cloudflare Pages Functions (Hono 4)
- **API Externa**: NASA Open APIs (APOD)
- **Estado**: Zustand 5
- **Iconos**: React Icons 5, @iconify/react 6
- **Testing**: Vitest, Playwright
- **Herramientas**: Bun, Biome, TypeScript
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
