/* global window */

export default isOn => {
  try {
    const html = window.document.getElementsByTagName('html')[0];
    html.style.overflow = isOn ? 'hidden' : null;
  }
  catch (error) { }
  return null;
};
