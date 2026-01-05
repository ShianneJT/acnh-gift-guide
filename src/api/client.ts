import axios from "axios";

const API_BASE_URL = "/api"; // Change from /api/nookipedia to just /api

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Accept-Version": "1.0.0",
		"Content-Type": "application/json",
	},
});
