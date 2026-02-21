"use client";

import { createContext, useState, useEffect } from "react";
import { getToken } from "../_services/cookies";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [tokenContext, setTokenContext] = useState();

  useEffect(() => {
    const isToken = getToken();
    setTokenContext(isToken);
  }, []);

  return (
    <AuthContext.Provider value={{ tokenContext, setTokenContext }}>
      {children}
    </AuthContext.Provider>
  );
}
