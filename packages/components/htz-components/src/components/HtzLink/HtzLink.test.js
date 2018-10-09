import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import HtzLink from './HtzLink';
import Paragraph from '../Paragraph/Paragraph';

it('Simple link ', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <HtzLink href="https://www.haaretz.co.il" content="Haaretz" />
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});

it('render content from "children"', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <HtzLink href="https://www.haaretz.co.il">test content</HtzLink>
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});

it('override "children" with content', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <HtzLink href="https://www.haaretz.co.il" content="Haaretz">
        test content
      </HtzLink>
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});

it('Link with target blank ', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <HtzLink href="https://themarker.com" content="The Marker" target="_blank" />
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});

it('Link within paragraph component ', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <Paragraph
        {...{
          attributes: [
            {
              key: 'href',
              value:
                'http://www.iflscience.com/physics/new-type-of-bizarre-quantum-material-discovered/',
            },
            {
              key: 'target',
              value: '_blank',
            },
          ],
          tag: 'a',
          content: [
            {
              attributes: [],
              tag: 'span',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'New Type Of ',
                    },
                  ],
                  tag: '#text',
                },
                {
                  attributes: [],
                  tag: 'strong',
                  content: [
                    {
                      attributes: [
                        {
                          key: 'text',
                          value: 'Bizarre Quantum Material',
                        },
                      ],
                      tag: '#text',
                    },
                  ],
                },
                {
                  attributes: [
                    {
                      key: 'text',
                      value: ' Discovered.',
                    },
                  ],
                  tag: '#text',
                },
              ],
            },
          ],
        }}
      />
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});
