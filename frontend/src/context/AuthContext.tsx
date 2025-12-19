import { useState, useMemo, type ReactNode } from 'react';
import { decodeJwt, isTokenExpired } from '../utils/jwt';
import { AuthContext } from './authTypes';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      return storedToken;
    }
    localStorage.removeItem('token');
    return null;
  });

  const user = useMemo(() => {
    if (token) {
      return decodeJwt(token);
    }
    return null;
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isClient = user?.role === 'CLIENT';

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAdmin,
        isClient,
        login,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
