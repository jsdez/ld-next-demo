// hooks/useLaunchDarklyIdentify.ts
import { useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect, useCallback, useState } from "react";
import { useUserContext } from "@/context/UserContext";

export function useLaunchDarklyIdentify() {
  const ldClient = useLDClient();
  const { user, isLoading } = useUserContext();
  const [isClient, setIsClient] = useState(false);

  // Mark when running on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to identify user to LaunchDarkly
  const identifyUser = useCallback(() => {
    if (!isClient || !ldClient || isLoading) return;
    
    if (user) {
      const ldContext = {
        kind: "user",
        key: user.name.toLowerCase().replace(/\s+/g, "-"),
        name: user.name,
        group: user.group,
      };
      
      console.log("Identifying user to LaunchDarkly:", ldContext);
      
      // Update the LaunchDarkly context
      ldClient.identify(ldContext).then(() => {
        console.log("LaunchDarkly context updated successfully");
      }).catch(error => {
        console.error("Failed to update LaunchDarkly context:", error);
      });
    } else {
      // Identify as anonymous when no user
      const anonymousContext = { 
        kind: "anonymous", 
        key: "anonymous-user-" + Date.now(),
        anonymous: true 
      };
      
      ldClient.identify(anonymousContext).then(() => {
        console.log("LaunchDarkly anonymous context set");
      }).catch(error => {
        console.error("Failed to set anonymous context:", error);
      });
    }
  }, [ldClient, user, isLoading, isClient]);

  // Automatically identify user when context changes
  useEffect(() => {
    if (isClient && ldClient && !isLoading) {
      identifyUser();
    }
  }, [user, identifyUser, ldClient, isLoading, isClient]);

  return { identifyUser };
}