# LaunchDarkly Demo

## Setup

1. Clone the repo.
2. Create a `.env.local` file and add your LaunchDarkly SDK key: LD_SDK_KEY=your-launchdarkly-sdk-key-here
3. Install dependencies: npm install
4. Run the application: npm run dev

### To Test the Demo

- Toggle the feature flag in the LaunchDarkly dashboard to see the component show or hide.
- Use `FeatureListener.tsx` to see the instant update when the flag is toggled.
- For remediation, manually turn off the flag in the UI.