
/* global window */
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `embedsFileTemplate.js` file is this directory.
 * *************************************************************** */
import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconHourglassRunningOut from '../IconHourglassRunningOut';

describe('<IconHourglassRunningOut />', () => {
  /* The error tests are left as documentation, but are commented out for the redability of the test results */
  // describe('Errors', () => {
  //   it('throw an error when the value passed to the "size" prop isn't a number', () => {
  //     expect(() => felaSnapshotter(<IconHourglassRunningOut size="2rem" />)).toThrow(
  //       /^An Icon's "size" prop may only be passed a "number"/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconHourglassRunningOut color="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "color" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconHourglassRunningOut color={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (string)', () => {
  //     expect(() => felaSnapshotter(<IconHourglassRunningOut fill="red" />)).toThrow(
  //       /is not a named-color/
  //     );
  //   });
  //   it('throw an error when the value passed to the "fill" prop isn't a named color (array of strings)', () => {
  //     expect(() =>
  //       felaSnapshotter(<IconHourglassRunningOut fill={[ 'primary', 'nope', ]} />)
  //     ).toThrow(/is not a named-color/);
  //   });
  // });
  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <IconHourglassRunningOut />);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconHourglassRunningOut attrs={{ 'aria-hidden': true, }} />
    );
    testCase('add "id" attribute to DOM element', <IconHourglassRunningOut id="hasId" />);
    testCase(
      'add "onClick" attribute to DOM element',
      <IconHourglassRunningOut id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase("set icon's color", <IconHourglassRunningOut color={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's color responsively",
      <IconHourglassRunningOut
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's fill", <IconHourglassRunningOut fill={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's fill responsively",
      <IconHourglassRunningOut
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconHourglassRunningOut size={6} />);
    testCase(
      "set icon's size responsively",
      <IconHourglassRunningOut
        size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]}
      />
    );
    testCase(
      'set misc styles on an icon',
      <IconHourglassRunningOut miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconHourglassRunningOut
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
