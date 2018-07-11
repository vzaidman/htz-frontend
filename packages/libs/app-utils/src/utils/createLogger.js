import createNodeLogger from './createNodeLogger';
import createBrowserLogger from './createBrowserLogger';

const defaultOptions = {
  name: 'defaultLogger',
};

export default function createLogger(options = defaultOptions) {
  return !process.browser
    ? createNodeLogger(options)
    : createBrowserLogger(options);
}
