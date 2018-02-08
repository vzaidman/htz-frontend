import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Title from '../Title'; // eslint-disable-line import/no-named-as-default

describe('Title component', () => {
  it('renders correctly a H1-> H6 tag, Zero font-size scale, as inline element', () => {
    for (let i = 1; i < 7; i++) {
      let snapshot = felaSnapshotter(
        <Title
          fontSize={0}
          level={i}
          text={`This is a H${i} title`}
        />
      );
      expect(snapshot).toMatchSnapshot();
    }
  });

  it('renders correctly a H1 tag as block element "display: block"', () => {
    const { component, styles, } = felaSnapshotter(
      <Title
        isBlock={true}
        fontSize={0}
        level={1}
        text="This is a block H1 title"
      />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('renders correctly a H1 tag with responsive font-size', () => {
    const { component, styles, } = felaSnapshotter(
      <Title
        isBlock={true}
        fontSize={[
                { until: 'm', value: 3, },
                { from: 'm', until: 'l', value: 4, },
                { from: 'l', value: 5, },
          ]}
        level={1}
        text="This is a block H1 title"
      />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
