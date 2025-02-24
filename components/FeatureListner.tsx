import { useEffect } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';

export default function FeatureListener() {
  const ldClient = useLDClient();

  useEffect(() => {
    if (!ldClient) return;

    ldClient.on('change:newFeature', (flagValue) => {
      console.log(`Feature Flag Updated: ${flagValue}`);
    });
  }, [ldClient]);

  return null;
}