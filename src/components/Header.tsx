// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle"; // Import ThemeToggle component
import { useUserContext } from "../context/UserContext"; // Import the useUserContext hook

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      return savedTheme || "light";
    }
    return "light";
  });

  const { user, login, logout, setGroup } = useUserContext(); // Access user context and functions

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleGroup = () => {
    if (user) {
      setGroup(user.group === "user" ? "admin" : "user");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Image
            src={theme === "light" ? "/abc-company.png" : "/abc-company-light.png"}
            alt="ABC Company Logo"
            width={220} // Adjust width as needed
            height={48} // Adjust height as needed
          />
        </div>

        {/* Header Controls */}
        <div className="ml-auto flex gap-2">
          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={logout}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => login("John Doe")}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Login
            </button>
          )}

          {/* Toggle User/Admin Group */}
          {user && (
            <button
              onClick={toggleGroup}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              {user.group === "user" ? "Switch to Admin" : "Switch to User"}
            </button>
          )}
          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>
    </div>
  );
}
