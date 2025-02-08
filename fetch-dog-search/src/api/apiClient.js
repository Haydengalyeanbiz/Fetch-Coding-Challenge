import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
