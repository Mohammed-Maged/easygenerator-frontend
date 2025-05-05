const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const saveTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
};

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem("user");
};

export const saveUser = (user: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};