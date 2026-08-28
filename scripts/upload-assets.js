import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const IMG_DIR = join(process.cwd(), "public/img");
const BUCKET = "cosmos-assets";

const files = readdirSync(IMG_DIR);
console.log(
	`🚀 Iniciando subida de ${files.length} imágenes a R2 bucket '${BUCKET}'...\n`,
);

for (const file of files) {
	const filePath = join(IMG_DIR, file);
	if (!statSync(filePath).isFile()) continue;

	const contentType = file.endsWith(".png") ? "image/png" : "image/jpeg";
	const destination = `${BUCKET}/img/${file}`;

	console.log(`📤 Subiendo ${file} -> ${destination} (${contentType})...`);
	execSync(
		`bunx wrangler r2 object put "${destination}" --file="${filePath}" --content-type="${contentType}" --remote`,
		{ stdio: "inherit" },
	);
}

console.log("\n✅ ¡Todas las imágenes se subieron con éxito a Cloudflare R2!");
