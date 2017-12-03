import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconMailAlert from '../IconMailAlert';

describe('<IconMailAlert />', () => {
  describe('Errors', () => {
    it('throw an error when the value passed to the "size" prop isn\'t a number', () => {
      expect(() => felaSnapshotter(<IconMailAlert size="2rem" />)).toThrow(
        /^An Icon's "size" prop may only be passed a "number"/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconMailAlert color="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconMailAlert color={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconMailAlert fill="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconMailAlert fill={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
  });
  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <IconMailAlert />);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconMailAlert attrs={{ 'aria-hidden': true, }} />
    );
    testCase(
      'add "id" attribute to DOM element',
      <IconMailAlert id="hasId" />
    );
    testCase(
      'add "onClick" attribute to DOM element',
      <IconMailAlert id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase("set icon's color",
      <IconMailAlert color={[ 'primary', 'base', ]} />
    );
    testCase("set icon's color responsively",
      <IconMailAlert
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's fill",
      <IconMailAlert fill={[ 'primary', 'base', ]} />
    );
    testCase("set icon's fill responsively",
      <IconMailAlert
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size",
      <IconMailAlert size={6} />
    );
    testCase("set icon's size responsively",
      <IconMailAlert
        size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]}
      />
    );
    testCase('set misc styles on an icon',
      <IconMailAlert miscStyles={{ position: 'relative', }} />
    );
    testCase('responsively set misc styles on an icon',
      <IconMailAlert
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
