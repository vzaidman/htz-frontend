import React from 'react';
import toJson from 'enzyme-to-json';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import NewsletterWithoutApollo from '../NewsletterWithoutApollo';
import NewsletterConfirmed from '../elements/NewsletterConfirmed';

Math.random = jest.fn(() => 0.123456789);
const mockFunc = jest.fn();

describe('<Newsletter />', () => {
  describe('Newsletter DOM element', () => {
    // TODO unskip on Enzyme React16 support
    it.skip('should correctly render a Newsletter initial view', () => {
      const wrapper = felaMount(
        <NewsletterWithoutApollo
          buttonText="הרשמה"
          contentId="7.1234567"
          headlineText="headline text"
          loading={false}
          signUpNewsletter={mockFunc}
          miscStyles={{
            maxWidth: '80rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          segmentId={1420800}
          variant="highlight"
        />
      );
      expect(toJson(wrapper, { mode: 'shallow', })).toMatchSnapshot();
    });
  });
  describe('NewsletterConfirmed DOM element', () => {
    it('should correctly render a NewsletterConfirmed without any props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <NewsletterConfirmed closeConfirmation={mockFunc} />
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
