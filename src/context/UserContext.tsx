"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// List of random user names
const randomNames = [
  "Oliver", "Harry", "George", "Charlie", "Jack", "Alfie", "Henry", "Freddie", "Oscar", "Archie",
  "Amelia", "Olivia", "Isla", "Ava", "Emily", "Poppy", "Sophie", "Lily", "Jessica", "Florence"
];


interface User {
  name: string;
  group: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  login: (name: string, group: "admin" | "user") => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser.group === "admin") {
          setUser(parsedUser); // Keep stored admin user
        }
      }
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateRandomName = (): string => {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
  };

  const login = (name: string, group: "admin" | "user") => {
    const newUser = group === "admin" ? { name, group } : { name: generateRandomName(), group };
    setUser(newUser);

    if (group === "admin" && typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(newUser)); // Store only admin users
    }

    console.log(`User logged in: ${newUser.name} (${group})`);
  };

  const logout = () => {
    setUser(null);
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
