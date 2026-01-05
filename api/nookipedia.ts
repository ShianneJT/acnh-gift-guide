import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: "API key not configured" });
	}

	const fullUrl = req.url || "";
	const pathWithQuery = fullUrl.replace("/api/nookipedia", "");

	console.log("Proxying to:", `https://api.nookipedia.com${pathWithQuery}`);

	try {
		const response = await fetch(
			`https://api.nookipedia.com${pathWithQuery}`,
			{
				headers: {
					"X-API-KEY": apiKey,
					"Accept-Version": "1.0.0",
				},
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("API Error:", response.status, errorText);
			return res.status(response.status).json({ error: errorText });
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		console.error("Proxy error:", error);
		res.status(500).json({
			error: "Failed to fetch data",
			details: String(error),
		});
	}
}
