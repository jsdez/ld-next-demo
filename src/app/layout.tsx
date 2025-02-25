// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "../context/UserContext";

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
          <Header />
          {children} {/* This will be handled in page.tsx for user context */}
        </UserProvider>
      </body>
    </html>
  );
}
