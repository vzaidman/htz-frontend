import React from 'react';
// import toJson from 'enzyme-to-json';
import { ApolloProvider, } from 'react-apollo';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import client from '../../../../styleguide/ApolloMockClient';

import A11yMenu from '../A11yMenu'; // eslint-disable-line import/no-named-as-default

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
        </ApolloProvider>
      );
      const button = output.find('button');
      expect(output.children().find('li').length).toBe(0);
      button.simulate('click');
      expect(output.children().find('li').length).toBe(2);
      // expect(toJson(output)).toMatchSnapshot();
    });
    // todo: fix this test
    //   it('check that a11yToggle change state and text in the button', () => {
    //     const output = felaMount(
    //       <ApolloProvider client={client}>
    //         <A11yMenu />
    //       </ApolloProvider>
    //     );
    //     const button = output.find('button');
    //     button.simulate('click');
    //     let toggleButton = output.find('button').at(1);
    //     expect(toggleButton.contains('הפעל מצב ניגודיות')).toEqual(true);
    //     toggleButton.simulate('click');
    //     toggleButton = output.find('button').at(1);
    //     console.log(toggleButton.contains('הפעל מצב ניגודיות'));
    //     toggleButton.simulate('click');
    //     expect(toggleButton.contains('הפסק מצב ניגודיות')).toEqual(true);
    //     toggleButton = output.find('button').at(1);
    //     expect(toggleButton.contains('הפעל מצב ניגודיות')).toEqual(true);
    //   });
  });
});
