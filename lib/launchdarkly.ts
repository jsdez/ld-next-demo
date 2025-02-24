import { withLDProvider } from 'launchdarkly-react-client-sdk';

const ldClientSideId = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID || '';

export const LDProvider = withLDProvider({
  clientSideID: ldClientSideId,
  options: { streaming: true },  // Enable real-time updates
})(() => null);
