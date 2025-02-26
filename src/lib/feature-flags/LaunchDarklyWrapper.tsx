// lib/feature-flags/LaunchDarklyWrapper.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUserContext } from '@/context/UserContext';

// Loading component that matches server rendering
const LoadingComponent = () => (
  <div className="flex items-center justify-center p-4">Loading feature flags...</div>
);

// Only import LaunchDarklyContext on the client side
const LaunchDarklyContext = dynamic(
  () => import('./LaunchDarklyContext'), 
  { 
    ssr: false,
    loading: () => <LoadingComponent />
  }
);

export default function LaunchDarklyWrapper({ children }: { children: ReactNode }) {
  const { isLoading: isLoadingUser } = useUserContext();
  const [isClient, setIsClient] = useState(false);
  
  // Only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // While the app is still on the server or the user is loading,
  // render the same content that would be seen during loading
  if (!isClient || isLoadingUser) {
    return <LoadingComponent />;
  }
  
  // Once we're on the client and user is loaded, render the LaunchDarkly context
  return <LaunchDarklyContext>{children}</LaunchDarklyContext>;
}