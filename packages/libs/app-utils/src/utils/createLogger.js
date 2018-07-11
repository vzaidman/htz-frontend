import config from 'config';
import createNodeLogger from './createNodeLogger';
import createBrowserLogger from './createBrowserLogger';

const defaultOptions = {
  name: 'defaultLogger',
  level: config.has('logLevel') ? config.get('logLevel') : undefined || 'info',
};

export default function createLogger(options = {}) {
  const passedOptions = Object.assign({}, defaultOptions, options);
  const logger = !process.browser
    ? createNodeLogger(passedOptions)
    : createBrowserLogger(passedOptions);

  // console.log(
  //   'creating logger with level: ', passedOptions.level
  // );
  return logger;
}
