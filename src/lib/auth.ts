"use client";

import Cookies from "js-cookie";

const ACCESS_KEY = "blog_token";
const REFRESH_KEY = "blog_refresh_token";

export function getToken(): string | undefined {
  return Cookies.get(ACCESS_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  // Access token expires in 1 hour
  Cookies.set(ACCESS_KEY, accessToken, { expires: 1 / 24, sameSite: "lax" });
  // Refresh token expires in 7 days
  Cookies.set(REFRESH_KEY, refreshToken, { expires: 7, sameSite: "lax" });
}

export function clearTokens(): void {
  Cookies.remove(ACCESS_KEY);
  Cookies.remove(REFRESH_KEY);
}

export interface JwtPayload {
  sub: string;
  role: "user" | "moderator" | "admin";
  exp: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload)) as JwtPayload;
  } catch {
    return null;
  }
}
