/* global document */
const toggleHandler = (id, addToggleHandler, fn) => {
  if (!id) return undefined;
  const element = id.tagName ? id : document.getElementById(id);
  if (element) {
    addToggleHandler
      ? element.addEventListener('click', fn)
      : element.removeEventListener('click', fn);
    return element;
  }

  return undefined;
};

export default {
  setToggleHandler: (id, fn) => toggleHandler(id, true, fn),
  clearHandler: (id, fn) => toggleHandler(id, false, fn),
};
