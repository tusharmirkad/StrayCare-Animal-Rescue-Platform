import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const useApi = () => {
  const { getToken } = useAuth();

  // Resolve base URL:
  // - prefer VITE_API_URL when set
  // - if VITE_API_URL points to localhost and the app is loaded from a LAN IP (mobile),
  //   replace 'localhost' with `window.location.hostname` so the mobile device hits the dev machine
  const envUrl = import.meta.env.VITE_API_URL;
  let baseURL = envUrl || "https://straycare-animal-rescue-platform.onrender.com";

  try {
    if (typeof window !== "undefined" && envUrl && envUrl.includes("localhost")) {
      const parsed = new URL(envUrl);
      const port = parsed.port ? `:${parsed.port}` : "";
      baseURL = `${parsed.protocol}//${window.location.hostname}${port}`;
    }
  } catch (e) {
    // if anything goes wrong, fall back to envUrl or the production url
  }

  const api = axios.create({ baseURL });

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
