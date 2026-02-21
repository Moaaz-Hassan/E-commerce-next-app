"use client";

import { createContext, useState, useEffect, ReactNode } from "react"; // لازم import ReactNode
import { getToken } from "../_services/cookies";

interface AuthContextType {
  tokenContext: string | null;
  setTokenContext: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [tokenContext, setTokenContext] = useState<string | null>(null);

  useEffect(() => {
    const isToken = getToken();
    setTokenContext(isToken ?? null);
  }, []);

  return (
    <AuthContext.Provider value={{ tokenContext, setTokenContext }}>
      {children}
    </AuthContext.Provider>
  );
}
