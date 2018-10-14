import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import PremiumContentMetaHelper from './PremiumContentMeta.helper';


describe('PremiumContentMetaHelper', () => {
  const test = isPremiumContent => {
    const snapshot = felaSnapshotter(<PremiumContentMetaHelper isPremiumContent={isPremiumContent} />);
    expect(snapshot).toMatchSnapshot();
  };

  it('should render with isPremiumContent={true} correctly', () => {
    const isPremiumContent = true;
    test(isPremiumContent);
  });

  it('should render with isPremiumContent={false} correctly', () => {
    const isPremiumContent = false;
    test(isPremiumContent);
  });
});
