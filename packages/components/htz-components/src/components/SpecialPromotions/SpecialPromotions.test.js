import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
// import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import SpecialPromotions from './SpecialPromotions';

const specialData = {
  title: 'hello special',
  url: 'https://www.haaretz.co.il/news/politics/.premium-1.6014424',
  urlText: 'לכתבה',
};

describe('<SpecialPromotions />', () => {
  it('should render SpecialPromotions currectly', () => {
    const { component, styles, } = felaSnapshotter(
      <SpecialPromotions data={specialData} />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
