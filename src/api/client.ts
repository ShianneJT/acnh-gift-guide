import axios from "axios";

const API_BASE_URL = "/api/nookipedia";

export const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
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
