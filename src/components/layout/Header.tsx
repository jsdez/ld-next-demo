"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "../theme/ThemeToggle"; // Import ThemeToggle component
import { useUserContext } from "src/context/UserContext"; // Import the useUserContext hook
import { useFlags } from "launchdarkly-react-client-sdk"; // Import the useFlags hook from LaunchDarkly

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      return savedTheme || "light";
    }
    return "light";
  });

  const { user, login, logout } = useUserContext(); // Access user context and functions
  const { enableTheme } = useFlags(); // Get the feature flag for enabling the theme toggle

  // Log context changes for debugging
  useEffect(() => {
    if (user) {
      console.log(`User context updated: ${user.name} - Group: ${user.group}`);
    } else {
      console.log("No user logged in.");
    }
  }, [user]); // Trigger on user change

  // Log theme changes for debugging
  useEffect(() => {
    console.log(`Theme updated: ${theme}`);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle login as admin or user
  const handleLoginAsAdmin = () => {
    login("Admin User", "admin"); // Pass group as "admin"
  };

  const handleLoginAsUser = () => {
    login("Regular User", "user"); // Pass group as "user"
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
          {/* Login as Admin or User */}
          {!user ? (
            <>
              <button
                onClick={handleLoginAsAdmin}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Login as Admin
              </button>

              <button
                onClick={handleLoginAsUser}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Login as User
              </button>
            </>
          ) : (
            // Show logout button when user is logged in
            <button
              onClick={logout}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Logout
            </button>
          )}

          {/* Conditionally render Theme Toggle based on feature flag */}
          {enableTheme && (
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          )}
        </div>
      </header>
    </div>
  );
}
