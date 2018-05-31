/* global document */
const setAriaHidden = (boolean, id) => {
  if (!id) return;
  const element = id.tagName
    ? id
    : typeof id === 'string' && id.startsWith('#')
      ? document.getElementById(id.slice(1))
      : document.getElementById(id);
  if (!element) return;
  boolean
    ? element.setAttribute('aria-hidden', true)
    : element.removeAttribute('aria-hidden');
};

const set = id => setAriaHidden(true, id);

const remove = id => setAriaHidden(false, id);

export default {
  set,
  remove,
};
