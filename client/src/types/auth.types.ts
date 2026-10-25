import type { ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
