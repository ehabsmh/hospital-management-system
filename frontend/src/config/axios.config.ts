import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PRODUCTION_BASE_URL,
  withCredentials: true,
});

export default api;
