// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle"; // Import ThemeToggle component

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      return savedTheme || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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

        {/* Use the ThemeToggle component */}
        <div className="ml-auto flex gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>
    </div>
  );
}
