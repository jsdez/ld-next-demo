// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { UserProvider } from "../context/UserContext"; // Wrap app with user context
import ClientSideWrapper from "../lib/feature-flags/LaunchDarklyWrapper"; // Wrap with LaunchDarklyProvider

export const metadata: Metadata = {
  title: "ABC Company",
  description: "Cutting-edge automation solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider> {/* Ensure UserProvider wraps everything */}
          <ClientSideWrapper> {/* Ensures LaunchDarklyProvider is inside UserProvider */}
            <Header />
            {children}
          </ClientSideWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
