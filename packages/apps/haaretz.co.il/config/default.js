module.exports = {
  // Why is this enabled in development? Because it's better to serve an
  // alternate service worker that doesn't actually cache anything and has the
  // opportunity to replace any service workers already running.
  serviceWorkerEnabled: true,
};
