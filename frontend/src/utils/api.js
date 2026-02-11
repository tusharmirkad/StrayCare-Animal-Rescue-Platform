import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://straycare-animal-rescue-platform.onrender.com",
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    // Debug: log whether a token was obtained (do not print full token in console)
    try {
      console.log("useApi: token present:", !!token);
    } catch (e) {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default useApi;
