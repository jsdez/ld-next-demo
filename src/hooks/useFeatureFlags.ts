// hooks/useFeatureFlags.ts
import { useLDClient, useFlags } from "launchdarkly-react-client-sdk";
import { useCallback } from "react";

// Type definitions for all available feature flags
export interface FeatureFlags {
  enableChatbot: boolean;
  enableTheme: boolean;
  // Add other feature flags here
}

export function useFeatureFlags() {
  // Get all feature flags
  const flags = useFlags() as FeatureFlags;
  const ldClient = useLDClient();
  
  // Track events with consistent structure
  const trackEvent = useCallback((eventName: string, data?: Record<string, unknown>) => {
    if (ldClient) {
      ldClient.track(eventName, data);
    }
  }, [ldClient]);
  
  // Function to track time-based metrics
  const trackTimeMetric = useCallback((metricName: string, valueInSeconds: number, metadata?: Record<string, unknown>) => {
    if (ldClient) {
      ldClient.track(metricName, {
        value: valueInSeconds,
        ...metadata
      });
    }
  }, [ldClient]);
  
  return {
    // Feature flags
    flags,
    
    // Specific flags for easier access
    enableChatbot: flags.enableChatbot,
    enableTheme: flags.enableTheme,
    
    // Tracking methods
    trackEvent,
    trackTimeMetric
  };
}