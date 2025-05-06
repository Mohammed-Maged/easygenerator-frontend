import axios from "axios";
import { refreshToken as refreshTokenApi } from "./auth";
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from "../utils/tokenStorage";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const res = await refreshTokenApi(refreshToken!);
        const { accessToken, refreshToken: newRefresh } = res.data;
        saveTokens({ accessToken, refreshToken: newRefresh });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        clearTokens();
        window.location.href = "/";
      }
    }
    return Promise.reject(err);
  }
);
export default api;
