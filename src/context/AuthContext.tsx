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
import { api } from "@/lib/api";

interface AuthState {
  userId: string | null;
  email: string | null;
  role: "user" | "moderator" | "admin";
  isLoggedIn: boolean;
  hydrated: boolean;
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
    email: null,
    role: "user",
    isLoggedIn: false,
    hydrated: false,
  });
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const t = getToken();
    if (t) {
      const payload = decodeToken(t);
      if (payload && payload.exp * 1000 > Date.now()) {
        setToken(t);
        setState({ userId: payload.sub, email: null, role: payload.role ?? "user", isLoggedIn: true, hydrated: true });
        api.getMe(t).then(({ user }) => {
          setState((prev) => ({ ...prev, email: user.email }));
        }).catch(() => {});
      } else {
        clearTokens();
        setState((prev) => ({ ...prev, hydrated: true }));
      }
    } else {
      setState((prev) => ({ ...prev, hydrated: true }));
    }
  }, []);

  function login(resp: AuthResponse) {
    setTokens(resp.accessToken, resp.refreshToken);
    const payload = decodeToken(resp.accessToken);
    if (payload) {
      const t = resp.accessToken;
      setState({ userId: payload.sub, email: null, role: payload.role ?? "user", isLoggedIn: true, hydrated: true });
      setToken(t);
      api.getMe(t).then(({ user }) => {
        setState((prev) => ({ ...prev, email: user.email }));
      }).catch(() => {});
    }
  }

  function logout() {
    clearTokens();
    setState({ userId: null, email: null, role: "user", isLoggedIn: false, hydrated: true });
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
