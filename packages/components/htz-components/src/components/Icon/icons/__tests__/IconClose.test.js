import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconClose from '../IconClose';

describe('<IconClose />', () => {
  describe('Errors', () => {
    it('throw an error when the value passed to the "size" prop isn\'t a number', () => {
      expect(() => felaSnapshotter(<IconClose size="2rem" />)).toThrow(
        /^An Icon's "size" prop may only be passed a "number"/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconClose color="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconClose color={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconClose fill="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconClose fill={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
  });
  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <IconClose />);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconClose attrs={{ 'aria-hidden': true, }} />
    );
    testCase('add "id" attribute to DOM element', <IconClose id="hasId" />);
    testCase(
      'add "onClick" attribute to DOM element',
      <IconClose id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase("set icon's color", <IconClose color={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's color responsively",
      <IconClose
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's fill", <IconClose fill={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's fill responsively",
      <IconClose
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconClose size={6} />);
    testCase(
      "set icon's size responsively",
      <IconClose size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]} />
    );
    testCase(
      'set misc styles on an icon',
      <IconClose miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconClose
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
