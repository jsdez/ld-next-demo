import { withLDProvider } from 'launchdarkly-react-client-sdk';
import { ReactNode } from 'react';

const ldClientSideId = process.env.LD_SDK_KEY || '';

import App from './App';

const LDProvider = withLDProvider({

  clientSideID: 'client-side-id-123abc',

  context: {

    "kind": "user",

    "key": "user-key-123abc",

    "name": "Sandy Smith",

    "email": "sandy@example.com"

  },

  options: { /* ... */ }

})(App);

const rootElement = document.getElementById("root");

render(<LDProvider />, rootElement);