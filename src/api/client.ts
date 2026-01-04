import axios from "axios";

const API_BASE_URL = "https://api.nookipedia.com";

const API_KEY = import.meta.env.VITE_API_KEY;

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"X-API-KEY": API_KEY,
		"Accept-Version": "1.0.0",
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error(
			"API Error:",
			error.response?.status,
			error.response?.data
		);
		return Promise.reject(error);
	}
);
