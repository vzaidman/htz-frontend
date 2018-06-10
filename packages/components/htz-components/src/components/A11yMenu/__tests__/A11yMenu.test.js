import React from 'react';
import toJson from 'enzyme-to-json';
import htzTheme, { typesetter, } from '@haaretz/htz-theme';
import { ApolloProvider, } from 'react-apollo';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import client from '../../../../styleguide/ApolloMockClient';

import A11yMenu from '../A11yMenu'; // eslint-disable-line import/no-named-as-default

const btnStyle = Object.freeze({
  // Border width
  borderBottomWidth: 1,
  borderEndWidth: 1,
  borderStartWidth: 1,
  borderTopWidth: 1,

  // Border style
  borderBottomStyle: 'solid',
  borderEndStyle: 'solid',
  borderStartStyle: 'solid',
  borderTopStyle: 'solid',
  radius: 0,
  boxModel: { hp: 4, vp: 1, },

  // Font Style
  fontWeight: 'bold',

  neutralText: '#999999',
});

const colors = {
  a11yMenu: {
    text: '#111111',
    textOpenOrHover: '#222222',
    bgOpen: '#333333',
    bgHover: '#444444',
  },
  white: { base: '#555555', },
  secondary: { base: '#666666', '-10': '#777777', },
  neutral: { base: '#666666', '-10': '#777777', },
  button: { neutralText: '#888888', },
  primary: { '+1': '#999999', },
};

const mockTheme = {
  color: (color, variant = 'base') => colors[color][variant],
  a11yMenuI18n: {
    a11yToggle: state => `${state ? 'הפסק' : 'הפעל'} מצג ניגודיות`,
    menuItems: [
      {
        name: 'דווח על בעיית נגישות',
        url: 'mailto:accessibility@haaretz.co.il',
      },
    ],
  },
  type: typesetter,
  btnStyle,
  getTransitionString: htzTheme.getTransitionString,
  getTransition: htzTheme.getTransition,
  getDuration: htzTheme.getDuration,
  getDelay: htzTheme.getDelay,
  getTimingFunction: htzTheme.getTimingFunction,
};

describe('<A11yMenu', () => {
  describe('DOM element', () => {
    it('renders correctly with no props', () => {
      const { component, styles, } = felaSnapshotter(<A11yMenu />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('generate a click and return a list with 2 <li>', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <A11yMenu />
        </ApolloProvider>,
        mockTheme
      );
      const button = output.find('button');
      expect(output.children().find('li').length).toBe(0);
      button.simulate('click');
      expect(output.children().find('li').length).toBe(2);
      expect(toJson(output)).toMatchSnapshot();
    });
    it('check that a11yToggle change state and text in the button', () => {
      const output = felaMount(
        <ApolloProvider client={client}>
          <A11yMenu />
        </ApolloProvider>,
        mockTheme
      );
      const button = output.find('button');
      button.simulate('click');
      let toggleButton = output.find('button').at(1);
      expect(toggleButton.contains('הפעל מצג ניגודיות')).toEqual(true);
      toggleButton.simulate('click');
      toggleButton = output.find('button').at(1);
      expect(toggleButton.contains('הפסק מצג ניגודיות')).toEqual(true);
      toggleButton.simulate('click');
      toggleButton = output.find('button').at(1);
      expect(toggleButton.contains('הפעל מצג ניגודיות')).toEqual(true);
    });
  });
});
