import React from 'react';
import { FelaTheme, } from 'react-fela';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import LiveBlogContainer from '../LiveBlogElements/LiveBlogContainer';
import { liveblogItems, keyEvents, } from '../liveBlogDummyData';

// remove this mocks when this components tests are currect.
jest.mock('../LiveBlogElements/LiveBlogItem', () => 'LiveBlogItem');

Math.random = jest.fn(() => 0.123456789);

describe('LiveBLogContainer component', () => {
  it('renders liveBLogContainer correctly', () => {
    const snapshot = felaSnapshotter(
      <ApolloProvider client={client}>
        <FelaTheme
          render={theme => (
            <LiveBlogContainer
              liveblogItems={liveblogItems}
              canonicalUrl="https://www.haaretz.co.il/news/politics/LIVE-1.6293368"
              keyEvents={keyEvents}
              bps={theme.bps}
              typeConf={theme.typeConf}
            />
          )}
        />
      </ApolloProvider>
    );
    expect(snapshot).toMatchSnapshot();
  });
  it('renders liveBLogContainer correctly with Timeline Text', () => {
    const snapshot = felaSnapshotter(
      <FelaTheme
        render={theme => (
          <ApolloProvider client={client}>
            <LiveBlogContainer
              liveblogItems={liveblogItems}
              canonicalUrl="https://www.haaretz.co.il/news/politics/LIVE-1.6293368"
              keyEvents={keyEvents}
              bps={theme.bps}
              typeConf={theme.typeConf}
              showTimeLineText
            />
          </ApolloProvider>
        )}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
