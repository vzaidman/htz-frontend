import React from 'react';
import EnzymeToJson from 'enzyme-to-json';
import htzTheme, { mq, typesetter, } from '@haaretz/htz-theme';
// import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import WelcomePage from '../WelcomePage';

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
});

const colors = {
  bodyText: {
    base: '#2f2f2f',
  },
  primary: {
    '-2': '#ffffff',
  },
  button: {
    primaryOpaqueText: 'white',
  },
  white: {
    base: '#ffffff',
  },
};

const mockTheme = {
  getZIndex: () => 1000,
  color: (color, variant = 'base') => colors[color][variant],
  welcomePageI18n: {
    texts: {
      headerHighLighted: 'headerHighLighted',
      headerNormal: 'headerNormal',
      bullets: [
        'butllets',
        'butllets2',
        'butllets3',
        'butllets4',
        'butllet5s',
        'butllets6',
      ],
    },
    buttonText: 'buttonText',
  },
  mq,
  type: typesetter,
  btnStyle,
  getTransitionString: htzTheme.getTransitionString,
  getTransition: htzTheme.getTransition,
  getDuration: htzTheme.getDuration,
  getDelay: htzTheme.getDelay,
  getTimingFunction: htzTheme.getTimingFunction,
};

describe('<WelcomePage>', () => {
  describe('DOM element', () => {
    it('renders correctly with shouldRender prop passed as true', () => {
      const wrapper = felaMount(
        <div>
          <div id="pageRoot">
            <WelcomePage shouldRender />
          </div>
          <div id="modalsRoot" />
        </div>,
        mockTheme
      );
      expect(EnzymeToJson(wrapper)).toMatchSnapshot();
    });
  });
});
