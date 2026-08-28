import { join } from "node:path";
import { chromium } from "@playwright/test";

async function generateOgImage() {
	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1200, height: 630 },
		deviceScaleFactor: 2,
	});

	const html = `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<style>
		* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		body {
			width: 1200px;
			height: 630px;
			background-color: #0d0d1a;
			position: relative;
			overflow: hidden;
		}
		/* Nebulosas cósmicas naturales de fondo */
		.nebula-center {
			position: absolute;
			width: 900px;
			height: 900px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.18) 40%, rgba(6, 182, 212, 0.1) 65%, transparent 80%);
			filter: blur(80px);
			border-radius: 50%;
		}
		.nebula-top-right {
			position: absolute;
			width: 700px;
			height: 700px;
			top: -180px;
			right: -120px;
			background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.12) 50%, transparent 75%);
			filter: blur(70px);
			border-radius: 50%;
		}
		.nebula-bottom-left {
			position: absolute;
			width: 750px;
			height: 750px;
			bottom: -180px;
			left: -120px;
			background: radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(59, 130, 246, 0.18) 50%, transparent 75%);
			filter: blur(70px);
			border-radius: 50%;
		}
		/* Campo de estrellas distribuido suavemente */
		.stars {
			position: absolute;
			inset: 0;
			background-image: 
				radial-gradient(2px 2px at 80px 60px, #ffffff, transparent),
				radial-gradient(1.5px 1.5px at 180px 140px, #93c5fd, transparent),
				radial-gradient(2.5px 2.5px at 320px 80px, #ffffff, transparent),
				radial-gradient(1px 1px at 450px 220px, #e2e8f0, transparent),
				radial-gradient(2px 2px at 580px 120px, #67e8f9, transparent),
				radial-gradient(2.5px 2.5px at 720px 70px, #ffffff, transparent),
				radial-gradient(1.5px 1.5px at 860px 190px, #c084fc, transparent),
				radial-gradient(2px 2px at 1000px 90px, #ffffff, transparent),
				radial-gradient(1.5px 1.5px at 1120px 150px, #38bdf8, transparent),
				radial-gradient(2px 2px at 120px 350px, #ffffff, transparent),
				radial-gradient(1px 1px at 280px 420px, #cbd5e1, transparent),
				radial-gradient(2.5px 2.5px at 400px 310px, #93c5fd, transparent),
				radial-gradient(1.5px 1.5px at 550px 480px, #ffffff, transparent),
				radial-gradient(2px 2px at 680px 360px, #67e8f9, transparent),
				radial-gradient(2.5px 2.5px at 820px 440px, #ffffff, transparent),
				radial-gradient(1.5px 1.5px at 950px 320px, #c084fc, transparent),
				radial-gradient(2px 2px at 1080px 410px, #ffffff, transparent),
				radial-gradient(1px 1px at 150px 540px, #e2e8f0, transparent),
				radial-gradient(2px 2px at 300px 580px, #38bdf8, transparent),
				radial-gradient(1.5px 1.5px at 470px 550px, #ffffff, transparent),
				radial-gradient(2px 2px at 620px 590px, #93c5fd, transparent),
				radial-gradient(1.5px 1.5px at 780px 560px, #ffffff, transparent),
				radial-gradient(2.5px 2.5px at 910px 580px, #67e8f9, transparent),
				radial-gradient(1px 1px at 1050px 530px, #cbd5e1, transparent);
			opacity: 0.95;
		}
	</style>
</head>
<body>
	<div class="nebula-center"></div>
	<div class="nebula-top-right"></div>
	<div class="nebula-bottom-left"></div>
	<div class="stars"></div>
</body>
</html>
	`;

	await page.setContent(html, { waitUntil: "networkidle" });
	const outputPath = join(process.cwd(), "public/og-image.png");
	await page.screenshot({ path: outputPath, type: "png" });
	await browser.close();

	console.log(`✅ Banner OG generado sin halos ni anillos en: ${outputPath}`);
}

generateOgImage();
