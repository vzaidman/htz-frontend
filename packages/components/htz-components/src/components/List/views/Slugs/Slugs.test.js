import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
// import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import Slugs from './Slugs.view.js';
import list from '../../../../../styleguide/mocks/listMocks/SlugsMock';

describe('<Slugs />', () => {
  it('Render picture element correctly', () => {
    const { component, styles, } = felaSnapshotter(
      <Slugs list={list} biAction={() => null} />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
