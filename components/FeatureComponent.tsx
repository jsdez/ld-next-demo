import { useFlags } from 'launchdarkly-react-client-sdk';
import { useState } from 'react';

export default function FeatureComponent() {
  const { newFeature } = useFlags(); // Read the current feature flag value from LaunchDarkly
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(newFeature); // Use local state for toggling

  // Function to toggle the feature flag manually
  const toggleFeatureFlag = () => {
    // Toggle the local feature flag value
    const newFlagValue = !isFeatureEnabled;
    setIsFeatureEnabled(newFlagValue); // Update the local state to reflect the new feature flag value
  };

  return (
    <div>
      {isFeatureEnabled ? (
        <p className="text-green-500">🚀 New Feature Enabled!</p>
      ) : (
        <p className="text-red-500">🔒 Feature Not Available</p>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={toggleFeatureFlag}
      >
        Toggle Feature
      </button>
    </div>
  );
}
