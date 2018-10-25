/* global window */

export default isOn => {
  try {
    const html = window.document.getElementsByTagName('html')[0];
    html.style.overflow = isOn ? 'hidden' : null;
    // todo: remove the touchAction disabling once the backdrop scrolling issue is fully resolved
    html.style.touchAction = isOn ? 'none' : null;
  }
  catch (error) { }
  return null;
};
