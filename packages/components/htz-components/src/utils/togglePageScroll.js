/* global document */

export default function togglePageScroll(isOn) {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    html.style.overflow = isOn ? 'hidden' : null;
    // todo: remove the touchAction disabling once the backdrop scrolling issue is fully resolved
    html.style.touchAction = isOn ? 'none' : null;
  }
  return null;
}
