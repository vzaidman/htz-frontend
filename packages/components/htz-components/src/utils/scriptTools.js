/* globals window document */
const appendedScripts = {};

/**
 *
 * @param {string} src
 *   the script source url
 * @param {string} id
 *   a unique id for this script, to avoid duplications
 * @param {boolean} isAsync
 *   is this script is async or not
 * @param {function} onLoadFunction
 *   an init function (not required)
 * @param {function} updateFunction
 *   an update function (not required), in case that the script already
 *   exist in the DOM, but you're in need to refresh the already mounted elements
 * @param {object} attributes
 *   an object with additional attributes to be assigned to the
 *   script tag (not required). e.g., `{'data-pin-build': 'doBuild'}`
 */
export const appendScript = (
  src,
  id,
  isAsync = false,
  onLoadFunction = null,
  updateFunction = null,
  attributes = null
) => {
  if (!appendedScripts[id]) {
    const script = document.createElement('script');

    script.src = src;
    script.async = isAsync;
    script.id = id;

    if (attributes) {
      Object.keys(attributes).map(attribute =>
        script.setAttribute(attribute, attributes[attribute])
      );
    }

    document.body.appendChild(script);

    appendedScripts[id] = {
      tag: script,
      isLoaded: false,
      callbacks: [ onLoadFunction, ],
    };

    script.addEventListener('load', runCallbacks(id));
  }
  else if (appendedScripts[id].isLoaded) {
    updateFunction && updateFunction();
  }
  else {
    appendedScripts[id].callbacks.push(onLoadFunction);
  }
};

function runCallbacks(id) {
  return () => {
    appendedScripts[id].isLoaded = true;
    appendedScripts[id].callbacks.map(callback => callback());
  };
}
