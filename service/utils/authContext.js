// authContext.js
"use client"
import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromCookies } from "../auth";
import { showSessionExpiredToast } from "./sessionExpiredToast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();

  const handleUnauthorizedAccess = () => {
    router.push("/login");
    showSessionExpiredToast();
  };

  useEffect(() => {
    const authToken = getTokenFromCookies();
    if (!authToken) {
      handleUnauthorizedAccess();
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ handleUnauthorizedAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
