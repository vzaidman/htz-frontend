import PropTypes from 'prop-types';
import { shallow, mount, } from 'enzyme';
// import toJson from 'enzyme-to-json';
import { createTheme, } from 'fela-bindings';

/**
 * A factory for creating Enzyme renderers of Fela components
 * with package configuration backed in.
 *
 * @param {function} renderer - The Fela renderer used in the targes package's tests
 * @param {Object} [baseTheme] - The `theme` object used in the target package
 *
 * @return {Object} - An Object with `shallow` and `mount` methods for testing
 * Fela components with Enzyme
 */
export default function createFelaEnzymeRenderers(renderer, baseTheme) {
  function felaShallow(node, options = {}, mockTheme) {
    const component = shallow(node, {
      context: {
        renderer,
        _FELA_THEME_: mockTheme || baseTheme,
      },
      ...options,
    });

    // component.snapshot = snapshot(component, renderer);
    return component;
  }

  function felaMount(node, mockTheme) {
    const theme = createTheme(mockTheme || baseTheme);

    const component = mount(node, {
      childContextTypes: {
        // eslint-disable-next-line react/forbid-prop-types
        renderer: PropTypes.object,
        // eslint-disable-next-line react/forbid-prop-types
        _FELA_THEME_: PropTypes.object,
      },
      context: {
        renderer,
        _FELA_THEME_: theme,
      },
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
