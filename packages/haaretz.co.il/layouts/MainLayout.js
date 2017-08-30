import { StyleProvider } from '@haaretz/htz-components';

export default ({ children }) =>
  <StyleProvider>
    <div>
      {children}
    </div>
  </StyleProvider>;
