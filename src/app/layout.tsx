// app/layout.tsx
import type { Metadata } from "next";
import React from "react"; // Explicitly import React
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "../context/UserContext"; // Import UserContext
import ClientSideWrapper from "../components/ClientSideWrapper"; // Import the ClientSideWrapper component

export const metadata: Metadata = {
  title: "ABC Company",
  description: "Cutting-edge automation solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire app with UserProvider */}
        <UserProvider>
          {/* Use ClientSideWrapper to wrap the LaunchDarklyProvider */}
          <ClientSideWrapper>
            <Header />
            {children}
          </ClientSideWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
