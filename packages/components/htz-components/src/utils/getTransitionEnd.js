/* global window, document, navigator */
export default element => {
  if ('ontransitionend' in window) {
    // Firefox
    return 'transitionend';
  }
  if ('onwebkittransitionend' in window) {
    // Chrome/Saf (+ Mobile Saf)/Android
    return 'webkitTransitionEnd';
  }
  if ('onotransitionend' in element || navigator.appName === 'Opera') {
    // Opera
    // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
    // so it will always use the navigator.appName fallback
    return 'oTransitionEnd';
  }
  // IE - not implemented (even in IE9) :(
  return false;
};
