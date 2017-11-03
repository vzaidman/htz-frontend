/* @flow */

/**
 * Make an element hidden from sighted users, but visible to
 * assistive technology (e.g., screen readers).
 *
 * @param [isFocusable=false] - Allow the element to be focusable when navigated to
 *   via the keyboard
 */
export default function visuallyHidden(isFocusable: boolean = false): Object {
  const focusableStyles = {
    clip: 'auto',
    clipPath: 'none',
    height: 'auto',
    margin: '0',
    overflow: 'visible',
    position: 'static',
    width: 'auto',
    whiteSpace: 'inherit',
  };

  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    width: '1px',
    whiteSpace: 'nowrap',
    ...(isFocusable === true
      ? {
        ':focus': focusableStyles,
        ':active': focusableStyles,
      }
      : undefined),
  };
}
