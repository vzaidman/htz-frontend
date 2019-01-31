import React from 'react';
// import toJson from 'enzyme-to-json';
import htzTheme, { typesetter, } from '@haaretz/htz-theme';
import { ApolloProvider, } from 'react-apollo';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../../test-helpers/felaEnzymeRenderers';
import client from '../../../../../styleguide/ApolloMockClient';

import MastheadUserMenu from '../MastheadUserMenu';

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

  neutralText: '#131313',
});

const colors = {
  userMenu: {
    bgHover: '#111111',
    bgOpen: '#222222',
    iconColor: '#333333',
    text: '#444444',
    textOpenOrHover: '#555555',
  },
  white: { base: '#666666', },
  secondary: { base: '#777777', '-10': '#666666', },
  neutral: { base: '#888888', '-10': '#666666', },
  button: { neutralText: '#999999', },
  primary: { '+1': '#121212', },
};

const mockTheme = {
  color: (color, variant = 'base') => colors[color][variant],
  userMenuI18n: {
    noUserData: 'התחברות',
    buttonText: 'שלום',
    logout: 'התנתקות',
    menuItems: [
      {
        name: 'הגדרות',
        url: 'https://www.haaretz.co.il/personal-area/my-account',
      },
      {
        name: 'שירות למנויים',
        url: 'https://www.haaretz.co.il/personal-area/my-account',
      },
      {
        name: 'ניוזלטרים',
        url: 'https://www.haaretz.co.il/personal-area/newsletter',
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

describe('<MastheadUserMenu', () => {
  describe('DOM element', () => {
    it('renders correctly with no props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <MastheadUserMenu />
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <MastheadUserMenu />
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
