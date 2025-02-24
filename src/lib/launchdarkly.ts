import { withLDProvider } from 'launchdarkly-react-client-sdk';

const ldClientSideId = process.env.LD_SDK_KEY || '';

export const LDProvider = withLDProvider({
  clientSideID: ldClientSideId,
  options: { streaming: true },  // Enable real-time updates
})(() => null);
