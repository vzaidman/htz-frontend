import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Credit from '../Credit'; // eslint-disable-line import/no-named-as-default
// import CreditArticle from '../CreditArticle'; // eslint-disable-line import/no-named-as-default

describe('Credit of article', () => {
  it('renders correctly with minimum required props', () => {
    const snapshot = felaSnapshotter(<Credit contentName="Test Name" />);
    expect(snapshot).toMatchSnapshot();
  });

  // todo: uncomment these tests when fixing router  issue

  // it('renders correctly with a url prop', () => {
  //   const snapshot = felaSnapshotter(
  //     <Credit contentName="test name" url="/misc/writers/1.593896" />
  //   );
  //   expect(snapshot).toMatchSnapshot();
  // });
});

// describe('CreditArticle themed credit of article', () => {
//   it('renders correctly with a url prop', () => {
//     const snapshot = felaSnapshotter(
//       <CreditArticle contentName="test name" url="/misc/writers/1.593896" />
//     );
//     expect(snapshot).toMatchSnapshot();
//   });
// });
