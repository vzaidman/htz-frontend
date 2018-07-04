import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import SpecialPromotions from '../SpecialPromotions';

const specialData = {
  contentName: 'hello special',
  href: 'https://www.haaretz.co.il/news/politics/.premium-1.6014424',
  linkText: 'לכתבה',
  toolTip: 'Tool Tip',
};

describe('<SpecialPromotions />', () => {
  it('should render SpecialPromotions currectly', () => {
    const { component, styles, } = felaSnapshotter(
      <SpecialPromotions {...specialData} />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
  it('should render SpecialPromotions currectly when passing miscStyles prop', () => {
    const { component, styles, } = felaSnapshotter(
      <SpecialPromotions {...specialData} miscStyles={{ maxWidth: '80rem', }} />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
  it('should render SpecialPromotions with "primaryInverse" variant', () => {
    const { component, styles, } = felaSnapshotter(
      <SpecialPromotions {...specialData} variant="primaryInverse" />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
