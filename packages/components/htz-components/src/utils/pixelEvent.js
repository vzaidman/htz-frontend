/* global fbq */


// gets args that should be passed to fb pixel fbq function
// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking
export default (...args) => {
  if (fbq) {
    fbq(args);
  }
  else {
    console.warn('tried to fire a facebook pixel event but fbq is not defined');
  }
};
