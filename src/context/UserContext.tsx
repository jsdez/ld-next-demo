// context/UserContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: { name: string; group: "user" | "admin" } | null;
  login: (name: string) => void;
  logout: () => void;
  setGroup: (group: "user" | "admin") => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; group: "user" | "admin" } | null>(null);

  const login = (name: string) => {
    setUser({ name, group: "user" });  // Default group is "user"
  };

  const logout = () => {
    setUser(null);
  };

  const setGroup = (group: "user" | "admin") => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser!, // Use non-null assertion to ensure prevUser is not null
        group,
      }));
    }
  };
  

  return (
    <UserContext.Provider value={{ user, login, logout, setGroup }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
