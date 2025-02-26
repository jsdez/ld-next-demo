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
  const [LDProvider, setLDProvider] = useState<React.ComponentType<{ children: ReactNode }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const initializeLD = async () => {
      setIsLoading(true);
      
      try {
        // Configure user context for LaunchDarkly - with fallback
        const userContext = user
          ? {
              kind: "user",
              key: user.name.toLowerCase().replace(/\s+/g, "-"),
              name: user.name,
              group: user.group,
            }
          : { 
              kind: "anonymous", 
              key: "anonymous-user-" + Date.now().toString(),
              anonymous: true
            };
            
        const LDProvider = await asyncWithLDProvider({
          clientSideID,
          context: userContext,
          options: { 
            bootstrap: "localStorage",
            streaming: true,
            sendEvents: true,
          },
        });

        if (isMounted) {
          setLDProvider(() => LDProvider);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to initialize LaunchDarkly:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeLD();
    
    return () => {
      isMounted = false;
    };
  }, [user?.name, user?.group]); 

  if (isLoading || !LDProvider) {
    return <div className="flex items-center justify-center p-4">Loading feature flags...</div>;
  }

  const Provider = LDProvider;
  return <Provider>{children}</Provider>;
}