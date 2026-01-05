import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: "API key not configured" });
	}

	// Build the full path from the catch-all route
	const { path } = req.query;
	const fullPath = Array.isArray(path) ? `/${path.join("/")}` : `/${path}`;

	// Add query string if present
	const queryString = req.url?.split("?")[1];
	const apiUrl = queryString
		? `https://api.nookipedia.com${fullPath}?${queryString}`
		: `https://api.nookipedia.com${fullPath}`;

	try {
		const response = await fetch(apiUrl, {
			headers: {
				"X-API-KEY": apiKey,
				"Accept-Version": "1.0.0",
			},
		});

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch data" });
	}
}
