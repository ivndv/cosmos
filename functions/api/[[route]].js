import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

const app = new Hono();

app.get("/api/nasa", async (c) => {
	const endpoint = c.req.query("endpoint") || "apod";
	const apiKey = c.env.NASA_API_KEY;
	const separator = endpoint.includes("?") ? "&" : "?";
	const url = `https://api.nasa.gov/planetary/${endpoint}${separator}api_key=${apiKey}`;

	const res = await fetch(url);
	const data = await res.json();
	return c.json(data, res.ok ? 200 : res.status);
});

export const onRequest = handle(app);
