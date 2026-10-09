import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@shareit/shared";
import { getMe } from "@/api/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  setSession: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() =>
    typeof window !== "undefined" && Boolean(window.localStorage.getItem("token")),
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const setSession = (u: User, token: string) => {
    localStorage.setItem("token", token);
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus di dalam AuthProvider");
  return ctx;
};