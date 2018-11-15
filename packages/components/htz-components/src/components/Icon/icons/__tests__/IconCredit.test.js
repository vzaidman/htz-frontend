
/* global window */
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `embedsFileTemplate.js` file is this directory.
 * *************************************************************** */
import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconCredit from '../IconCredit';

describe('<IconCredit />', () => {
  /* The error tests are left as documentation, but are commented out for the redability of the test results */
  // describe('Errors', () => {
  //   it('throw an error when the value passed to the "size" prop isn't a number', () => {
  //     expect(() => felaSnapshotter(<IconCredit size="2rem" />)).toThrow(
  //       /^An Icon's "size" prop may only be passed a "number"/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconCredit color="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconCredit color={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconCredit fill="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconCredit fill={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  // });
  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <IconCredit />);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconCredit attrs={{ 'aria-hidden': true, }} />
    );
    testCase('add "id" attribute to DOM element', <IconCredit id="hasId" />);
    testCase(
      'add "onClick" attribute to DOM element',
      <IconCredit id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase("set icon's color", <IconCredit color={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's color responsively",
      <IconCredit
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's fill", <IconCredit fill={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's fill responsively",
      <IconCredit
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconCredit size={6} />);
    testCase(
      "set icon's size responsively",
      <IconCredit
        size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]}
      />
    );
    testCase(
      'set misc styles on an icon',
      <IconCredit miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconCredit
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
