// lib/feature-flags/LaunchDarklyContext.tsx
import { useState, useEffect, ReactNode } from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { useUserContext } from "@/context/UserContext";

const clientSideID = process.env.NEXT_PUBLIC_CLIENT_SIDE_ID || "";

interface LaunchDarklyContextProps {
  children: ReactNode;
}

export default function LaunchDarklyContext({ children }: LaunchDarklyContextProps) {
  const { user } = useUserContext();
  const [LDProvider, setLDProvider] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLD = async () => {
      setIsLoading(true);
      
      try {
        // Configure user context for LaunchDarkly
        const userContext = user
          ? {
              kind: "user",
              key: user.name.toLowerCase().replace(/\s+/g, "-"),
              name: user.name,
              group: user.group,
            }
          : { kind: "anonymous", key: "anonymous" };
            
        const LD = await asyncWithLDProvider({
          clientSideID,
          context: userContext,
          options: { 
            bootstrap: "localStorage",
            streaming: true // Enable real-time updates
          },
        });

        setLDProvider(<LD>{children}</LD>);
      } catch (error) {
        console.error("Failed to initialize LaunchDarkly:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLD();
  }, [user, children]);

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Loading feature flags...</div>;
  }

  return LDProvider || <div>Failed to load feature flags</div>;
}