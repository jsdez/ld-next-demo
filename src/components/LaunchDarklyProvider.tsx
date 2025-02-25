import { useState, useEffect, ReactNode } from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { useUserContext } from "@/context/UserContext";

const clientSideID = process.env.NEXT_PUBLIC_CLIENT_SIDE_ID || ""; // Ensure it's defined in .env.local

interface LaunchDarklyWrapperProps {
  children: ReactNode;
}

export default function LaunchDarklyProvider({ children }: LaunchDarklyWrapperProps) {
  const { user } = useUserContext(); // Get user from context
  const [LDProvider, setLDProvider] = useState<ReactNode | null>(null);

  useEffect(() => {
    const initializeLD = async () => {
      const LD = await asyncWithLDProvider({
        clientSideID,
        context: user
          ? {
              kind: "user",
              key: user.name.toLowerCase().replace(/\s+/g, "-"),
              name: user.name,
              group: user.group,
            }
          : { kind: "anonymous", key: "anonymous" },
        options: { bootstrap: "localStorage" }, // Can use "none" if real-time updates are needed
      });

      setLDProvider(<LD>{children}</LD>); // Store the dynamically loaded provider
    };

    initializeLD();
  }, [user, children]); // Re-run when user context or children changes

  return LDProvider || <p>Loading feature flags...</p>; // Avoid rendering null
}
