/* globals window document */
const appendedScripts = [];

/**
 *
 * @param src = the script source url
 * @param id = a unique id for this script, to avoid duplications
 * @param isAsync = is this script is async or not
 * @param onLoadFunction = an init function (not require)
 * @param update = an update function (not require), in case that the script already exist in the DOM,
 *    but you're in need to refresh the already mounted elements
 */

const appendScript = (
  src,
  id,
  isAsync,
  onLoadFunction = null,
  update = null
) => {
  if (appendedScripts.indexOf(id) === -1) {
    appendedScripts.push(id);
    const script = document.createElement('script');

    script.src = src;
    script.async = isAsync;
    script.id = id;

    document.body.appendChild(script);

    script.addEventListener('load', onLoadFunction);
  }
  else if (update) {
    update();
  }
};

export default { appendScript, };
