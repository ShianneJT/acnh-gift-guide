import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: "API key not configured" });
	}

	const { path } = req.query;

	if (!path || typeof path !== "string") {
		return res.status(400).json({ error: "Path parameter required" });
	}

	try {
		const response = await fetch(`https://api.nookipedia.com${path}`, {
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
