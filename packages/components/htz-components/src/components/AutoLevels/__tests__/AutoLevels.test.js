import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { LevelProvider, } from '../LevelContext';
import H from '../H';
import Section from '../Section';

describe('<AutoLevels>', () => {
  it('renders correctly H and Sections with correct heading level in different scenarios', () => {
    const { component, styles, } = felaSnapshotter(
      <LevelProvider value={2}>
        <H>should be h2</H>
        <Section>
          <H>Should be h3</H>
          <Section tagName="div">
            <H>Should be h4</H>
            <H offSet={1}>Should be h5 because of offSet</H>
            <Section isFragment>
              <H>Should be h5 because of fragment</H>
            </Section>
          </Section>
        </Section>
      </LevelProvider>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
