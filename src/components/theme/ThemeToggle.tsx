"use client";

import { Sun, Moon } from "lucide-react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect } from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const ldClient = useLDClient();

  // Track initial theme on component mount
  useEffect(() => {
    if (ldClient) {
      ldClient.track("theme-selection", {
        themeSelected: theme,
        eventType: "initial_load",
        value: 1  // For custom numeric metrics
      });
    }
  }, [ldClient, theme]);

  // Handle theme toggle click
  const handleClick = () => {
    // Calculate the new theme that will be set after toggle
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Toggle the theme in the UI
    toggleTheme();

    // Track the click event as a custom count metric
    if (ldClient) {
      // Track the toggle action
      ldClient.track("themeclicktracker", { 
        buttonId: "btn-toggle-theme",
        fromTheme: theme,
        toTheme: newTheme,
        value: 1  // For count-based metrics, add a numeric value
      });
      
      // Also track which theme was selected for more detailed analysis
      ldClient.track("theme-selection", {
        themeSelected: newTheme, 
        eventType: "user_toggle",
        value: 1
      });
    }
  };

  return (
    <button
      onClick={handleClick}
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