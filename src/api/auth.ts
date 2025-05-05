import axios from "axios";
import type { RegisterData, LoginData, AuthResponse } from "../types/auth";
import { getAccessToken } from "../utils/tokenStorage";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const register = (data: RegisterData) =>
  api.post<AuthResponse>("/auth/register", data);

export const login = (data: LoginData) =>
  api.post<AuthResponse>("/auth/login", data);

export const refreshToken = (token: string) =>
  api.post("/auth/refresh", { refreshToken: token });

export const logout = () => {
  const token = getAccessToken();
  console.log("from logout", token);
  return api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
