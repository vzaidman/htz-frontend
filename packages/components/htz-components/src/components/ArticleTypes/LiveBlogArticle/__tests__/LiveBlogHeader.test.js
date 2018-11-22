import React from 'react';
// import { FelaTheme, } from 'react-fela';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import LiveBlogHeader from '../LiveBlogElements/LiveBlogHeader';
import {
  articleId,
  hasBreadCrumbs,
  canonicalUrl,
  authors,
  modDate,
  pubDate,
  subtitle,
  title,
  headlineElement,
  // reportingFrom,
  isLiveUpdate,
} from '../liveBlogDummyData';

// remove this mocks when this components tests are currect.
jest.mock('../../../HeadlineElement/HeadlineElement', () => 'HeadlineElement');
jest.mock('../../../ShareBar/ShareBar', () => 'ShareBar');

describe('LiveBlogHeader component', () => {
  it('renders LiveBlogHeader correctly', () => {
    const snapshot = felaSnapshotter(
      <ApolloProvider client={client}>
        <LiveBlogHeader
          articleId={articleId}
          authors={authors}
          modDate={modDate}
          pubDate={pubDate}
          subtitle={subtitle}
          exclusive={null}
          title={title}
          canonicalUrl={canonicalUrl}
          hasBreadCrumbs={hasBreadCrumbs}
          headlineElement={headlineElement}
          isLiveUpdate={isLiveUpdate}
        />
      </ApolloProvider>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
