import { createContext } from 'react';
import type { JwtPayload } from '../utils/jwt';

export interface AuthContextType {
  token: string | null;
  user: JwtPayload | null;
  isAdmin: boolean;
  isClient: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

