/* global window */
/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `embedsFileTemplate.js` file is this directory.
 * *************************************************************** */
import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconAlefLogoTransparent from '../IconAlefLogoTransparent';

describe('<IconAlefLogoTransparent />', () => {
  /* The error tests are left as documentation, but are commented out for the redability of the test results */
  // describe('Errors', () => {
  //   it('throw an error when the value passed to the "size" prop isn't a number', () => {
  //     expect(() => felaSnapshotter(<IconAlefLogoTransparent size="2rem" />)).toThrow(
  //       /^An Icon's "size" prop may only be passed a "number"/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconAlefLogoTransparent color="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconAlefLogoTransparent color={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconAlefLogoTransparent fill="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconAlefLogoTransparent fill={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  // });
  describe('DOM element', () => {
    testCase(
      'render correctly when no props are passed',
      <IconAlefLogoTransparent />
    );
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconAlefLogoTransparent attrs={{ 'aria-hidden': true, }} />
    );
    testCase(
      'add "id" attribute to DOM element',
      <IconAlefLogoTransparent id="hasId" />
    );
    testCase(
      'add "onClick" attribute to DOM element',
      <IconAlefLogoTransparent id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase(
      "set icon's color",
      <IconAlefLogoTransparent color={[ 'primary', 'base', ]} />
    );
    testCase(
      "set icon's color responsively",
      <IconAlefLogoTransparent
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase(
      "set icon's fill",
      <IconAlefLogoTransparent fill={[ 'primary', 'base', ]} />
    );
    testCase(
      "set icon's fill responsively",
      <IconAlefLogoTransparent
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconAlefLogoTransparent size={6} />);
    testCase(
      "set icon's size responsively",
      <IconAlefLogoTransparent
        size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]}
      />
    );
    testCase(
      'set misc styles on an icon',
      <IconAlefLogoTransparent miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconAlefLogoTransparent
        miscStyles={{
          position: [
            { until: 'xl', value: 'relative', },
            { from: 'xl', value: 'static', },
          ],
        }}
      />
    );
  });
});

function testCase(name, Component, { only = false, } = {}) {
  const testFunc = only ? it.only : it;
  testFunc(name, () => {
    const { component, styles, } = felaSnapshotter(Component);
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
}
