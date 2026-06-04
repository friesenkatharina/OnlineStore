import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthUser = { username: string; email: string } | null;

type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  refresh: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    setLoading(true);
    fetch("/api/users/me", { credentials: "include" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUser(); }, []);

  const logout = async () => {
    await fetch("/api/users/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
