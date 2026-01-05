import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: "API key not configured" });
	}

	const { path } = req.query;
	const pathSegments = Array.isArray(path) ? path.join("/") : path || "";

	const urlParts = req.url?.split("?");
	const queryString = urlParts && urlParts.length > 1 ? urlParts[1] : "";

	const apiUrl = queryString
		? `https://api.nookipedia.com/${pathSegments}?${queryString}`
		: `https://api.nookipedia.com/${pathSegments}`;

	console.log("Proxying to:", apiUrl);

	try {
		const response = await fetch(apiUrl, {
			headers: {
				"X-API-KEY": apiKey,
				"Accept-Version": "1.0.0",
			},
		});

		if (!response.ok) {
			throw new Error(`API responded with ${response.status}`);
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		console.error("Proxy error:", error);
		res.status(500).json({ error: "Failed to fetch data" });
	}
}
