/* globals window document */
const appendedScripts = [];

/**
 *
 * @param src = the script source url
 * @param id = a unique id for this script, to avoid duplications
 * @param isAsync = is this script is async or not
 * @param onLoadFunction = an init function (not required)
 * @param updateFunction = an update function (not required), in case that the script already exist in the DOM,
 *    but you're in need to refresh the already mounted elements
 * @param attributes = an object with additional attributes to be assign to the Script tag (not required).
 *    for example: {'data-pin-build': 'doBuild'}
 */

export const appendScript = (src, id, isAsync = false, onLoadFunction = null, updateFunction = null, attributes = null) => {
  if (appendedScripts.indexOf(id) === -1) {
    appendedScripts.push(id);
    const script = document.createElement('script');

    script.src = src;
    script.async = isAsync;
    script.id = id;

    if (attributes) {
      Object.keys(attributes).map(attribute => script.setAttribute(attribute, attributes[attribute]));
    }

    document.body.appendChild(script);

    script.addEventListener('load', onLoadFunction);
  }
  else if (updateFunction) {
    updateFunction();
  }
};
