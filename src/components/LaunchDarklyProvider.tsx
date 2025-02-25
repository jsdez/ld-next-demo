"use client";

import { useEffect, useState, useRef } from "react";
import { LDProvider, useLDClient } from "launchdarkly-react-client-sdk"; // Import useLDClient hook
import { useUserContext } from "../context/UserContext";

const clientSideID = "67bc6700fb286d0bef6fb3a4";

export default function LaunchDarklyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const [context, setContext] = useState({
    kind: "user",
    key: "anonymous",
    email: "anonymous@unknown.com",
    group: "user",
  });

  const contextRef = useRef(context); // Use ref to store the context
  const ldClient = useLDClient(); // Access LaunchDarkly client

  useEffect(() => {
    // Ensure context updates when user state changes
    const updatedContext = user
      ? {
          kind: "user",
          key: "anonymous",
          email: `${user.name}@ABCcompany.com`,
          group: user.group,
        }
      : {
          kind: "user",
          key: "anonymous",
          email: "anonymous@unknown.com",
          group: "user",
        };

    // Log context sent to LaunchDarkly
    console.log("Sending context to LaunchDarkly:", updatedContext);

    // Ensure context updates properly
    if (ldClient) {
      ldClient.identify(updatedContext); // Update context for LaunchDarkly
      console.log("LaunchDarkly context updated:", updatedContext);
    }

    // Update context and trigger re-render
    setContext(updatedContext);
    contextRef.current = updatedContext; // Keep ref up-to-date
  }, [user, ldClient]); // Re-run when user changes or ldClient is available

  // Log the current context whenever it changes
  useEffect(() => {
    console.log("Current context:", context);
  }, [context]);

  return <LDProvider clientSideID={clientSideID} context={context}>{children}</LDProvider>;
}
