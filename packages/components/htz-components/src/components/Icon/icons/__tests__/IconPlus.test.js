import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import IconPlus from '../IconPlus';

describe('<IconPlus />', () => {
  describe('Errors', () => {
    it('throw an error when the value passed to the "size" prop isn\'t a number', () => {
      expect(() => felaSnapshotter(<IconPlus size="2rem" />)).toThrow(
        /^An Icon's "size" prop may only be passed a "number"/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconPlus color="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "color" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconPlus color={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (string)', () => {
      expect(() => felaSnapshotter(<IconPlus fill="red" />)).toThrow(
        /is not a named-color/
      );
    });
    it('throw an error when the value passed to the "fill" prop isn\'t a named color (array of strings)', () => {
      expect(() =>
        felaSnapshotter(<IconPlus fill={[ 'primary', 'nope', ]} />)
      ).toThrow(/is not a named-color/);
    });
  });
  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <IconPlus />);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <IconPlus attrs={{ 'aria-hidden': true, }} />
    );
    testCase('add "id" attribute to DOM element', <IconPlus id="hasId" />);
    testCase(
      'add "onClick" attribute to DOM element',
      <IconPlus id={e => console.log('a')} />
    );
  });

  describe('styles', () => {
    testCase("set icon's color", <IconPlus color={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's color responsively",
      <IconPlus
        color={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's fill", <IconPlus fill={[ 'primary', 'base', ]} />);
    testCase(
      "set icon's fill responsively",
      <IconPlus
        fill={[
          { until: 'xl', value: [ 'primary', 'base', ], },
          { from: 'xl', value: [ 'bodyText', 'base', ], },
        ]}
      />
    );
    testCase("set icon's size", <IconPlus size={6} />);
    testCase(
      "set icon's size responsively",
      <IconPlus size={[ { until: 'xl', value: 6, }, { from: 'xl', value: 7, }, ]} />
    );
    testCase(
      'set misc styles on an icon',
      <IconPlus miscStyles={{ position: 'relative', }} />
    );
    testCase(
      'responsively set misc styles on an icon',
      <IconPlus
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
