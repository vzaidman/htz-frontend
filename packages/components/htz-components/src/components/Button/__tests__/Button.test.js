import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Button from '../Button'; // eslint-disable-line import/no-named-as-default

function testCase(name, Component, { only = false, } = {}) {
  const testFunc = only ? it.only : it;
  testFunc(name, () => {
    const { component, styles, } = felaSnapshotter(Component);
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
}

describe('<Button>', () => {
  it('throw an error if both "isHard" and "isRound" are true', () => {
    expect(() =>
      felaSnapshotter(
        <Button isHard isRound>
          click
        </Button>
      )
    ).toThrow(/cannot be "hard" and "round" at the same time/);
  });

  describe('DOM element', () => {
    testCase('render correctly when no props are passed', <Button>click me!</Button>);
    testCase(
      'pass attributes defined in the "attrs" prop to the DOM element',
      <Button attrs={{ 'aria-hidden': true, }}>Click here</Button>
    );
    testCase('render an "<a>" correctly', <Button href="/">This is a link</Button>);
    testCase('pass "id" to DOM element', <Button id="test">No one can take my ID</Button>);
    testCase('render "busy" buttons correctly', <Button isBusy>No one can take my ID</Button>);
    testCase(
      'render "disabled" buttons correctly',
      <Button isDisabled>No one can take my ID</Button>
    );
    testCase('render "submit" buttons correctly', <Button isSubmit>I submit</Button>);
    testCase('receive click handler', <Button onClick={evt => console.log('click')}>log</Button>);
    testCase('render custom tag', <Button tagName="div">Oh the shame</Button>);
  });
  describe('styles', () => {
    testCase('modify "boxModel" (padding)', <Button boxModel={{ hp: 8, vp: 3, }}>padded</Button>);
    testCase(
      'modify "boxModel" (padding) responsively',
      <Button
        boxModel={[
          { until: 'xl', value: { hp: 1, vp: 2, }, },
          { from: 'xl', value: { hp: 4, vp: 2, }, },
        ]}
      >
        Responsive padding
      </Button>
    );
    testCase('render full-width buttons', <Button isFull>Full width</Button>);
    testCase(
      'render full-width buttons in some breakpoints',
      <Button isFull={[ { until: 'xl', value: true, }, ]}>Sometimes full-width</Button>
    );
    testCase('render hard buttons', <Button isHard>Hard edged button</Button>);
    testCase('render round buttons', <Button isRound>Rounded button</Button>);
    testCase('render color variants', <Button varian="negative">Why so negative</Button>);
    testCase(
      'render different color variants in different breakpoints',
      <Button
        variant={[ { until: 'xl', value: 'negative', }, { from: 'xl', value: 'negativeOpaque', }, ]}
      >
        Mood swings
      </Button>
    );
    testCase(
      'append custom CSS',
      <Button
        miscStyles={{
          type: [ { until: 'xl', value: 2, }, { from: 'xl', value: 3, }, ],
        }}
      >
        Larger than life
      </Button>
    );
  });
});
