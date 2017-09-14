import config from 'config';

// Since Service Workers can be tricky, we leave some logging messages in here
// for now to assist with debugging.

const YES = '✅';
const NO = '❌';

// For fancier things that one might do here, see:
// * https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/src/registerServiceWorker.js
export default function registerServiceWorker() {
  const enabled = config.get('serviceWorkerEnabled');
  console.log('Application enabled Service Worker?', enabled ? YES : NO);
  if (enabled) {
    const supported = window.navigator.serviceWorker;
    console.log('Browser supports Service Worker?', supported ? YES : NO);
    if (supported) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registration succeeded.', YES);
        })
        .catch(err => {
          console.error(
            '[Application] Service Worker registration failed.',
            NO
          );
          console.error(err);
        });
    }
  }
}
