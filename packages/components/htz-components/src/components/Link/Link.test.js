import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Link from './Link';
import Paragraph from '../Paragraph/Paragraph';

it('Simple Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Link
      href="https://www.haaretz.co.il"
      content="Haaretz"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Simple Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Link
      href="https://themarker.com"
      content="The Marker"
      target="_blank"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('Simple Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Link
      href="http://www.iflscience.com/physics/new-type-of-bizarre-quantum-material-discovered/"
      content={
        <Paragraph
          setNextComponentMarginTop={shouldMargin => console.log(shouldMargin)}
          content={
            {
              attributes: [],
              tag: 'p',
              content: [
                {
                  attributes: [
                    {
                      key: 'text',
                      value: 'New Type Of Bizarre Quantum Material Discovered.',
                    },
                  ],
                  tag: '#text',
                },
              ],
            }
          }
        />
      }
      target="_blank"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
