export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse extends Tokens {
  user: User;
}