"use client";

import { Sun, Moon } from "lucide-react";
import { useLDClient } from "launchdarkly-react-client-sdk"; // Import the hook for LaunchDarkly client

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const ldClient = useLDClient(); // Access the LDClient

  // Handle theme toggle click
  const handleClick = () => {
    toggleTheme(); // Toggle the theme

    // Use the SDK's client.track() to emit the event to LaunchDarkly
    if (ldClient) {
      ldClient.track("clicktracker", { 
        target: "btn-toggle-theme",  // You can also pass other properties if needed
      });
    }
  };

  return (
    <button
      onClick={handleClick}  // Call the new click handler
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={`btn-toggle-theme rounded-full p-3 focus:outline-none focus:ring-0 ${
        theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-white"
      }`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
