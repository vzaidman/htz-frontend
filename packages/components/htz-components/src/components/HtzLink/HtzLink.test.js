import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import HtzLink from './HtzLink';
import Paragraph from '../Paragraph/Paragraph';

it('Simple link ', () => {
  const snapshot = felaSnapshotter(<HtzLink href="https://www.haaretz.co.il" content="Haaretz" />);
  expect(snapshot).toMatchSnapshot();
});

it('render content from "children"', () => {
  const snapshot = felaSnapshotter(
    <HtzLink href="https://www.haaretz.co.il">test content</HtzLink>
  );
  expect(snapshot).toMatchSnapshot();
});

it('override "children" with content', () => {
  const snapshot = felaSnapshotter(
    <HtzLink href="https://www.haaretz.co.il" content="Haaretz">
      test content
    </HtzLink>
  );
  expect(snapshot).toMatchSnapshot();
});

it('Link with target blank ', () => {
  const snapshot = felaSnapshotter(
    <HtzLink href="https://themarker.com" content="The Marker" target="_blank" />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Link within paragraph component ', () => {
  const snapshot = felaSnapshotter(
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
  );
  expect(snapshot).toMatchSnapshot();
});
