"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { clearTokens, decodeToken, getToken, setTokens } from "@/lib/auth";
import type { AuthResponse } from "@/types/api";

interface AuthState {
  userId: string | null;
  role: "user" | "moderator" | "admin";
  isLoggedIn: boolean;
}

interface AuthContextValue extends AuthState {
  login: (resp: AuthResponse) => void;
  logout: () => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    userId: null,
    role: "user",
    isLoggedIn: false,
  });
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const t = getToken();
    if (t) {
      const payload = decodeToken(t);
      if (payload && payload.exp * 1000 > Date.now()) {
        setState({ userId: payload.sub, role: payload.role ?? "user", isLoggedIn: true });
        setToken(t);
      } else {
        clearTokens();
      }
    }
  }, []);

  function login(resp: AuthResponse) {
    setTokens(resp.accessToken, resp.refreshToken);
    const payload = decodeToken(resp.accessToken);
    if (payload) {
      setState({ userId: payload.sub, role: payload.role ?? "user", isLoggedIn: true });
      setToken(resp.accessToken);
    }
  }

  function logout() {
    clearTokens();
    setState({ userId: null, role: "user", isLoggedIn: false });
    setToken(undefined);
  }

  return (
    <AuthContext.Provider value={{ ...state, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
