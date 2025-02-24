import { useEffect, useState } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';

export default function FeatureListener() {
  const [flagValue, setFlagValue] = useState(false);
  const ldClient = useLDClient();

  useEffect(() => {
    if (!ldClient) return;

    // Set initial flag value
    const initialFlagValue = ldClient.variation('newFeature', false); // Set default as false
    setFlagValue(initialFlagValue);

    // Listen for changes to the feature flag
    const flagChangeListener = (newFlagValue: boolean) => {
      console.log(`Feature Flag Updated: ${newFlagValue}`);
      setFlagValue(newFlagValue); // Update UI state when the flag changes
    };

    ldClient.on('change:newFeature', flagChangeListener);
    return () => {
    };
  }, [ldClient]);

  return (
    <div>
      {flagValue ? (
        <p className="text-green-500">🚀 Feature is active!</p>
      ) : (
        <p className="text-red-500">🔒 Feature is inactive.</p>
      )}
    </div>
  );
}
