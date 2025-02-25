// components/ClientSideWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const LaunchDarklyProvider = dynamic(() => import('./LaunchDarklyProvider'), {
  ssr: false, // Disable SSR for this component
});

export default function ClientSideWrapper({ children }: { children: React.ReactNode }) {
  return <LaunchDarklyProvider>{children}</LaunchDarklyProvider>;
}
