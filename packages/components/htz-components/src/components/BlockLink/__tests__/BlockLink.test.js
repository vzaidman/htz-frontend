import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import BlockLink from '../BlockLink';
import AboveBlockLink from '../AboveBlockLink';

const Element = (
  <ApolloProvider client={client}>
    <div>
      <BlockLink
        href="https://www.haaretz.co.il/news/world/europe/.premium-1.5940125"
        miscStyles={{
          display: 'flex',
          flexDirection: 'column',
          height: '200px',
        }}
      >
        <h3>title</h3>
        <footer style={{ marginTop: 'auto', }}>
          <AboveBlockLink>
            {({ className, theme, }) => <span className={className}>I am above the block</span>}
          </AboveBlockLink>
        </footer>
      </BlockLink>
    </div>
  </ApolloProvider>
);

describe('BlockLink Component', () => {
  it('should render element with block link and above block link correctly', () => {
    const { component, styles, } = felaSnapshotter(Element);
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
