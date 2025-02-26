// lib/feature-flags/LaunchDarklyWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import LaunchDarklyContext to ensure it only runs on client
const LaunchDarklyContext = dynamic(
  () => import('./LaunchDarklyContext'), 
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center p-4">Loading feature flags...</div>
  }
);

export default function LaunchDarklyWrapper({ children }: { children: React.ReactNode }) {
  return <LaunchDarklyContext>{children}</LaunchDarklyContext>;
}