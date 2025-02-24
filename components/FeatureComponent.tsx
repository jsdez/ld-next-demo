import { useFlags } from 'launchdarkly-react-client-sdk';

export default function FeatureComponent() {
  const { newFeature } = useFlags();

  return (
    <div>
      {newFeature ? (
        <p className="text-green-500">🚀 New Feature Enabled!</p>
      ) : (
        <p className="text-red-500">🔒 Feature Not Available</p>
      )}
    </div>
  );
}
