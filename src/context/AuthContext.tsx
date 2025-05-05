import React, { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken, getRefreshToken, getUser, saveUser, clearTokens, saveTokens } from "../utils/tokenStorage";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tokens: Tokens | null;
  setTokens: (tokens: Tokens | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [tokens, setTokensState] = useState<Tokens | null>(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  });

  useEffect(() => {
    const storedAccess = getAccessToken();
    const storedRefresh = getRefreshToken();
    const storedUser = getUser();

    if (storedAccess && storedRefresh) {
      setTokensState({
        accessToken: storedAccess,
        refreshToken: storedRefresh,
      });
    }
    if (storedUser) {
      setUserState(storedUser);
    }
  }, []);

  const setUser = (user: User | null) => {
    if (user) {
      saveUser(user);
    } else {
      clearTokens();
    }
    setUserState(user);
  };

  const setTokens = (tokens: Tokens | null) => {
    if (tokens) {
      saveTokens(tokens);
    } else {
      clearTokens();
    }
    setTokensState(tokens);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, tokens, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
