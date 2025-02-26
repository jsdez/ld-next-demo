"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "../theme/ThemeToggle";
import { useUserContext } from "src/context/UserContext";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useLaunchDarklyIdentify } from "@/hooks/useLaunchDarklyIdentify"; // Import the new hook

export default function Header() {
  // Initialize with a default theme
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);

  const { user, login, logout, isLoading } = useUserContext();
  const flags = useFlags();
  const enableTheme = flags?.enableTheme || false;
  const ldClient = useLDClient();
  
  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
    // Now safely access localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(savedTheme || "light");
  }, []);
  
  // Use the identify hook to ensure context is updated
  useLaunchDarklyIdentify();

  // Skip effects during server-side rendering
  useEffect(() => {
    if (!isClient) return;
    
    if (user) {
      console.log(`Header component: User context updated: ${user.name} - Group: ${user.group}`);
    } else if (!isLoading) {
      console.log("Header component: No user logged in.");
    }
  }, [user, isLoading, isClient]);

  // Only run theme effects on client-side
  useEffect(() => {
    if (!isClient) return;
    
    console.log(`Theme updated: ${theme}`);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    // Track theme preference in LaunchDarkly
    if (ldClient && user) {
      ldClient.track("theme-preference", {
        theme: theme,
        userName: user.name,
        userGroup: user.group
      });
    }
  }, [theme, ldClient, user, isClient]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Handle login as admin or user
  const handleLoginAsAdmin = () => {
    login("Admin User", "admin");
  };

  const handleLoginAsUser = () => {
    login("Regular User", "user");
  };

  // Handle logout with LaunchDarkly context reset
  const handleLogout = () => {
    logout();
    // When user logs out, identify as anonymous
    if (ldClient) {
      ldClient.identify({ 
        kind: "anonymous", 
        key: "anonymous-user-" + Date.now(),
        anonymous: true 
      });
    }
  };

  const logoSrc = theme === "light" ? "/abc-company.png" : "/abc-company-light.png";

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          {isClient ? (
            <Image
              src={logoSrc}
              alt="ABC Company Logo"
              width={220}
              height={48}
            />
          ) : (
            <div/>
          )}
        </div>

        {/* Header Controls */}
        <div className="ml-auto flex gap-2">
          {/* Only render user controls on client */}
          {isClient && !isLoading && (
            <>
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
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Logout
                </button>
              )}

              {/* Conditionally render Theme Toggle based on feature flag */}
              {enableTheme && (
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}