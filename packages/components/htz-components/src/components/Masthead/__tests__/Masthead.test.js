import React from 'react';
// import toJson from 'enzyme-to-json';
// import { ApolloProvider, } from 'react-apollo';
// import htzTheme from '@haaretz/htz-theme';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
// import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
// import Masthead from '../Masthead';
// import client from '../../../../styleguide/ApolloMockClient';

// Math.random = jest.fn(() => 0.123456789);

// const btnStyle = Object.freeze({
//   // Border width
//   borderBottomWidth: 1,
//   borderEndWidth: 1,
//   borderStartWidth: 1,
//   borderTopWidth: 1,

//   // Border style
//   borderBottomStyle: 'solid',
//   borderEndStyle: 'solid',
//   borderStartStyle: 'solid',
//   borderTopStyle: 'solid',
//   radius: 0,
//   boxModel: { hp: 4, vp: 1, },

//   // Font Style
//   fontWeight: 'bold',

//   neutralText: '#131313',
// });

// const colors = {
//   a11yMenu: {
//     text: '#111111',
//     textOpenOrHover: '#222222',
//     bgOpen: '#333333',
//     bgHover: '#444444',
//   },
//   userMenu: {
//     bgHover: '#111111',
//     bgOpen: '#222222',
//     iconColor: '#333333',
//     text: '#444444',
//     textOpenOrHover: '#555555',
//   },
//   headerSearch: {
//     text: '#111111',
//     bgHover: '#222222',
//     bgInputOpen: '#333333',
//     textOpenOrHover: '#444444',
//     bgOpen: '#555555',
//   },
//   white: { base: '#666666', },
//   secondary: { base: '#777777', '-10': '#666666', },
//   neutral: { base: '#888888', '-10': '#666666', '-3': '#111111', },
//   button: { neutralText: '#999999', },
//   primary: { '+1': '#121212', },
//   input: {
//     // Primary
//     primaryBg: '#111111',
//     primaryBgWrapper: '#111111',
//     primaryBorder: '#111111',
//     primaryBorderTextLabel: '#111111',
//     primaryPlaceholder: '#111111',
//     primaryText: '#111111',
//     primaryTextLabel: '#111111',
//     primaryTextLabelDisabled: '#111111',
//     primaryTextNote: '#111111',
//     primaryAbbr: '#111111',

//     // Primary Focus
//     primaryFocusBg: '#111111',
//     primaryFocusBorder: '#111111',

//     // Primary Error state
//     primaryErrorBorder: '#111111',
//     primaryErrorText: '#111111',
//     primaryErrorTextLabel: '#111111',
//     primaryErrorTextNote: '#111111',

//     // Primary Hover
//     primaryHoverBg: '#111111',
//     primaryHoverBorder: '#111111',
//     primaryHoverText: '#111111',

//     // PrimaryInverse
//     primaryInverseBg: '#111111',
//     primaryInverseBgWrapper: '#111111',
//     primaryInverseBorder: '#111111',
//     primaryInverseBorderTextLabel: '#111111',
//     primaryInversePlaceholder: '#111111',
//     primaryInverseText: '#111111',
//     primaryInverseTextLabel: '#111111',
//     primaryInverseTextLabelDisabled: '#111111',
//     primaryInverseTextNote: '#111111',
//     primaryInverseAbbr: '#111111',

//     // PrimaryInverse Focus
//     primaryInverseFocusBg: '#111111',
//     primaryInverseFocusBorder: '#111111',

//     // PrimaryInverse Error state
//     primaryInverseErrorBorder: '#111111',
//     primaryInverseErrorText: '#111111',
//     primaryInverseErrorTextLabel: '#111111',
//     primaryInverseErrorTextNote: '#111111',

//     // PrimaryInverse Hover
//     primaryInverseHoverBg: '#111111',
//     primaryInverseHoverBorder: '#111111',
//     primaryInverseHoverText: '#111111',
//   },
// };

// const mockTheme = {
//   userMenuI18n: Object.freeze({
//     noUserData: 'התחברות',
//     buttonText: 'שלום',
//     menuItems: Object.freeze([
//       Object.freeze({
//         name: 'הגדרות',
//         url: 'https://www.haaretz.co.il/personal-area/my-account',
//       }),
//       Object.freeze({
//         name: 'שירות למנויים',
//         url: 'https://www.haaretz.co.il/personal-area/my-account',
//       }),
//       Object.freeze({
//         name: 'ניוזלטרים',
//         url: 'https://www.haaretz.co.il/personal-area/newsletter',
//       }),
//     ]),
//     logout: 'התנתקות',
//   }),
//   navigationMenuI18n: Object.freeze({
//     buttonText: 'ניווט',
//   }),
//   color: (color, variant = 'base') => colors[color][variant],
//   headerSearchI18n: Object.freeze({
//     buttonText: 'חיפוש',
//     placeHolder: 'הקלידו לחיפוש באתר',
//     queryUrl: query =>
//       `https://www.haaretz.co.il/misc/search-results?text=${query}&searchType=textSearch`,
//   }),
//   inputStyle: Object.freeze({
//     borderWidth: 1,
//     lines: 1,
//     borderStyle: 'solid',
//     radius: 0,
//     height: 6,
//     // typographic Scale from theme
//     typeScale: 0,
//     fontWeightLabel: 'bold',
//   }),
//   btnStyle,
//   getDelay: htzTheme.getDelay,
//   getDuration: htzTheme.getDuration,
//   getTimingFunction: htzTheme.getTimingFunction,
//   getTransition: htzTheme.getTransition,
//   getTransitionString: htzTheme.getTransitionString,
//   mq: htzTheme.mq,
//   type: htzTheme.type,
// };

// TODO: fix this test without the media in the component.
describe.skip('<MainHeader', () => {
  describe('DOM element', () => {
    it('check that opening the search input hide the other components', () => {
      const component = felaSnapshotter(<div>WIP</div>);
      expect(component).toMatchSnapshot();
      //   const output = felaMount(
      //     <ApolloProvider client={client}>
      //       <Masthead hostname="haaretz.co.il" contentId="1" />
      //     </ApolloProvider>
      //   );
      // let wrapper = output.find('header');
      // expect(toJson(wrapper)).toMatchSnapshot();
      // const button = output.find('button').at(1);
      // button.simulate('click');
      // wrapper = output.find('header');
      // expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
