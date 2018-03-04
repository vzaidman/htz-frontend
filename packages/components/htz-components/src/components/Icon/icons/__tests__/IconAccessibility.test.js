import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconAccessibility from '../IconAccessibility';

describe('<IconAccessibility />', () => {
  describe('Errors', () => {
    it('throw an error when the value passed to the "size" prop isn\'t a number', () => {
      expect(() => felaSnapshotter(<IconAccessibility size="2rem" />)).toThrow(
        /^An Icon's "size" prop may only be passed a "number"/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconAccessibility color="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconAccessibility color={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconAccessibility fill="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconAccessibility fill={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
  });
  describe('DOM element', () => {
    testCase(
      'render correctly when no props are passed',
      <IconAccessibility />
    );
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconAccessibility attrs={{ 'aria-hidden': true, }} />
    );
    testCase(
      'add "id" attribute to DOM element',
      <IconAccessibility id="hasId" />
    );
    testCase(
      'add "onClick" attribute to DOM element',
      <IconAccessibility id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase(
      "set icon's color",
      <IconAccessibility color={[ 'primary', 'base', ]} />
    );
    testCase(
      "set icon's color responsively",
      <IconAccessibility
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase(
      "set icon's fill",
      <IconAccessibility fill={[ 'primary', 'base', ]} />
    );
    testCase(
      "set icon's fill responsively",
      <IconAccessibility
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconAccessibility size={6} />);
    testCase(
      "set icon's size responsively",
      <IconAccessibility
        size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]}
      />
    );
    testCase(
      'set misc styles on an icon',
      <IconAccessibility miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconAccessibility
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
