import PropTypes from 'prop-types';
import { shallow, mount, } from 'enzyme';
// import toJson from 'enzyme-to-json';
import { createTheme, } from 'fela-bindings';

/**
 * A factory for creating Enzyme renderers of Fela components
 * with package configuration backed in.
 *
 * @param {function} renderer - The Fela renderer used in the targes package's tests
 * @param {Object} [theme] - The `theme` object used in the target package
 *
 * @return {Object} - An Object with `shallow` and `mount` methods for testing
 * Fela components with Enzyme
 */
export default function createFelaEnzymeRenderers(renderer, theme) {
  function felaShallow(node, options = {}, userTheme) {
    const component = shallow(node, {
      context: {
        renderer,
        theme: userTheme || theme,
      },
      ...options,
    });

    // component.snapshot = snapshot(component, renderer);
    return component;
  }

  function felaMount(node, options = {}, userTheme) {
    const component = mount(node, {
      childContextTypes: {
        renderer: PropTypes.object,
        theme: PropTypes.object,
      },
      context: {
        renderer,
        theme: createTheme(userTheme || theme),
      },
      ...options,
    });

    // component.snapshot = snapshot(component, renderer);
    return component;
  }

  return { felaMount, felaShallow, };
}

// function snapshot(component, renderer) {
//   return () => ({
//     component: toJson(component),
//     // you should prettify this string
//     styles: renderToString(renderer),
//   });
// }
