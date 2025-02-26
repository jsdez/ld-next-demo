"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  group: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  login: (name: string, group: "admin" | "user") => void;
  logout: () => void;
  isLoading: boolean; // Add loading state
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track if we're still loading user data

  // Safely access localStorage only on client side
  useEffect(() => {
    // Only run on client
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (name: string, group: "admin" | "user") => {
    const newUser = { name, group };
    setUser(newUser);
    // Safely access localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    console.log(`User logged in: ${name} (${group})`);
  };

  const logout = () => {
    setUser(null);
    // Safely access localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
    }
    console.log("User logged out");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}